import { WIX_CONFIG } from './src/config/wix.js';
import fetch from 'node-fetch';

/**
 * Node.js script to create the "Main" collection for user profiles
 * Run this script from the command line to avoid CORS issues
 */

const createMainCollection = async () => {
  try {
    console.log('🚀 Creating Main collection for user profiles...');
    console.log('🌐 Using site ID:', WIX_CONFIG.siteId);
    
    const collectionData = {
      collection: {
        id: "Main",
        displayName: "User Profiles",
        displayField: "displayName",
        fields: [
          // Basic Information
          {
            key: "email",
            displayName: "Email",
            type: "TEXT",
            required: true,
            immutable: true
          },
          {
            key: "memberId",
            displayName: "Member ID",
            type: "TEXT",
            required: true,
            immutable: true
          },
          {
            key: "username",
            displayName: "Username",
            type: "TEXT",
            required: false
          },
          {
            key: "firstName",
            displayName: "First Name",
            type: "TEXT",
            required: false
          },
          {
            key: "lastName",
            displayName: "Last Name",
            type: "TEXT",
            required: false
          },
          {
            key: "displayName",
            displayName: "Display Name",
            type: "TEXT",
            required: false
          },
          {
            key: "phone",
            displayName: "Phone",
            type: "TEXT",
            required: false
          },
          {
            key: "profileImage",
            displayName: "Profile Image",
            type: "URL",
            required: false
          },
          
          // Status and Account Info
          {
            key: "status",
            displayName: "Account Status",
            type: "TEXT",
            required: true
          },
          {
            key: "accountType",
            displayName: "Account Type",
            type: "TEXT",
            required: true
          },
          {
            key: "memberSince",
            displayName: "Member Since",
            type: "DATETIME",
            required: true
          },
          {
            key: "lastLogin",
            displayName: "Last Login",
            type: "DATETIME",
            required: false
          },
          {
            key: "isEmailVerified",
            displayName: "Email Verified",
            type: "BOOLEAN",
            required: false
          },
          
          // About Me Section
          {
            key: "bio",
            displayName: "Bio",
            type: "RICH_TEXT",
            required: false
          },
          {
            key: "location",
            displayName: "Location",
            type: "TEXT",
            required: false
          },
          {
            key: "website",
            displayName: "Website",
            type: "URL",
            required: false
          },
          
          // Social Links (Object)
          {
            key: "socialLinks",
            displayName: "Social Links",
            type: "OBJECT",
            typeMetadata: {
              object: {
                fields: [
                  {
                    key: "facebook",
                    displayName: "Facebook",
                    type: "URL"
                  },
                  {
                    key: "twitter",
                    displayName: "Twitter",
                    type: "URL"
                  },
                  {
                    key: "instagram",
                    displayName: "Instagram",
                    type: "URL"
                  },
                  {
                    key: "linkedin",
                    displayName: "LinkedIn",
                    type: "URL"
                  }
                ]
              }
            },
            required: false
          },
          
          // Skills and Interests (Arrays)
          {
            key: "skills",
            displayName: "Skills",
            type: "ARRAY_STRING",
            required: false
          },
          {
            key: "interests",
            displayName: "Interests",
            type: "ARRAY_STRING",
            required: false
          },
          
          // Preferences (Object)
          {
            key: "preferences",
            displayName: "Preferences",
            type: "OBJECT",
            typeMetadata: {
              object: {
                fields: [
                  {
                    key: "notifications",
                    displayName: "Email Notifications",
                    type: "BOOLEAN"
                  },
                  {
                    key: "marketing",
                    displayName: "Marketing Emails",
                    type: "BOOLEAN"
                  }
                ]
              }
            },
            required: false
          },
          
          // System Fields
          {
            key: "createdAt",
            displayName: "Created At",
            type: "DATETIME",
            required: true,
            readOnly: true
          },
          {
            key: "updatedAt",
            displayName: "Updated At",
            type: "DATETIME",
            required: true
          },
          {
            key: "deletedAt",
            displayName: "Deleted At",
            type: "DATETIME",
            required: false
          }
        ],
        permissions: {
          insert: "SITE_MEMBER",
          update: "SITE_MEMBER",
          remove: "ADMIN",
          read: "SITE_MEMBER"
        },
        plugins: [
          {
            type: "CMS",
            cmsOptions: {
              siteSort: {
                sort: [
                  {
                    fieldKey: "createdAt",
                    direction: "DESC"
                  }
                ]
              }
            }
          }
        ]
      }
    };

    console.log('📋 Collection data prepared...');
    
    const response = await fetch('https://www.wixapis.com/wix-data/v2/collections', {
      method: 'POST',
      headers: {
        'Authorization': WIX_CONFIG.apiKey,
        'Content-Type': 'application/json',
        'wix-site-id': WIX_CONFIG.siteId
      },
      body: JSON.stringify(collectionData)
    });

    console.log('📡 Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Collection created successfully!');
    console.log('📋 Collection ID:', result.collection.id);
    console.log('📋 Collection Name:', result.collection.displayName);
    console.log('📋 Fields Count:', result.collection.fields.length);
    console.log('📋 Permissions:', result.collection.permissions);
    
    return result;
  } catch (error) {
    console.error('❌ Error creating collection:', error);
    throw error;
  }
};

// Run the setup
console.log('🔧 Starting Main collection creation...');
createMainCollection()
  .then(() => {
    console.log('✅ Setup completed successfully!');
    console.log('🎉 You can now use the profile management system!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }); 