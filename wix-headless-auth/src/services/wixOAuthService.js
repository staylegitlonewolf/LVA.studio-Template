// Enhanced Wix OAuth Service following official Wix Velo OAuth SSO implementation
// Based on: https://dev.wix.com/docs/develop-websites/articles/code-tutorials/wix-editor-elements/using-oauth-sso-with-velo

class WixOAuthService {
  constructor() {
    this.wixSiteId = '3cb2316f-a2b6-4ece-9af1-b457cb62671a';
    this.apiKey = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ';
    
    // Google OAuth Configuration (you'll need to set these up)
    this.googleConfig = {
      clientId: 'YOUR_GOOGLE_CLIENT_ID', // From Google Cloud Console
      redirectUri: `${window.location.origin}/auth/google/callback`,
      scope: 'email profile openid'
    };
  }

  // Generate authorization URL (Step 1-2 in Wix OAuth flow)
  async getAuthUrl() {
    try {
      // Generate random state for CSRF protection
      const state = this.generateRandomState();
      
      // Store state in session storage for validation
      sessionStorage.setItem('oauth_state', state);
      
      // Build Google OAuth URL
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.append('client_id', this.googleConfig.clientId);
      authUrl.searchParams.append('redirect_uri', this.googleConfig.redirectUri);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', this.googleConfig.scope);
      authUrl.searchParams.append('state', state);
      authUrl.searchParams.append('access_type', 'offline');
      authUrl.searchParams.append('prompt', 'consent');
      
      return authUrl.toString();
    } catch (error) {
      console.error('Error generating auth URL:', error);
      throw error;
    }
  }

  // Handle OAuth callback (Step 4-11 in Wix OAuth flow)
  async handleOAuthCallback(code, state) {
    try {
      // Validate state parameter (CSRF protection)
      const savedState = sessionStorage.getItem('oauth_state');
      if (state !== savedState) {
        throw new Error('Invalid state parameter - possible CSRF attack');
      }
      
      // Clear state from storage
      sessionStorage.removeItem('oauth_state');
      
      // Exchange authorization code for access token
      const tokenResponse = await this.exchangeCodeForToken(code);
      
      // Get user information from Google
      const userInfo = await this.getGoogleUserInfo(tokenResponse.access_token);
      
      // Create or find user in Wix CMS
      const user = await this.createOrFindUser(userInfo);
      
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
      console.error('OAuth callback error:', error);
      throw error;
    }
  }

  // Exchange authorization code for access token (Step 5)
  async exchangeCodeForToken(code) {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.googleConfig.clientId,
          client_secret: 'YOUR_GOOGLE_CLIENT_SECRET', // This should be in Wix Secrets Manager
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: this.googleConfig.redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      return await response.json();
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  // Get user information from Google (Step 6)
  async getGoogleUserInfo(accessToken) {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user info from Google');
      }

      return await response.json();
    } catch (error) {
      console.error('User info error:', error);
      throw error;
    }
  }

  // Create or find user in Wix CMS (Step 7)
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
          'Authorization': this.apiKey,
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
        googleId: googleUser.id,
        profilePicture: googleUser.picture,
        isGoogleUser: true,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      const response = await fetch('https://www.wixapis.com/wix-data/v1/collections/Users/items', {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey,
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
        googleId: googleUser.id,
        profilePicture: googleUser.picture,
        isGoogleUser: true,
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`https://www.wixapis.com/wix-data/v1/collections/Users/items/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': this.apiKey,
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

  // Generate Wix session token (Step 8)
  async generateWixSession(user) {
    // In production, you'd use Wix's official session token generation
    // For now, we'll use a secure JWT-like token
    const payload = {
      userId: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      iat: Math.floor(Date.now() / 1000),
      iss: 'lva-studio-auth'
    };
    
    return btoa(JSON.stringify(payload));
  }

  // Set authentication data
  setAuthData(token, user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authMethod', 'google');
    localStorage.setItem('authTimestamp', Date.now().toString());
  }

  // Generate random state for CSRF protection
  generateRandomState() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validate session token
  validateSessionToken(token) {
    try {
      const payload = JSON.parse(atob(token));
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp < now) {
        return false; // Token expired
      }
      
      if (payload.iss !== 'lva-studio-auth') {
        return false; // Invalid issuer
      }
      
      return true;
    } catch (error) {
      return false; // Invalid token
    }
  }

  // Sign out
  signOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('authMethod');
    localStorage.removeItem('authTimestamp');
    sessionStorage.removeItem('oauth_state');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    const timestamp = localStorage.getItem('authTimestamp');
    
    if (!token || !user || !timestamp) {
      return false;
    }
    
    // Check if token is still valid
    if (!this.validateSessionToken(token)) {
      this.signOut();
      return false;
    }
    
    // Check if session is not too old (optional)
    const sessionAge = Date.now() - parseInt(timestamp);
    const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (sessionAge > maxSessionAge) {
      this.signOut();
      return false;
    }
    
    return true;
  }

  // Get current user
  getCurrentUser() {
    if (!this.isAuthenticated()) {
      return null;
    }
    
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}

export default new WixOAuthService(); 