import { WIX_CONFIG } from './src/config/wix.js';

/**
 * Setup script to create the "Main" collection for user profiles
 * Run this script once to create the collection in your Wix CMS
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

    console.log('📋 Collection data prepared:', JSON.stringify(collectionData, null, 2));
    
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
    console.log('📋 Collection details:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('❌ Error creating collection:', error);
    throw error;
  }
};

// Run the setup
if (typeof window !== 'undefined') {
  // Browser environment
  window.createMainCollection = createMainCollection;
  console.log('🔧 Setup script loaded. Run createMainCollection() in the browser console to create the collection.');
} else {
  // Node.js environment
  createMainCollection()
    .then(() => {
      console.log('✅ Setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    });
} 