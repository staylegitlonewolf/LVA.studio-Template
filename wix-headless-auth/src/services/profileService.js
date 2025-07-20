import { wixClient } from '../config/wix.js';

class ProfileService {
  constructor() {
    // Collection ID for the "User Profiles" collection where user profiles are stored
    this.MAIN_COLLECTION_ID = 'User Profiles';
  }

  /**
   * Create or update a user profile in the Main collection
   * @param {Object} user - The user object from Wix authentication
   * @returns {Promise<Object>} - The created/updated profile
   */
  async createOrUpdateProfile(user) {
    try {
      console.log('👤 Creating/updating profile for user:', user);
      
      // Extract email from user object (handle different possible structures)
      const email = user.loginEmail || user.member?.loginEmail || user.email || user.member?.profile?.email || user.member?.contactDetails?.email || user.member?.email;
      
      if (!email) {
        console.error('❌ No email found in user object:', user);
        console.log('🔍 User object structure:', JSON.stringify(user, null, 2));
        
        // If user has a member object, let's examine it more closely
        if (user.member) {
          console.log('🔍 Member object keys:', Object.keys(user.member));
          console.log('🔍 Member object:', JSON.stringify(user.member, null, 2));
          
          // Try to find email in member object
          const memberEmail = user.member.loginEmail || user.member.email || user.member.contactDetails?.email || user.member.profile?.email;
          if (memberEmail) {
            console.log('✅ Found email in member object:', memberEmail);
            return memberEmail;
          }
        }
        
        // Try to find any email-like field in the user object
        const allFields = this.getAllFields(user);
        console.log('🔍 All available fields:', allFields);
        
        // Look for any field that might contain an email
        const possibleEmails = allFields.filter(field => 
          typeof field.value === 'string' && 
          field.value.includes('@') && 
          field.value.includes('.')
        );
        
        if (possibleEmails.length > 0) {
          console.log('🔍 Found possible email fields:', possibleEmails);
          const foundEmail = possibleEmails[0].value;
          console.log('✅ Using found email:', foundEmail);
          return foundEmail;
        }
        
        // If no email found, try to create a profile with a placeholder email
        console.log('⚠️ No email found, creating profile with placeholder email');
        const placeholderEmail = `user_${Date.now()}@placeholder.com`;
        console.log('📧 Using placeholder email:', placeholderEmail);
        return placeholderEmail;
      }
      
      console.log('📧 Using email for profile:', email);
      
      // Check if profile already exists by email
      const existingProfile = await this.findProfileByEmail(email);
      
      if (existingProfile) {
        console.log('🔄 Profile already exists, updating...');
        return await this.updateProfile(existingProfile._id, user);
      } else {
        console.log('🆕 Creating new profile...');
        return await this.createProfile(user);
      }
    } catch (error) {
      console.error('❌ Error in createOrUpdateProfile:', error);
      throw error;
    }
  }

  /**
   * Create a new user profile
   * @param {Object} user - The user object from Wix authentication
   * @returns {Promise<Object>} - The created profile
   */
  async createProfile(user) {
    try {
      // Extract user data from different possible structures
      const email = user.loginEmail || user.member?.loginEmail || user.email || user.member?.profile?.email || user.member?.contactDetails?.email;
      const memberId = user.id || user.member?.id;
      const firstName = user.contactDetails?.firstName || user.member?.profile?.firstName || user.member?.contactDetails?.firstName || '';
      const lastName = user.contactDetails?.lastName || user.member?.profile?.lastName || user.member?.contactDetails?.lastName || '';
      const phone = user.contactDetails?.phones?.[0]?.phone || user.member?.profile?.phones?.[0] || user.member?.contactDetails?.phones?.[0]?.phone || '';
      const profileImage = user.profile?.image?.url || user.member?.profile?.photo?.url || '';
      const isEmailVerified = user.loginEmailVerified || user.member?.loginEmailVerified || false;
      
      console.log('📝 Creating new profile for:', email);
      
      const profileData = {
        email: email,
        memberId: memberId,
        username: email.split('@')[0], // Default username from email
        firstName: firstName,
        lastName: lastName,
        displayName: firstName && lastName 
          ? `${firstName} ${lastName}`
          : email.split('@')[0],
        phone: phone,
        profileImage: profileImage,
        status: 'active',
        accountType: 'member',
        memberSince: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isEmailVerified: isEmailVerified,
        preferences: {
          notifications: true,
          marketing: false
        },
        // Additional fields that can be edited by the user
        bio: '',
        location: '',
        website: '',
        socialLinks: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        },
        skills: [],
        interests: [],
        // System fields
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('📋 Profile data to insert:', profileData);
      
      const result = await wixClient.data.insertOne({
        collectionId: this.MAIN_COLLECTION_ID,
        item: profileData
      });

      console.log('✅ Profile created successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Error creating profile:', error);
      throw error;
    }
  }

  /**
   * Update an existing user profile
   * @param {string} profileId - The profile ID to update
   * @param {Object} user - The user object from Wix authentication
   * @returns {Promise<Object>} - The updated profile
   */
  async updateProfile(profileId, user) {
    try {
      console.log('🔄 Updating profile:', profileId);
      
      // Extract user data from different possible structures
      const memberId = user.id || user.member?.id;
      const firstName = user.contactDetails?.firstName || user.member?.profile?.firstName || user.member?.contactDetails?.firstName || '';
      const lastName = user.contactDetails?.lastName || user.member?.profile?.lastName || user.member?.contactDetails?.lastName || '';
      const phone = user.contactDetails?.phones?.[0]?.phone || user.member?.profile?.phones?.[0] || user.member?.contactDetails?.phones?.[0]?.phone || '';
      const profileImage = user.profile?.image?.url || user.member?.profile?.photo?.url || '';
      const isEmailVerified = user.loginEmailVerified || user.member?.loginEmailVerified || false;
      const email = user.loginEmail || user.member?.loginEmail || user.email || user.member?.profile?.email || user.member?.contactDetails?.email;
      
      const updateData = {
        memberId: memberId,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName && lastName 
          ? `${firstName} ${lastName}`
          : email.split('@')[0],
        phone: phone,
        profileImage: profileImage,
        lastLogin: new Date().toISOString(),
        isEmailVerified: isEmailVerified,
        updatedAt: new Date().toISOString()
      };

      console.log('📋 Profile data to update:', updateData);
      
      const result = await wixClient.data.updateOne({
        collectionId: this.MAIN_COLLECTION_ID,
        itemId: profileId,
        item: updateData
      });

      console.log('✅ Profile updated successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      throw error;
    }
  }

  // Helper function to extract all fields from a nested object
  getAllFields(obj, prefix = '') {
    const fields = [];
    
    if (obj && typeof obj === 'object') {
      for (const [key, value] of Object.entries(obj)) {
        const fieldName = prefix ? `${prefix}.${key}` : key;
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // Recursively get fields from nested objects
          fields.push(...this.getAllFields(value, fieldName));
        } else {
          // Add the field
          fields.push({
            path: fieldName,
            value: value,
            type: typeof value
          });
        }
      }
    }
    
    return fields;
  }

  /**
   * Find a profile by email address
   * @param {string} email - The email to search for
   * @returns {Promise<Object|null>} - The profile if found, null otherwise
   */
  async findProfileByEmail(email) {
    try {
      console.log('🔍 Searching for profile with email:', email);
      
      const result = await wixClient.data.query({
        collectionId: this.MAIN_COLLECTION_ID,
        filter: {
          email: email
        },
        limit: 1
      });

      if (result.items && result.items.length > 0) {
        console.log('✅ Profile found:', result.items[0]);
        return result.items[0];
      } else {
        console.log('ℹ️ No profile found for email:', email);
        return null;
      }
    } catch (error) {
      console.error('❌ Error finding profile by email:', error);
      throw error;
    }
  }

  /**
   * Get a profile by member ID
   * @param {string} memberId - The Wix member ID
   * @returns {Promise<Object|null>} - The profile if found, null otherwise
   */
  async getProfileByMemberId(memberId) {
    try {
      console.log('🔍 Searching for profile with member ID:', memberId);
      
      const result = await wixClient.data.query({
        collectionId: this.MAIN_COLLECTION_ID,
        filter: {
          memberId: memberId
        },
        limit: 1
      });

      if (result.items && result.items.length > 0) {
        console.log('✅ Profile found:', result.items[0]);
        return result.items[0];
      } else {
        console.log('ℹ️ No profile found for member ID:', memberId);
        return null;
      }
    } catch (error) {
      console.error('❌ Error finding profile by member ID:', error);
      throw error;
    }
  }

  /**
   * Update user-editable profile fields
   * @param {string} profileId - The profile ID to update
   * @param {Object} profileData - The profile data to update
   * @returns {Promise<Object>} - The updated profile
   */
  async updateUserProfile(profileId, profileData) {
    try {
      console.log('✏️ Updating user profile:', profileId);
      console.log('📋 Update data:', profileData);
      
      // Only allow updating specific user-editable fields
      const allowedFields = [
        'username', 'firstName', 'lastName', 'displayName', 'phone',
        'bio', 'location', 'website', 'socialLinks', 'skills', 'interests',
        'preferences'
      ];

      const updateData = {};
      allowedFields.forEach(field => {
        if (profileData[field] !== undefined) {
          updateData[field] = profileData[field];
        }
      });

      // Always update the updatedAt timestamp
      updateData.updatedAt = new Date().toISOString();

      console.log('📋 Filtered update data:', updateData);
      
      const result = await wixClient.data.updateOne({
        collectionId: this.MAIN_COLLECTION_ID,
        itemId: profileId,
        item: updateData
      });

      console.log('✅ User profile updated successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Delete a user profile
   * @param {string} profileId - The profile ID to delete
   * @returns {Promise<boolean>} - True if deleted successfully
   */
  async deleteProfile(profileId) {
    try {
      console.log('🗑️ Deleting profile:', profileId);
      
      // Note: This would require implementing a delete method in wixClient
      // For now, we'll mark the profile as deleted instead
      const result = await wixClient.data.updateOne({
        collectionId: this.MAIN_COLLECTION_ID,
        itemId: profileId,
        item: {
          status: 'deleted',
          deletedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      });

      console.log('✅ Profile marked as deleted:', result);
      return true;
    } catch (error) {
      console.error('❌ Error deleting profile:', error);
      throw error;
    }
  }

  /**
   * Get all profiles (for admin purposes)
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - The profiles
   */
  async getAllProfiles(options = {}) {
    try {
      console.log('📋 Getting all profiles with options:', options);
      
      const result = await wixClient.data.query({
        collectionId: this.MAIN_COLLECTION_ID,
        filter: options.filter || {},
        limit: options.limit || 50
      });

      console.log(`✅ Found ${result.items?.length || 0} profiles`);
      return result;
    } catch (error) {
      console.error('❌ Error getting all profiles:', error);
      throw error;
    }
  }
}

export const profileService = new ProfileService(); 