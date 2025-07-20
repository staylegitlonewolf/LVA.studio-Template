import { WIX_CONFIG } from './src/config/wix.js';

/**
 * Script to check OAuth configuration and help debug issues
 */

console.log('🔧 OAuth Configuration Check');
console.log('============================');
console.log('');

console.log('📋 Current Configuration:');
console.log('  Site ID:', WIX_CONFIG.siteId);
console.log('  Client ID:', WIX_CONFIG.clientId);
console.log('  API Key:', WIX_CONFIG.apiKey ? '✅ Set' : '❌ Missing');
console.log('');

console.log('🌐 Development URLs:');
console.log('  Current Origin:', typeof window !== 'undefined' ? window.location.origin : 'N/A (Node.js)');
console.log('  Auth Callback URL:', typeof window !== 'undefined' ? window.location.origin + '/auth-callback' : 'N/A (Node.js)');
console.log('');

console.log('🔗 OAuth Authorization URL:');
const authUrl = `https://staylegit.wixstudio.com/lvastudiot1/_api/oauth2/authorize?clientId=${WIX_CONFIG.clientId}&responseType=code&scope=offline_access&redirectUri=${encodeURIComponent('http://localhost:5173/auth-callback')}`;
console.log('  Full URL:', authUrl);
console.log('');

console.log('📝 Required OAuth App Configuration:');
console.log('  1. Go to your Wix Headless project dashboard');
console.log('  2. Navigate to Settings → Headless Settings');
console.log('  3. Find your OAuth app or create a new one');
console.log('  4. Set the Redirect URI to: http://localhost:5173/auth-callback');
console.log('  5. Make sure the Client ID matches:', WIX_CONFIG.clientId);
console.log('');

console.log('🔍 Common Issues:');
console.log('  ❌ 400 Bad Request: Redirect URI mismatch');
console.log('  ❌ 401 Unauthorized: Invalid Client ID');
console.log('  ❌ 403 Forbidden: OAuth app not configured properly');
console.log('');

console.log('🛠️ Troubleshooting Steps:');
console.log('  1. Verify Client ID is correct in src/config/wix.js');
console.log('  2. Check Redirect URI in Wix OAuth app settings');
console.log('  3. Ensure OAuth app is enabled and configured');
console.log('  4. Try accessing the auth URL directly to see the error');
console.log('');

// Test the auth URL
if (typeof window !== 'undefined') {
  console.log('🧪 Testing OAuth URL...');
  console.log('  Click this link to test:');
  console.log('  ' + authUrl);
  console.log('');
  
  // Create a test button
  const testButton = document.createElement('button');
  testButton.textContent = '🧪 Test OAuth URL';
  testButton.style.cssText = `
    background: #00bfff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px 0;
  `;
  testButton.onclick = () => {
    window.open(authUrl, '_blank');
  };
  
  if (document.body) {
    document.body.appendChild(testButton);
  }
}

console.log('✅ Configuration check complete!'); 