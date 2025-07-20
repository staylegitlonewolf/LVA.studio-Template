// Authentication Integration for LVA.studio
// This file handles the integration between the frontend and Wix Headless Auth backend

class AuthIntegration {
  constructor() {
    // Use the Wix Headless Auth backend URL
    this.backendUrl = 'https://staylegit.wixstudio.com/lvastudiot1';
    this.authWindow = null;
    this.user = null;
    this.init();
  }

  init() {
    // Check if user is already authenticated on page load
    this.checkAuthStatus();
    
    // Listen for messages from auth popup
    window.addEventListener('message', (event) => {
      if (event.origin !== this.backendUrl) return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        this.handleAuthSuccess(event.data.user);
      } else if (event.data.type === 'AUTH_ERROR') {
        this.handleAuthError(event.data.error);
      }
    });
  }

  async checkAuthStatus() {
    try {
      const token = localStorage.getItem('wix_access_token');
      if (token) {
        // Verify token is still valid by making a request to the backend
        const response = await fetch(`${this.backendUrl}/api/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          this.user = userData;
          this.updateUI(true);
        } else {
          // Token is invalid, clear it
          this.clearAuth();
        }
      } else {
        this.updateUI(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      this.clearAuth();
    }
  }

  handleAuthClick() {
    if (this.user) {
      // User is logged in, show dropdown
      this.toggleUserDropdown();
    } else {
      // User is not logged in, open auth popup
      this.openAuthPopup();
    }
  }

  openAuthPopup() {
    const popupWidth = 500;
    const popupHeight = 600;
    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;

    this.authWindow = window.open(
      `${this.backendUrl}/auth`,
      'wix-auth',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    // Focus the popup
    if (this.authWindow) {
      this.authWindow.focus();
    }
  }

  handleAuthSuccess(userData) {
    this.user = userData;
    this.updateUI(true);
    
    // Close the popup if it's still open
    if (this.authWindow && !this.authWindow.closed) {
      this.authWindow.close();
    }

    // Show success message
    this.showNotification('Login successful! Welcome back.', 'success');
    
    // Redirect to home or refresh the page
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  handleAuthError(error) {
    console.error('Authentication error:', error);
    this.showNotification('Login failed. Please try again.', 'error');
    
    // Close the popup if it's still open
    if (this.authWindow && !this.authWindow.closed) {
      this.authWindow.close();
    }
  }

  async logout() {
    try {
      const token = localStorage.getItem('wix_access_token');
      if (token) {
        // Call logout endpoint
        await fetch(`${this.backendUrl}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.clearAuth();
      this.showNotification('Logged out successfully.', 'success');
      
      // Redirect to home
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  clearAuth() {
    localStorage.removeItem('wix_access_token');
    localStorage.removeItem('wix_refresh_token');
    localStorage.removeItem('wix_user_data');
    this.user = null;
    this.updateUI(false);
  }

  updateUI(isLoggedIn) {
    const authBtn = document.getElementById('auth-btn');
    const authText = document.getElementById('auth-text');
    const userDropdown = document.getElementById('user-dropdown');

    if (isLoggedIn && this.user) {
      authText.textContent = this.user.profile?.firstName || this.user.loginEmail || 'User';
      authBtn.classList.add('logged-in');
      userDropdown.style.display = 'none';
    } else {
      authText.textContent = 'Login';
      authBtn.classList.remove('logged-in');
      userDropdown.style.display = 'none';
    }
  }

  toggleUserDropdown() {
    const userDropdown = document.getElementById('user-dropdown');
    const isVisible = userDropdown.style.display !== 'none';
    userDropdown.style.display = isVisible ? 'none' : 'block';
  }

  viewProfile() {
    if (this.user) {
      // Open profile page in new tab
      window.open(`${this.backendUrl}/dashboard`, '_blank');
    }
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `auth-notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 70px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
      max-width: 300px;
      word-wrap: break-word;
    `;

    // Set background color based on type
    if (type === 'success') {
      notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
      notification.style.backgroundColor = '#f44336';
    } else {
      notification.style.backgroundColor = '#2196F3';
    }

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize authentication integration
const authIntegration = new AuthIntegration();

// Global functions for HTML onclick handlers
window.handleAuthClick = () => authIntegration.handleAuthClick();
window.logout = () => authIntegration.logout();
window.viewProfile = () => authIntegration.viewProfile();

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  const authMenu = document.querySelector('.auth-menu');
  const userDropdown = document.getElementById('user-dropdown');
  
  if (authMenu && !authMenu.contains(event.target) && userDropdown) {
    userDropdown.style.display = 'none';
  }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .auth-btn-menu.logged-in {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
  }
  
  .auth-btn-menu.logged-in:hover {
    background: linear-gradient(135deg, #45a049, #3d8b40);
  }
`;
document.head.appendChild(style); 