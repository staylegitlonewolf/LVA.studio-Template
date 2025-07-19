import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import authService from './services/authService.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const user = authService.getCurrentUser();
    if (user && authService.isAuthenticated()) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleSignupSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const toggleAuthMode = () => {
    setShowSignup(!showSignup);
  };

  if (isAuthenticated && currentUser) {
    return (
      <Dashboard 
        user={currentUser} 
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="auth-container">
      {showSignup ? (
        <SignupForm 
          onSwitchToLogin={toggleAuthMode}
          onSignupSuccess={handleSignupSuccess}
        />
      ) : (
        <LoginForm 
          onSwitchToSignup={toggleAuthMode}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App; 