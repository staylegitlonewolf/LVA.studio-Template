// Google OAuth Service for Wix Headless
class GoogleAuthService {
  constructor() {
    this.googleClientId = 'YOUR_GOOGLE_CLIENT_ID'; // You'll get this from Google Cloud Console
    this.wixSiteId = '3cb2316f-a2b6-4ece-9af1-b457cb62671a';
    this.redirectUri = window.location.origin + '/auth/google/callback';
  }

  // Initialize Google OAuth
  async initGoogleAuth() {
    // Load Google OAuth script
    if (!window.google) {
      await this.loadGoogleScript();
    }
    
    // Initialize Google OAuth
    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: this.handleGoogleSignIn.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }

  // Load Google OAuth script
  loadGoogleScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Handle Google sign-in
  async handleGoogleSignIn(response) {
    try {
      const credential = response.credential;
      const payload = this.decodeJwtResponse(credential);
      
      // Create or find user in Wix CMS
      const user = await this.createOrFindUser(payload);
      
      // Generate Wix session token
      const sessionToken = await this.generateWixSession(user);
      
      // Store authentication data
      this.setAuthData(sessionToken, user);
      
      return {
        success: true,
        user,
        token: sessionToken
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  // Decode JWT response from Google
  decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  // Create or find user in Wix CMS
  async createOrFindUser(googleUser) {
    try {
      // Check if user exists
      const existingUser = await this.findUserByEmail(googleUser.email);
      
      if (existingUser) {
        // Update user with Google info
        return await this.updateUserWithGoogle(existingUser._id, googleUser);
      } else {
        // Create new user
        return await this.createUserFromGoogle(googleUser);
      }
    } catch (error) {
      console.error('Error creating/finding user:', error);
      throw error;
    }
  }

  // Find user by email
  async findUserByEmail(email) {
    try {
      const response = await fetch(`https://www.wixapis.com/wix-data/v1/collections/Users/items?filter=${encodeURIComponent(JSON.stringify({email: email}))}&limit=1`, {
        headers: {
          'Authorization': 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ',
          'wix-site-id': this.wixSiteId
        }
      });
      
      const result = await response.json();
      return result.items[0] || null;
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }

  // Create user from Google data
  async createUserFromGoogle(googleUser) {
    try {
      const newUser = {
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        googleId: googleUser.sub,
        profilePicture: googleUser.picture,
        isGoogleUser: true,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      const response = await fetch('https://www.wixapis.com/wix-data/v1/collections/Users/items', {
        method: 'POST',
        headers: {
          'Authorization': 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ',
          'Content-Type': 'application/json',
          'wix-site-id': this.wixSiteId
        },
        body: JSON.stringify(newUser)
      });

      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user with Google data
  async updateUserWithGoogle(userId, googleUser) {
    try {
      const updates = {
        googleId: googleUser.sub,
        profilePicture: googleUser.picture,
        isGoogleUser: true,
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`https://www.wixapis.com/wix-data/v1/collections/Users/items/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ',
          'Content-Type': 'application/json',
          'wix-site-id': this.wixSiteId
        },
        body: JSON.stringify(updates)
      });

      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Generate Wix session token
  async generateWixSession(user) {
    // For now, we'll use a simple JWT-like token
    // In production, you'd use Wix's authentication API
    const payload = {
      userId: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    return btoa(JSON.stringify(payload));
  }

  // Set authentication data
  setAuthData(token, user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authMethod', 'google');
  }

  // Render Google sign-in button
  renderSignInButton(elementId) {
    if (window.google && window.google.accounts) {
      google.accounts.id.renderButton(
        document.getElementById(elementId),
        {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 300
        }
      );
    }
  }

  // Sign out
  signOut() {
    if (window.google && window.google.accounts) {
      google.accounts.id.disableAutoSelect();
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('authMethod');
  }
}

export default new GoogleAuthService(); 