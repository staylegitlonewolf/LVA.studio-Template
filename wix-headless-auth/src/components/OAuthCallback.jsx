import React, { useEffect, useState } from 'react';
import wixOAuthService from '../services/wixOAuthService.js';

const OAuthCallback = ({ onAuthSuccess, onAuthError }) => {
  const [status, setStatus] = useState('Processing authentication...');
  const [error, setError] = useState(null);

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      setStatus('Validating authentication...');
      
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const error = urlParams.get('error');

      // Check for OAuth errors
      if (error) {
        throw new Error(`OAuth error: ${error}`);
      }

      if (!code || !state) {
        throw new Error('Missing required OAuth parameters');
      }

      setStatus('Exchanging authorization code...');
      
      // Handle the OAuth callback
      const result = await wixOAuthService.handleOAuthCallback(code, state);
      
      if (result.success) {
        setStatus('Authentication successful! Redirecting...');
        
        // Call success callback
        if (onAuthSuccess) {
          onAuthSuccess(result.user);
        }
        
        // Redirect to dashboard or home page
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      setError(error.message);
      setStatus('Authentication failed');
      
      // Call error callback
      if (onAuthError) {
        onAuthError(error);
      }
      
      // Redirect to login page after error
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  };

  return (
    <div className="oauth-callback">
      <div className="auth-card">
        <div className="lva-header">
          <div className="lva-logo">LVA.studio™</div>
          <div className="lva-tagline">Living Victorious Always</div>
        </div>
        
        <div className="callback-content">
          {error ? (
            <div className="error-message">
              <h3>Authentication Error</h3>
              <p>{error}</p>
              <p>Redirecting to login page...</p>
            </div>
          ) : (
            <div className="success-message">
              <h3>Processing Authentication</h3>
              <p>{status}</p>
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback; 