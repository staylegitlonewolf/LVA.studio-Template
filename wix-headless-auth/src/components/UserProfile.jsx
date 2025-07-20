import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService.js';
import { wixClient } from '../config/wix.js';

const UserProfile = ({ user, onProfileUpdate }) => {
  const [profileData, setProfileData] = useState({
    firstName: user.member?.profile?.nickname?.split(' ')[0] || user.firstName || '',
    lastName: user.member?.profile?.nickname?.split(' ').slice(1).join(' ') || user.lastName || '',
    email: user.member?.loginEmail || user.email || '',
    phone: user.member?.profile?.phones?.[0] || user.phone || '',
    company: user.member?.profile?.customFields?.company || user.company || '',
    jobTitle: user.member?.profile?.customFields?.jobTitle || user.jobTitle || '',
    bio: user.member?.profile?.customFields?.bio || user.bio || '',
    website: user.member?.profile?.customFields?.website || user.website || '',
    location: user.member?.profile?.addresses?.[0]?.city || user.location || '',
    dateOfBirth: user.member?.profile?.customFields?.dateOfBirth || user.dateOfBirth || '',
    profileImage: user.member?.profile?.photo?.url || user.profileImage || '',
    preferences: {
      newsletter: user.member?.profile?.customFields?.newsletter || user.preferences?.newsletter || false,
      notifications: user.member?.profile?.customFields?.notifications || user.preferences?.notifications || true,
      theme: user.member?.profile?.customFields?.theme || user.preferences?.theme || 'light'
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Debug: Log the user data structure
    console.log('🔍 UserProfile received user data:', user);
    console.log('🔍 User data structure:', JSON.stringify(user, null, 2));
    
    // Update profile data when user changes
    setProfileData({
      firstName: user.member?.profile?.nickname?.split(' ')[0] || user.firstName || '',
      lastName: user.member?.profile?.nickname?.split(' ').slice(1).join(' ') || user.lastName || '',
      email: user.member?.loginEmail || user.email || '',
      phone: user.member?.profile?.phones?.[0] || user.phone || '',
      company: user.member?.profile?.customFields?.company || user.company || '',
      jobTitle: user.member?.profile?.customFields?.jobTitle || user.jobTitle || '',
      bio: user.member?.profile?.customFields?.bio || user.bio || '',
      website: user.member?.profile?.customFields?.website || user.website || '',
      location: user.member?.profile?.addresses?.[0]?.city || user.location || '',
      dateOfBirth: user.member?.profile?.customFields?.dateOfBirth || user.dateOfBirth || '',
      profileImage: user.member?.profile?.photo?.url || user.profileImage || '',
      preferences: {
        newsletter: user.member?.profile?.customFields?.newsletter || user.preferences?.newsletter || false,
        notifications: user.member?.profile?.customFields?.notifications || user.preferences?.notifications || true,
        theme: user.member?.profile?.customFields?.theme || user.preferences?.theme || 'light'
      }
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const testWixConnection = async () => {
    try {
      setMessage('');
      console.log('🧪 Testing Wix API connection from Profile...');
      
      const result = await wixClient.testConnection();
      
      if (result.success) {
        setMessage('✅ Wix API connection successful! Check console for details.');
        console.log('✅ Connection test successful:', result.data);
      } else {
        setMessage(`❌ Wix API connection failed: ${JSON.stringify(result.error)}`);
        console.error('❌ Connection test failed:', result.error);
      }
    } catch (error) {
      setMessage(`❌ Test error: ${error.message}`);
      console.error('❌ Test error:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Get the correct user ID from the Wix SDK structure
      const userId = user.member?._id || user._id;
      console.log('🔄 Updating profile for user:', userId);
      console.log('📝 Profile data to update:', profileData);
      
      if (!userId) {
        throw new Error('User ID not found. Please try logging in again.');
      }
      
      const updatedUser = await authService.updateProfile(userId, {
        ...profileData,
        updatedAt: new Date().toISOString()
      });
      
      console.log('✅ Profile update successful:', updatedUser);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Notify parent component
      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      }
    } catch (error) {
      console.error('❌ Profile update error:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        user: user._id
      });
      
      // Provide more specific error messages
      let errorMessage = 'Error updating profile: ';
      if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Network error - unable to connect to Wix API. Please check your internet connection and try again.';
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage += 'Authentication error - API key may be invalid or expired.';
      } else if (error.message.includes('404')) {
        errorMessage += 'User not found in database.';
      } else {
        errorMessage += error.message;
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload to a file service
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPersonalInfo = () => (
    <div className="profile-section">
      <h3>Personal Information</h3>
      
      <div className="profile-image-section">
        <div className="profile-image">
          {profileData.profileImage ? (
            <img src={profileData.profileImage} alt="Profile" />
          ) : (
            <div className="profile-placeholder">
              {profileData.firstName?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-upload"
          />
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-input"
            value={profileData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            required
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
            value={profileData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
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
          value={profileData.email}
          onChange={handleChange}
          disabled={!isEditing}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input"
          value={profileData.phone}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Enter your phone number"
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
          value={profileData.dateOfBirth}
          onChange={handleChange}
          disabled={!isEditing}
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
          value={profileData.bio}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Tell us a bit about yourself..."
          rows="4"
        />
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="profile-section">
      <h3>Professional Information</h3>
      
      <div className="form-group">
        <label htmlFor="company" className="form-label">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="form-input"
          value={profileData.company}
          onChange={handleChange}
          disabled={!isEditing}
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
          value={profileData.jobTitle}
          onChange={handleChange}
          disabled={!isEditing}
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
          value={profileData.location}
          onChange={handleChange}
          disabled={!isEditing}
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
          value={profileData.website}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="https://your-website.com"
        />
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="profile-section">
      <h3>Preferences</h3>
      
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="preferences.newsletter"
            checked={profileData.preferences.newsletter}
            onChange={handleChange}
            disabled={!isEditing}
          />
          Subscribe to newsletter
        </label>
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="preferences.notifications"
            checked={profileData.preferences.notifications}
            onChange={handleChange}
            disabled={!isEditing}
          />
          Receive notifications
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="theme" className="form-label">
          Theme Preference
        </label>
        <select
          id="theme"
          name="preferences.theme"
          className="form-input"
          value={profileData.preferences.theme}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>Profile Settings</h2>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="btn"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={testWixConnection}
            className="btn-secondary"
            disabled={loading}
            style={{ marginLeft: '10px' }}
          >
            Test Wix Connection
          </button>
        </div>
      </div>

      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button
          className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
          onClick={() => setActiveTab('professional')}
        >
          Professional
        </button>
        <button
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'professional' && renderProfessionalInfo()}
        {activeTab === 'preferences' && renderPreferences()}
      </div>
    </div>
  );
};

export default UserProfile; 