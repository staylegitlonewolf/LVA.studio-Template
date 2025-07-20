import React, { useState } from 'react';
import { wixAuthService } from '../services/wixAuthService.js';

const LoginForm = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWixLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      console.log('🔗 Initiating Wix authentication...');
      
      // Create redirect session for Wix authentication
      const redirectSession = await wixAuthService.createAuthRedirect(
        window.location.origin + '/auth-callback'
      );
      
      console.log('✅ Redirect session created, redirecting to:', redirectSession.fullUrl);
      
      // Redirect to Wix authentication page
      window.location.href = redirectSession.fullUrl;
      
    } catch (error) {
      console.error('❌ Wix login error:', error);
      setError(`Login failed: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Welcome Back</h2>
      <p>Sign in to your LVA.studio™ account</p>
      
      {error && (
        <div className="error-message">
          ❌ {error}
          {error.includes('System error occurred') && (
            <div className="setup-hint">
              <p><strong>🔧 Setup Required:</strong></p>
              <p>You need to configure your OAuth client ID. See <code>OAUTH_SETUP.md</code> for instructions.</p>
              <p>1. Go to your Wix Headless project dashboard</p>
              <p>2. Create an OAuth app and get the Client ID</p>
              <p>3. Update <code>src/config/wix.js</code> with your Client ID</p>
            </div>
          )}
        </div>
      )}
      
      <div className="auth-buttons">
        <button 
          className="wix-login-btn"
          onClick={handleWixLogin}
          disabled={isLoading}
        >
          {isLoading ? '🔄 Connecting to Wix...' : '🔗 Sign in with Wix'}
        </button>
        
        <div className="divider">
          <span>or</span>
        </div>
        
        <button 
          className="google-login-btn"
          onClick={handleWixLogin} // Use same Wix auth for now
          disabled={isLoading}
        >
          {isLoading ? '🔄 Connecting...' : '🔗 Sign in with Google (via Wix)'}
        </button>
      </div>
      
      <div className="login-info">
        <p>✨ Wix handles all authentication securely</p>
        <p>🔐 Supports Google, Facebook, and email login</p>
        <p>👤 Automatic user creation in Wix CMS</p>
      </div>
    </div>
  );
};

export default LoginForm; 