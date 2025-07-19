import React, { useState, useEffect } from 'react';
import authService from '../services/authService.js';
import wixOAuthService from '../services/wixOAuthService.js';

const LoginForm = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize OAuth service when component mounts
    // The enhanced OAuth service handles initialization automatically
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.signin(formData.email, formData.password);
      if (result.success) {
        onLoginSuccess(result.user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      // Get the OAuth authorization URL
      const authUrl = await wixOAuthService.getAuthUrl();
      
      // Redirect to Google OAuth
      window.location.href = authUrl;
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="lva-header">
        <div className="lva-logo">LVA.studio™</div>
        <div className="lva-tagline">Living Victorious Always</div>
      </div>
      
      <h2 className="auth-title">Welcome Back</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <div className="google-auth-section">
        <button
          onClick={handleGoogleSignIn}
          className="btn google-btn"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign in with Google'}
        </button>
      </div>

      <div className="auth-switch">
        Don't have an account?{' '}
        <a href="#" onClick={onSwitchToSignup}>
          Sign up here
        </a>
      </div>
    </div>
  );
};

export default LoginForm; 