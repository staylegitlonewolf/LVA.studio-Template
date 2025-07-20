import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { wixAuthService } from '../services/wixAuthService.js';
import { profileService } from '../services/profileService.js';

const AuthCallback = ({ onAuthSuccess }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing authentication...');
  const [error, setError] = useState('');

  useEffect(() => {
    let isProcessing = false;
    
    const handleCallback = async () => {
      // Prevent multiple executions
      if (isProcessing) {
        console.log('⚠️ Auth callback already processing, skipping...');
        return;
      }
      
      // Check if we're already authenticated and on the callback page
      if (wixAuthService.isAuthenticated() && !searchParams.get('code')) {
        console.log('ℹ️ User already authenticated, redirecting to dashboard');
        navigate('/dashboard');
        return;
      }
      
      isProcessing = true;
      
      try {
        // Check if we've already processed this callback
        if (localStorage.getItem('auth_callback_processed')) {
          console.log('⚠️ Auth callback already processed, redirecting to dashboard');
          navigate('/dashboard');
          return;
        }
        
        // Mark callback as being processed
        localStorage.setItem('auth_callback_processed', 'true');
        
        setStatus('Processing authentication callback...');
        
        setStatus('Exchanging authorization code for tokens...');
        
        // Exchange the authorization code for tokens using SDK
        const tokens = await wixAuthService.handleAuthCallback();
        
        // If tokens is null, user is already authenticated
        if (!tokens) {
          console.log('ℹ️ User already authenticated, proceeding to get user info');
        }
        
        setStatus('Getting user information...');
        
        // Get current user information
        const user = await wixAuthService.getCurrentUser();
        console.log('👤 Current user data:', user);
        console.log('🔍 User object type:', typeof user);
        console.log('🔍 User object keys:', user ? Object.keys(user) : 'null');
        
        if (user) {
          // Log the full user object structure
          console.log('🔍 Full user object:', JSON.stringify(user, null, 2));
        }
        
        setStatus('Creating/updating user profile...');
        
        // Create or update user profile in Main collection
        try {
          const profile = await profileService.createOrUpdateProfile(user);
          console.log('✅ Profile created/updated successfully:', profile);
        } catch (profileError) {
          console.warn('⚠️ Profile creation/update failed, but continuing with auth:', profileError);
          // Don't fail the entire auth process if profile creation fails
        }
        
        setStatus('Authentication successful! Redirecting...');
        
        // Call the success callback
        if (onAuthSuccess) {
          onAuthSuccess(user);
        }
        
        // Redirect to dashboard
        setTimeout(() => navigate('/dashboard'), 1000);
        
      } catch (error) {
        console.error('❌ Auth callback error:', error);
        setError(`Authentication failed: ${error.message}`);
        
        // Clear the processed flag on error
        localStorage.removeItem('auth_callback_processed');
        
        setTimeout(() => navigate('/'), 3000);
      } finally {
        isProcessing = false;
      }
    };

    handleCallback();
    
    // Cleanup function to clear the processed flag when component unmounts
    return () => {
      localStorage.removeItem('auth_callback_processed');
    };
  }, [navigate, onAuthSuccess, searchParams]); // Added searchParams back

  return (
    <div className="auth-callback">
      <div className="callback-card">
        <div className="callback-header">
          <h2>🔐 Authentication in Progress</h2>
        </div>
        
        {error ? (
          <div className="error-message">
            ❌ {error}
            <p>Redirecting to home page...</p>
          </div>
        ) : (
          <div className="success-message">
            <div className="loading-spinner">🔄</div>
            <p>{status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback; 