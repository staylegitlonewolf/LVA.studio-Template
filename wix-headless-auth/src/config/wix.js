// Wix configuration for browser environment
// This should point to your Wix CMS backend site: https://staylegit.wixstudio.com/lvastudiot1
export const WIX_CONFIG = {
  // Make sure this site ID matches your Wix CMS backend site
  siteId: '3cb2316f-a2b6-4ece-9af1-b457cb62671a',
  // IMPORTANT: You need to replace this with your actual OAuth app client ID
  // Get this from your Wix Headless project dashboard:
  // 1. Go to your project dashboard
  // 2. Click Settings → Headless Settings
  // 3. Create an OAuth app or use an existing one
  // 4. Copy the Client ID from the OAuth app
  clientId: 'a4452af2-5a36-41b8-80c3-446da4824e27', // Your OAuth client ID
  apiKey: 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ'
};

// Helper function to get the correct API URL
const getApiUrl = (endpoint) => {
  // Use direct URL for both development and production
  return `https://www.wixapis.com${endpoint}`;
};

// Simple Wix API client for browser
export const wixClient = {
  data: {
    insertOne: async ({ collectionId, item }) => {
      try {
        console.log('📡 Wix API - Inserting item:', { collectionId, item });
        console.log('🌐 Using site ID:', WIX_CONFIG.siteId);
        
        const response = await fetch(getApiUrl(`/wix-data/v2/collections/${collectionId}/items`), {
          method: 'POST',
          headers: {
            'Authorization': WIX_CONFIG.apiKey,
            'Content-Type': 'application/json',
            'wix-site-id': WIX_CONFIG.siteId
          },
          body: JSON.stringify(item)
        });

        console.log('📡 Wix API Response Status:', response.status);
        
        if (!response.ok) {
          let errorData;
          try {
            const errorText = await response.text();
            console.log('📡 Error Response Text:', errorText);
            errorData = errorText ? JSON.parse(errorText) : { message: `HTTP ${response.status}: ${response.statusText}` };
          } catch (parseError) {
            errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
          }
          console.error('❌ Wix API Error:', errorData);
          throw new Error(`Wix API Error: ${errorData.message || errorData.error || 'Unknown error'}`);
        }

        const result = await response.json();
        console.log('✅ Wix API Success:', result);
        return result;
      } catch (error) {
        console.error('❌ Wix API insertOne error:', error);
        throw error;
      }
    },
    query: async ({ collectionId, filter, limit }) => {
      try {
        console.log('📡 Wix API - Querying:', { collectionId, filter, limit });
        console.log('🌐 Using site ID:', WIX_CONFIG.siteId);
        
        const queryParams = new URLSearchParams();
        if (filter) queryParams.append('filter', JSON.stringify(filter));
        if (limit) queryParams.append('limit', limit);
        
        const response = await fetch(getApiUrl(`/wix-data/v2/collections/${collectionId}/items?${queryParams}`), {
          headers: {
            'Authorization': WIX_CONFIG.apiKey,
            'wix-site-id': WIX_CONFIG.siteId
          }
        });

        console.log('📡 Wix API Query Response Status:', response.status);
        
        if (!response.ok) {
          let errorData;
          try {
            const errorText = await response.text();
            console.log('📡 Error Response Text:', errorText);
            errorData = errorText ? JSON.parse(errorText) : { message: `HTTP ${response.status}: ${response.statusText}` };
          } catch (parseError) {
            errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
          }
          console.error('❌ Wix API Query Error:', errorData);
          throw new Error(`Wix API Query Error: ${errorData.message || errorData.error || 'Unknown error'}`);
        }

        const result = await response.json();
        console.log('✅ Wix API Query Success:', result);
        return result;
      } catch (error) {
        console.error('❌ Wix API query error:', error);
        throw error;
      }
    },
    updateOne: async ({ collectionId, itemId, item }) => {
      try {
        console.log('📡 Wix API - Updating item:', { collectionId, itemId, item });
        console.log('🌐 Using site ID:', WIX_CONFIG.siteId);
        
        const response = await fetch(getApiUrl(`/wix-data/v2/collections/${collectionId}/items/${itemId}`), {
          method: 'PATCH',
          headers: {
            'Authorization': WIX_CONFIG.apiKey,
            'Content-Type': 'application/json',
            'wix-site-id': WIX_CONFIG.siteId
          },
          body: JSON.stringify(item)
        });

        console.log('📡 Wix API Update Response Status:', response.status);
        
        if (!response.ok) {
          let errorData;
          try {
            const errorText = await response.text();
            console.log('📡 Error Response Text:', errorText);
            errorData = errorText ? JSON.parse(errorText) : { message: `HTTP ${response.status}: ${response.statusText}` };
          } catch (parseError) {
            errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
          }
          console.error('❌ Wix API Update Error:', errorData);
          throw new Error(`Wix API Update Error: ${errorData.message || errorData.error || 'Unknown error'}`);
        }

        const result = await response.json();
        console.log('✅ Wix API Update Success:', result);
        return result;
      } catch (error) {
        console.error('❌ Wix API updateOne error:', error);
        throw error;
      }
    }
  },

  // Test connection method
  testConnection: async () => {
    try {
      console.log('🧪 Testing Wix API connection...');
      console.log('🌐 Testing connection to site ID:', WIX_CONFIG.siteId);
      console.log('🔗 CMS Backend URL: https://staylegit.wixstudio.com/lvastudiot1');
      console.log('🔗 API URL being used:', getApiUrl('/wix-data/v2/collections'));
      
      const response = await fetch(getApiUrl(`/wix-data/v2/collections`), {
        headers: {
          'Authorization': WIX_CONFIG.apiKey,
          'wix-site-id': WIX_CONFIG.siteId
        }
      });

      console.log('📡 Test Response Status:', response.status);
      console.log('📡 Test Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        let errorData;
        try {
          const errorText = await response.text();
          console.log('📡 Error Response Text:', errorText);
          errorData = errorText ? JSON.parse(errorText) : { message: `HTTP ${response.status}: ${response.statusText}` };
        } catch (parseError) {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        console.error('❌ Wix API test failed:', errorData);
        return { success: false, error: errorData };
      }

      const responseText = await response.text();
      console.log('📡 Response Text:', responseText);
      
      if (!responseText) {
        console.error('❌ Empty response from Wix API');
        return { success: false, error: { message: 'Empty response from server' } };
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        return { success: false, error: { message: 'Invalid JSON response from server' } };
      }

      console.log('✅ Wix API test successful:', result);
      
      // Check if we have any collections
      if (result.collections && result.collections.length > 0) {
        console.log('📋 Available collections:');
        result.collections.forEach(collection => {
          console.log(`  - ${collection.displayName} (ID: ${collection.id})`);
        });
      } else {
        console.log('📋 No collections found - we need to create a Users collection');
      }
      
      return { success: true, data: result };
    } catch (error) {
      console.error('❌ Wix API test error:', error);
      return { success: false, error: error.message };
    }
  }
};

// CMS Collection IDs
export const COLLECTIONS = {
  USERS: 'Users'
};

export default wixClient; 