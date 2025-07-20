import { wixAuthService } from './wixAuthService.js';
import { wixClient } from '../config/wix.js';

class AuthService {
  constructor() {
    this.collectionName = 'Main';
    this.collectionId = null;
  }

  // Initialize the service and ensure the Main collection exists
  async initialize() {
    try {
      console.log('🔧 Initializing Auth Service...');
      
      // Test connection to Wix
      const connectionTest = await wixClient.testConnection();
      console.log('🔗 Wix connection test:', connectionTest);
      
      if (!connectionTest.success) {
        throw new Error(`Failed to connect to Wix: ${connectionTest.error?.message || 'Unknown error'}`);
      }
      
      // Check if Main collection exists, create if not
      await this.ensureMainCollection();
      
      console.log('✅ Auth Service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Auth Service:', error);
      throw error;
    }
  }

  // Ensure the Main collection exists with required fields
  async ensureMainCollection() {
    try {
      console.log('📋 Checking for Main collection...');
      
      // Try to query the Main collection to see if it exists
      const testQuery = await wixClient.data.query({
        collectionId: this.collectionName,
        limit: 1
      });
      
      console.log('✅ Main collection exists');
      return true;
    } catch (error) {
      console.log('📋 Main collection not found, creating...');
      
      // Create the Main collection with required fields
      const collectionData = {
        collection: {
          displayName: 'Main',
          fields: [
            {
              key: 'title',
              displayName: 'Title',
              type: 'TEXT',
              required: true
            },
            {
              key: 'description',
              displayName: 'Description',
              type: 'TEXT'
            },
            {
              key: 'owner',
              displayName: 'Owner',
              type: 'REFERENCE',
              reference: {
                collectionId: 'Members',
                displayName: 'Owner'
              }
            },
            {
              key: 'createdDate',
              displayName: 'Created Date',
              type: 'DATE'
            },
            {
              key: 'updatedDate',
              displayName: 'Updated Date',
              type: 'DATE'
            }
          ]
        }
      };

      try {
        // Create collection using REST API
        const response = await fetch('https://www.wixapis.com/wix-data/v2/collections', {
          method: 'POST',
          headers: {
            'Authorization': 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ',
            'Content-Type': 'application/json',
            'wix-site-id': '3cb2316f-a2b6-4ece-9af1-b457cb62671a'
          },
          body: JSON.stringify(collectionData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Main collection created:', result);
          return true;
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to create Main collection:', errorText);
          throw new Error(`Failed to create collection: ${errorText}`);
        }
      } catch (createError) {
        console.error('❌ Error creating Main collection:', createError);
        throw createError;
      }
    }
  }

  // Verify authentication token
  async verifyToken(token) {
    try {
      console.log('🔍 Verifying token...');
      
      // Set the token in the auth service
      wixAuthService.client.auth.setTokens({
        accessToken: { value: token }
      });
      
      // Try to get current user
      const user = await wixAuthService.getCurrentUser();
      
      if (user) {
        console.log('✅ Token verified, user:', user);
        return { success: true, user };
      } else {
        console.log('❌ Token verification failed - no user found');
        return { success: false, error: 'Invalid token' };
      }
    } catch (error) {
      console.error('❌ Token verification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Handle user registration
  async registerUser(userData) {
    try {
      console.log('📝 Registering new user:', userData);
      
      // Create member in Wix
      const member = await wixAuthService.client.members.createMember({
        loginEmail: userData.email,
        password: userData.password,
        contactDetails: {
          firstName: userData.firstName,
          lastName: userData.lastName
        },
        privacyStatus: 'PUBLIC'
      });
      
      console.log('✅ Member created:', member);
      
      // Create entry in Main collection
      await this.createMainEntry(member.id, userData);
      
      return { success: true, member };
    } catch (error) {
      console.error('❌ User registration error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create entry in Main collection for new user
  async createMainEntry(memberId, userData) {
    try {
      console.log('📋 Creating Main collection entry for member:', memberId);
      
      const entryData = {
        title: `${userData.firstName} ${userData.lastName}'s Profile`,
        description: `Profile for ${userData.firstName} ${userData.lastName}`,
        owner: memberId,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
      };
      
      const result = await wixClient.data.insertOne({
        collectionId: this.collectionName,
        item: entryData
      });
      
      console.log('✅ Main collection entry created:', result);
      return result;
    } catch (error) {
      console.error('❌ Error creating Main collection entry:', error);
      throw error;
    }
  }

  // Handle user login
  async loginUser(credentials) {
    try {
      console.log('🔐 Processing user login...');
      
      // Use Wix authentication
      const loginResult = await wixAuthService.client.auth.login({
        email: credentials.email,
        password: credentials.password
      });
      
      if (loginResult) {
        console.log('✅ Login successful');
        
        // Get user data
        const user = await wixAuthService.getCurrentUser();
        
        return { success: true, user, tokens: loginResult };
      } else {
        console.log('❌ Login failed');
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: error.message };
    }
  }

  // Handle logout
  async logoutUser(token) {
    try {
      console.log('🚪 Processing user logout...');
      
      // Clear tokens
      wixAuthService.client.auth.setTokens(null);
      
      console.log('✅ Logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    try {
      console.log('👤 Getting user profile for:', userId);
      
      // Get member data
      const member = await wixAuthService.client.members.getMember(userId);
      
      // Get Main collection entries for this user
      const mainEntries = await wixClient.data.query({
        collectionId: this.collectionName,
        filter: { owner: userId },
        limit: 10
      });
      
      const profile = {
        member,
        mainEntries: mainEntries.items || []
      };
      
      console.log('✅ User profile retrieved');
      return { success: true, profile };
    } catch (error) {
      console.error('❌ Error getting user profile:', error);
      return { success: false, error: error.message };
    }
  }

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      console.log('✏️ Updating user profile for:', userId);
      
      // Update member data
      const updatedMember = await wixAuthService.client.members.updateMember(userId, {
        contactDetails: updates.contactDetails,
        profile: updates.profile
      });
      
      console.log('✅ User profile updated');
      return { success: true, member: updatedMember };
    } catch (error) {
      console.error('❌ Error updating user profile:', error);
      return { success: false, error: error.message };
    }
  }
}

export const authService = new AuthService(); 