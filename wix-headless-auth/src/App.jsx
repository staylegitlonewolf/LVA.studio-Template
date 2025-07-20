import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import AuthCallback from './components/AuthCallback.jsx';
import { wixAuthService } from './services/wixAuthService.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        if (wixAuthService.isAuthenticated()) {
          const currentUser = await wixAuthService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        // Clear invalid tokens
        localStorage.removeItem('wix_access_token');
        localStorage.removeItem('wix_refresh_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await wixAuthService.logout();
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Still clear user state even if logout fails
      setUser(null);
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">🔄</div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth callback route */}
          <Route 
            path="/auth-callback" 
            element={
              <AuthCallback onAuthSuccess={handleLoginSuccess} />
            } 
          />
          
          {/* Dashboard route - protected */}
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          
          {/* Main route */}
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <div className="auth-container">
                  <div className="auth-card">
                    <div className="lva-header">
                      <div className="lva-logo">LVA.studio™</div>
                      <div className="lva-tagline">Living Victorious Always</div>
                    </div>
                    
                    {currentView === 'login' ? (
                      <>
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                        <div className="auth-switch">
                          Don't have an account?{' '}
                          <a href="#" onClick={() => setCurrentView('signup')}>
                            Sign up here
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <SignupForm onSignupSuccess={handleLoginSuccess} />
                        <div className="auth-switch">
                          Already have an account?{' '}
                          <a href="#" onClick={() => setCurrentView('login')}>
                            Sign in here
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 