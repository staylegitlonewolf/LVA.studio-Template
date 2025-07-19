// Wix configuration for browser environment
const WIX_CONFIG = {
  siteId: '3cb2316f-a2b6-4ece-9af1-b457cb62671a',
  apiKey: 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ'
};

// Simple Wix API client for browser
export const wixClient = {
  data: {
    insertOne: async ({ collectionId, item }) => {
      const response = await fetch(`https://www.wixapis.com/wix-data/v1/collections/${collectionId}/items`, {
        method: 'POST',
        headers: {
          'Authorization': WIX_CONFIG.apiKey,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_CONFIG.siteId
        },
        body: JSON.stringify(item)
      });
      return response.json();
    },
    query: async ({ collectionId, filter, limit }) => {
      const queryParams = new URLSearchParams();
      if (filter) queryParams.append('filter', JSON.stringify(filter));
      if (limit) queryParams.append('limit', limit);
      
      const response = await fetch(`https://www.wixapis.com/wix-data/v1/collections/${collectionId}/items?${queryParams}`, {
        headers: {
          'Authorization': WIX_CONFIG.apiKey,
          'wix-site-id': WIX_CONFIG.siteId
        }
      });
      return response.json();
    },
    updateOne: async ({ collectionId, itemId, item }) => {
      const response = await fetch(`https://www.wixapis.com/wix-data/v1/collections/${collectionId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': WIX_CONFIG.apiKey,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_CONFIG.siteId
        },
        body: JSON.stringify(item)
      });
      return response.json();
    }
  }
};

// CMS Collection IDs
export const COLLECTIONS = {
  USERS: 'Users'
};

export default wixClient; 