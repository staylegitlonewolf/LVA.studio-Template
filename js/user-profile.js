// User Profile Management
class UserProfileManager {
  constructor() {
    this.userData = null;
    this.memberData = null;
    this.adminData = null;
    this.init();
  }

  init() {
    this.loadUserData();
    this.setupRibbonDisplay();
  }

  loadUserData() {
    try {
      this.userData = JSON.parse(localStorage.getItem('user_data') || 'null');
      this.memberData = JSON.parse(localStorage.getItem('member_data') || 'null');
      this.adminData = JSON.parse(localStorage.getItem('admin_data') || 'null');
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  getUserType() {
    if (this.adminData) return 'Admin';
    if (this.memberData) return 'Member';
    if (this.userData) return 'User';
    return null;
  }

  getRibbon() {
    if (this.adminData && this.adminData.ribbon) {
      return this.adminData.ribbon;
    }
    if (this.memberData && this.memberData.ribbon) {
      return this.memberData.ribbon;
    }
    return 'User';
  }

  getUserName() {
    if (this.adminData) {
      return `${this.adminData.firstName} ${this.adminData.lastName}`.trim() || this.adminData.username;
    }
    if (this.memberData) {
      return `${this.memberData.firstName} ${this.memberData.lastName}`.trim() || this.memberData.username;
    }
    if (this.userData) {
      return this.userData.username;
    }
    return 'Unknown User';
  }

  getUserEmail() {
    if (this.adminData) return this.adminData.email;
    if (this.memberData) return this.memberData.email;
    if (this.userData) return this.userData.email;
    return '';
  }

  setupRibbonDisplay() {
    // Find all ribbon display elements
    const ribbonElements = document.querySelectorAll('.user-ribbon, .ribbon-display');
    
    ribbonElements.forEach(element => {
      const ribbon = this.getRibbon();
      const userType = this.getUserType();
      
      if (ribbon && userType) {
        element.textContent = ribbon;
        element.className = `user-ribbon ${userType.toLowerCase()}-ribbon`;
        
        // Add appropriate styling classes
        element.classList.remove('member-ribbon', 'admin-ribbon', 'user-ribbon');
        element.classList.add(`${userType.toLowerCase()}-ribbon`);
      }
    });

    // Update user name displays
    const nameElements = document.querySelectorAll('.user-name, .display-name');
    const userName = this.getUserName();
    
    nameElements.forEach(element => {
      if (userName) {
        element.textContent = userName;
      }
    });

    // Update user email displays
    const emailElements = document.querySelectorAll('.user-email, .display-email');
    const userEmail = this.getUserEmail();
    
    emailElements.forEach(element => {
      if (userEmail) {
        element.textContent = userEmail;
      }
    });
  }

  // Method to update ribbon display dynamically
  updateRibbonDisplay() {
    this.loadUserData();
    this.setupRibbonDisplay();
  }

  // Method to check if user is admin
  isAdmin() {
    return this.getUserType() === 'Admin';
  }

  // Method to check if user is member
  isMember() {
    return this.getUserType() === 'Member';
  }

  // Method to check if user has specific ribbon
  hasRibbon(ribbon) {
    return this.getRibbon() === ribbon;
  }

  // Method to get user profile data
  getProfileData() {
    return {
      user: this.userData,
      member: this.memberData,
      admin: this.adminData,
      type: this.getUserType(),
      ribbon: this.getRibbon(),
      name: this.getUserName(),
      email: this.getUserEmail()
    };
  }
}

// Initialize User Profile Manager
const userProfileManager = new UserProfileManager();

// Export for use in other files
window.userProfileManager = userProfileManager;

// Auto-update ribbon display when DOM changes
const observer = new MutationObserver(() => {
  userProfileManager.setupRibbonDisplay();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
}); 
