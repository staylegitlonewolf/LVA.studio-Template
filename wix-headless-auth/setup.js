#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Wix Headless Authentication Setup\n');

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setup() {
  try {
    // Get Wix credentials
    const siteId = await askQuestion('Enter your Wix Site ID: ');
    const apiKey = await askQuestion('Enter your Wix API Key: ');
    const collectionId = await askQuestion('Enter your Users Collection ID: ');

    // Create .env file
    const envContent = `# Wix Configuration
VITE_WIX_SITE_ID=${siteId}
VITE_WIX_API_KEY=${apiKey}

# Optional: Custom domain (if you have one)
VITE_CUSTOM_DOMAIN=https://yourdomain.com
`;

    fs.writeFileSync('.env', envContent);

    // Update wix.js with collection ID
    const wixConfigPath = path.join(__dirname, 'src', 'config', 'wix.js');
    let wixConfig = fs.readFileSync(wixConfigPath, 'utf8');
    
    wixConfig = wixConfig.replace(
      /USERS: 'users'/,
      `USERS: '${collectionId}'`
    );
    
    fs.writeFileSync(wixConfigPath, wixConfig);

    console.log('\n✅ Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run dev');
    console.log('3. Open http://localhost:3000');
    
    console.log('\n📝 Important:');
    console.log('- Make sure your Wix app has Content Manager API permissions');
    console.log('- Verify your Users collection has the required fields');
    console.log('- Test the authentication flow');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup(); 