import React, { useState, useEffect } from 'react';
import { profileService } from '../services/profileService.js';
import { wixAuthService } from '../services/wixAuthService.js';

const ProfileSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const currentUser = await wixAuthService.getCurrentUser();
      
      if (!currentUser) {
        setMessage('No user data available. Please log in again.');
        setLoading(false);
        return;
      }
      
      console.log('👤 Loading profile for user:', currentUser);
      
      // Check if this is a fallback user
      if (currentUser.id && currentUser.id.startsWith('fallback_user_')) {
        console.log('⚠️ Using fallback user data');
        setMessage('Using fallback profile data. Some features may be limited.');
      }
      
      const userProfile = await profileService.getProfileByMemberId(currentUser.id);
      
      if (userProfile) {
        setProfile(userProfile);
        setFormData({
          username: userProfile.username || '',
          firstName: userProfile.firstName || '',
          lastName: userProfile.lastName || '',
          displayName: userProfile.displayName || '',
          phone: userProfile.phone || '',
          bio: userProfile.bio || '',
          location: userProfile.location || '',
          website: userProfile.website || '',
          socialLinks: {
            facebook: userProfile.socialLinks?.facebook || '',
            twitter: userProfile.socialLinks?.twitter || '',
            instagram: userProfile.socialLinks?.instagram || '',
            linkedin: userProfile.socialLinks?.linkedin || ''
          },
          skills: userProfile.skills || [],
          interests: userProfile.interests || [],
          preferences: userProfile.preferences || {
            notifications: true,
            marketing: false
          }
        });
      } else {
        setMessage('Profile not found. Please contact support.');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage('Error loading profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      
      const updatedProfile = await profileService.updateUserProfile(profile._id, formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        username: profile.username || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        displayName: profile.displayName || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || '',
        socialLinks: {
          facebook: profile.socialLinks?.facebook || '',
          twitter: profile.socialLinks?.twitter || '',
          instagram: profile.socialLinks?.instagram || '',
          linkedin: profile.socialLinks?.linkedin || ''
        },
        skills: profile.skills || [],
        interests: profile.interests || [],
        preferences: profile.preferences || {
          notifications: true,
          marketing: false
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="profile-settings">
        <div className="settings-card">
          <div className="loading-spinner">🔄</div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-settings">
        <div className="settings-card">
          <div className="error-message">
            ❌ {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-settings">
      <div className="settings-card">
        <div className="settings-header">
          <h2>👤 Profile Settings</h2>
          {!isEditing && (
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <div className="profile-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="disabled-input"
            />
            <small>Email cannot be changed</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Display Name:</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="profile-section">
          <h3>About Me</h3>
          
          <div className="form-group">
            <label>Bio:</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              disabled={!isEditing}
              placeholder="City, Country"
            />
          </div>

          <div className="form-group">
            <label>Website:</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              disabled={!isEditing}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div className="profile-section">
          <h3>Social Links</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Facebook:</label>
              <input
                type="url"
                value={formData.socialLinks.facebook}
                onChange={(e) => handleInputChange('socialLinks.facebook', e.target.value)}
                disabled={!isEditing}
                placeholder="https://facebook.com/username"
              />
            </div>
            <div className="form-group">
              <label>Twitter:</label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
                disabled={!isEditing}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Instagram:</label>
              <input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleInputChange('socialLinks.instagram', e.target.value)}
                disabled={!isEditing}
                placeholder="https://instagram.com/username"
              />
            </div>
            <div className="form-group">
              <label>LinkedIn:</label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Preferences</h3>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.preferences.notifications}
                onChange={(e) => handleInputChange('preferences.notifications', e.target.checked)}
                disabled={!isEditing}
              />
              Receive email notifications
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.preferences.marketing}
                onChange={(e) => handleInputChange('preferences.marketing', e.target.checked)}
                disabled={!isEditing}
              />
              Receive marketing emails
            </label>
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button 
              className="save-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? '💾 Saving...' : '💾 Save Changes'}
            </button>
            <button 
              className="cancel-button"
              onClick={handleCancel}
              disabled={saving}
            >
              ❌ Cancel
            </button>
          </div>
        )}

        <div className="profile-info">
          <h3>Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Member Since:</strong>
              <span>{new Date(profile.memberSince).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <strong>Last Login:</strong>
              <span>{new Date(profile.lastLogin).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <strong>Account Status:</strong>
              <span className={`status ${profile.status}`}>{profile.status}</span>
            </div>
            <div className="info-item">
              <strong>Email Verified:</strong>
              <span>{profile.isEmailVerified ? '✅ Yes' : '❌ No'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings; 