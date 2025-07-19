import { wixClient, COLLECTIONS } from '../config/wix.js';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.token = localStorage.getItem('authToken');
  }

  // Sign up a new user
  async signup(userData) {
    try {
      // Check if user already exists
      const existingUser = await this.findUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash the password (in production, do this server-side)
      const hashedPassword = await this.hashPassword(userData.password);

      // Create user in Wix CMS
      const newUser = await wixClient.data.insertOne({
        collectionId: COLLECTIONS.USERS,
        item: {
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          createdAt: new Date().toISOString(),
          isActive: true
        }
      });

      // Generate JWT token
      const token = this.generateToken(newUser);
      
      // Store token and user data
      this.setAuthData(token, newUser);

      return {
        success: true,
        user: newUser,
        token
      };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // Sign in existing user
  async signin(email, password) {
    try {
      // Find user by email
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Generate JWT token
      const token = this.generateToken(user);
      
      // Store token and user data
      this.setAuthData(token, user);

      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  }

  // Sign out user
  signout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.token = null;
    this.currentUser = null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.currentUser;
  }

  // Get current user
  getCurrentUser() {
    if (!this.currentUser && this.token) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
    return this.currentUser;
  }

  // Find user by email
  async findUserByEmail(email) {
    try {
      const result = await wixClient.data.query({
        collectionId: COLLECTIONS.USERS,
        filter: {
          email: email
        },
        limit: 1
      });

      return result.items[0] || null;
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }

  // Hash password (in production, use a proper hashing library)
  async hashPassword(password) {
    // This is a simple hash for demo purposes
    // In production, use bcrypt or similar
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Verify password
  async verifyPassword(password, hashedPassword) {
    const hashedInput = await this.hashPassword(password);
    return hashedInput === hashedPassword;
  }

  // Generate JWT token (simplified for demo)
  generateToken(user) {
    // In production, use a proper JWT library
    const payload = {
      userId: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    return btoa(JSON.stringify(payload));
  }

  // Set authentication data
  setAuthData(token, user) {
    this.token = token;
    this.currentUser = user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Update user profile
  async updateProfile(userId, updates) {
    try {
      const updatedUser = await wixClient.data.updateOne({
        collectionId: COLLECTIONS.USERS,
        itemId: userId,
        item: updates
      });

      // Update local user data
      if (this.currentUser && this.currentUser._id === userId) {
        this.currentUser = { ...this.currentUser, ...updatedUser };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

export default new AuthService(); 