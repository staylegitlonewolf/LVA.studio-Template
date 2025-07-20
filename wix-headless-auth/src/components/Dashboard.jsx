import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';
import ProfileSettings from './ProfileSettings.jsx';

const Dashboard = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [activeView, setActiveView] = useState('overview');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    // Listen for user creation events
    const handleUserCreated = (event) => {
      const { user, source } = event.detail;
      console.log(`🎉 New user created via ${source}:`, user);
      setMessage(`Welcome! Your account has been successfully created via ${source}.`);
    };
    
    window.addEventListener('userCreatedInWix', handleUserCreated);
    
    return () => {
      window.removeEventListener('userCreatedInWix', handleUserCreated);
    };
  }, []);

  const handleLogout = () => {
    authService.signout();
    onLogout();
    navigate('/');
  };

  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    setMessage('Profile updated successfully!');
  };

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="welcome-section">
        <div className="user-avatar">
          {currentUser.member?.profile?.photo?.url ? (
            <img src={currentUser.member.profile.photo.url} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {currentUser.member?.profile?.nickname?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <div className="welcome-text">
          <h2>Welcome back, {currentUser.member?.profile?.nickname || currentUser.member?.profile?.firstName || 'User'}!</h2>
          <p>Member since {currentUser.member?._createdDate ? new Date(currentUser.member._createdDate).toLocaleDateString() : 'Recently'}</p>
        </div>
      </div>

      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Account Status</h3>
          <p className={currentUser.member?.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}>
            {currentUser.member?.status === 'ACTIVE' ? 'Active' : 'Active (New Member)'}
          </p>
        </div>

        <div className="stat-card">
          <h3>Last Login</h3>
          <p>{currentUser.member?.lastLoginDate ? new Date(currentUser.member.lastLoginDate).toLocaleString() : 'First time login'}</p>
        </div>

        {currentUser.wixContactId && (
          <div className="stat-card">
            <h3>Wix Contact</h3>
            <p>✅ Connected</p>
          </div>
        )}
      </div>

      <div className="quick-info">
        <h3>Quick Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Email:</strong> {currentUser.member?.loginEmail || currentUser.member?.profile?.email || 'Not provided'}
          </div>
          <div className="info-item">
            <strong>Username:</strong> {currentUser.member?.profile?.slug || 'Not provided'}
          </div>
          {currentUser.member?.profile?.phones?.[0] && (
            <div className="info-item">
              <strong>Phone:</strong> {currentUser.member.profile.phones[0]}
            </div>
          )}
          {currentUser.member?.profile?.customFields?.company && (
            <div className="info-item">
              <strong>Company:</strong> {currentUser.member.profile.customFields.company}
            </div>
          )}
          {currentUser.member?.profile?.addresses?.[0] && (
            <div className="info-item">
              <strong>Location:</strong> {currentUser.member.profile.addresses[0].city}, {currentUser.member.profile.addresses[0].country}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>LVA.studio™ Dashboard</h1>
          <p>Living Victorious Always</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-nav">
        <button
          className={`nav-btn ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button
          className={`nav-btn ${activeView === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveView('profile')}
        >
          Profile Settings
        </button>
      </div>

      <div className="dashboard-content">
        {activeView === 'overview' && renderOverview()}
        {activeView === 'profile' && <ProfileSettings />}
      </div>
    </div>
  );
};

export default Dashboard; 