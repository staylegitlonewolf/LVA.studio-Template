// Auth Integration and Debugging
class AuthIntegration {
  constructor() {
    this.init();
  }

  init() {
    this.setupGlobalFunctions();
    this.checkSystemStatus();
  }

  setupGlobalFunctions() {
    // Global functions for HTML onclick handlers
    window.goToLogin = () => {
      window.location.href = 'login.html';
    };

    window.showProfile = () => {
      if (window.userProfile) {
        window.userProfile.open();
      } else {
        console.error('User profile modal not initialized');
      }
    };

    window.logout = () => {
      if (window.userProfile) {
        window.userProfile.logout();
      } else {
        // Fallback logout
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('member_data');
        window.location.href = 'login.html';
      }
    };

    window.toggleUserMenu = () => {
      const dropdown = document.querySelector('.user-dropdown');
      if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      }
    };
  }

  async checkSystemStatus() {
    console.log('🔍 Checking LVA Studio Auth System Status...');
    
    // Check if Strapi is running
    try {
      const response = await fetch('http://localhost:1337/api/members');
      if (response.ok) {
        console.log('✅ Strapi backend is running');
      } else {
        console.warn('⚠️ Strapi backend responded with status:', response.status);
      }
    } catch (error) {
      console.error('❌ Strapi backend is not accessible:', error.message);
      console.log('💡 Make sure to start Strapi with: cd lva-studio-backend && npm run develop');
    }

    // Check authentication status
    const token = localStorage.getItem('auth_token');
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const memberData = JSON.parse(localStorage.getItem('member_data') || '{}');

    if (token && userData.id) {
      console.log('✅ User is authenticated:', userData.username || userData.email);
      if (memberData.id) {
        console.log('✅ Member profile found:', memberData.ribbon_role);
      } else {
        console.log('⚠️ No member profile found - will be created automatically');
      }
    } else {
      console.log('ℹ️ No user is currently authenticated');
    }

    // Check if required components are loaded
    if (window.authManager) {
      console.log('✅ Auth Manager initialized');
    } else {
      console.error('❌ Auth Manager not found');
    }

    if (window.userProfile) {
      console.log('✅ User Profile Modal initialized');
    } else {
      console.error('❌ User Profile Modal not found');
    }
  }

  // Debug function to show current auth state
  debugAuthState() {
    const token = localStorage.getItem('auth_token');
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const memberData = JSON.parse(localStorage.getItem('member_data') || '{}');

    console.log('🔍 Current Auth State:');
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('User Data:', userData);
    console.log('Member Data:', memberData);
    
    return { token: !!token, userData, memberData };
  }

  // Function to clear all auth data (for testing)
  clearAuthData() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('member_data');
    console.log('🧹 Auth data cleared');
    location.reload();
  }
}

// Initialize auth integration
const authIntegration = new AuthIntegration();

// Export for global access
window.authIntegration = authIntegration;
window.debugAuthState = () => authIntegration.debugAuthState();
window.clearAuthData = () => authIntegration.clearAuthData(); 