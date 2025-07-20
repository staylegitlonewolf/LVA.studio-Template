import React, { useState } from 'react';
import { authService } from '../services/authService.js';
import { wixClient } from '../config/wix.js';

const SignupForm = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    jobTitle: '',
    bio: '',
    website: '',
    location: '',
    dateOfBirth: '',
    newsletter: false,
    notifications: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await authService.signup(userData);
      if (result.success) {
        onSignupSuccess(result.user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const testWixConnection = async () => {
    try {
      setError('');
      console.log('🧪 Testing Wix API connection...');
      
      const result = await wixClient.testConnection();
      
      if (result.success) {
        setError('✅ Wix API connection successful! Check console for details.');
        console.log('✅ Connection test successful:', result.data);
      } else {
        setError(`❌ Wix API connection failed: ${JSON.stringify(result.error)}`);
        console.error('❌ Connection test failed:', result.error);
      }
    } catch (error) {
      setError(`❌ Test error: ${error.message}`);
      console.error('❌ Test error:', error);
    }
  };

  return (
    <div className="auth-card">
      <div className="lva-header">
        <div className="lva-logo">LVA.studio™</div>
        <div className="lva-tagline">Living Victorious Always</div>
      </div>
      
      <h2 className="auth-title">Create Account</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Test Connection Button */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={testWixConnection}
          className="btn-secondary"
          style={{ width: 'auto', padding: '8px 16px', fontSize: '0.8rem' }}
        >
          Test Wix API Connection
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Required Fields */}
        <div className="form-section">
          <h3 className="section-title">Required Information</h3>
          
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
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
              Password *
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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>
        </div>

        {/* Optional Fields Toggle */}
        <div className="form-group">
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowAdvancedFields(!showAdvancedFields)}
          >
            {showAdvancedFields ? 'Hide' : 'Show'} Additional Information
          </button>
        </div>

        {/* Optional Fields */}
        {showAdvancedFields && (
          <div className="form-section">
            <h3 className="section-title">Additional Information (Optional)</h3>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="form-input"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle" className="form-label">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                className="form-input"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter your job title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your city, state, or country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="form-input"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://your-website.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-input"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                className="form-input"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself..."
                rows="3"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                Subscribe to newsletter
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                Receive notifications
              </label>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-switch">
        Already have an account?{' '}
        <a href="#" onClick={onSwitchToLogin}>
          Sign in here
        </a>
      </div>
    </div>
  );
};

export default SignupForm; 