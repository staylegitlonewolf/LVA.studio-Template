# 🔐 Google OAuth Setup Guide for Wix Headless

This guide will help you set up Google OAuth integration with your Wix Headless authentication system.

## 📋 Prerequisites

- Google Cloud Console account
- Wix Headless project (already set up)
- Your Wix site ID and API key

## 🚀 Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Name: `LVA Studio Authentication`
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

## 🔑 Step 2: Create OAuth 2.0 Credentials

1. **Go to Credentials**
   - Navigate to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"

2. **Configure OAuth Consent Screen**
   - Choose "External" user type
   - Fill in required information:
     - App name: `LVA Studio Authentication`
     - User support email: Your email
     - Developer contact information: Your email
   - Click "Save and Continue"

3. **Add Scopes**
   - Click "Add or Remove Scopes"
   - Select:
     - `email`
     - `profile`
     - `openid`
   - Click "Update"

4. **Add Test Users** (Optional)
   - Add your email and any test users
   - Click "Save and Continue"

5. **Create OAuth Client ID**
   - Application type: "Web application"
   - Name: `LVA Studio Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost:3001`
     - `http://localhost:3002`
     - `http://localhost:3003`
     - `http://localhost:3004`
     - `https://staylegitlonewolf.github.io`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
     - `http://localhost:3001/auth/google/callback`
     - `http://localhost:3002/auth/google/callback`
     - `http://localhost:3003/auth/google/callback`
     - `http://localhost:3004/auth/google/callback`
     - `https://staylegitlonewolf.github.io/auth/google/callback`
   - Click "Create"

6. **Copy Client ID**
   - Save the generated Client ID (you'll need this)

## ⚙️ Step 3: Update Your Code

1. **Update Google Auth Service**
   ```javascript
   // In src/services/googleAuthService.js
   this.googleClientId = 'YOUR_ACTUAL_GOOGLE_CLIENT_ID';
   ```

2. **Replace the placeholder with your actual Google Client ID**

## 🔧 Step 4: Test Google OAuth

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Open your authentication page**
   - Go to `http://localhost:3004` (or whatever port Vite assigns)
   - You should see a "Sign in with Google" button

3. **Test the flow**
   - Click the Google sign-in button
   - Complete the Google OAuth flow
   - Check your Wix CMS "Users" collection for the new user

## 🌐 Step 5: Deploy to Production

1. **Update Google Cloud Console**
   - Add your production domain to authorized origins
   - Add your production callback URL

2. **Deploy your application**
   ```bash
   npm run build
   git add .
   git commit -m "Add Google OAuth integration"
   git push origin main
   ```

## 📱 Step 6: Update Wix CMS Collection

Make sure your "Users" collection has these fields for Google OAuth:

- `email` (Text)
- `firstName` (Text)
- `lastName` (Text)
- `googleId` (Text) - New field for Google user ID
- `profilePicture` (URL) - New field for Google profile picture
- `isGoogleUser` (Boolean) - New field to identify Google users
- `createdAt` (Date)
- `updatedAt` (Date)
- `isActive` (Boolean)

## 🔒 Security Considerations

1. **Never expose your Google Client Secret** (only Client ID is needed for frontend)
2. **Use HTTPS in production**
3. **Validate Google tokens server-side** (in production)
4. **Implement proper error handling**
5. **Add rate limiting** (in production)

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid origin" error**
   - Make sure your domain is in authorized origins
   - Check for typos in the URL

2. **"Redirect URI mismatch"**
   - Verify callback URLs in Google Cloud Console
   - Ensure exact match with your app's callback URL

3. **Google button not appearing**
   - Check browser console for errors
   - Verify Google Client ID is correct
   - Ensure Google OAuth script loaded

4. **User not created in Wix CMS**
   - Check Wix API permissions
   - Verify collection ID is correct
   - Check browser network tab for API errors

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all configuration steps
3. Test with a different Google account
4. Check Wix API documentation for updates

## 🎉 Success!

Once configured, users can:
- Sign in with their Google account
- Automatically create accounts in your Wix CMS
- Access your LVA.studio platform seamlessly
- Have their profile picture and basic info imported

Your Wix Headless authentication system now supports both email/password and Google OAuth! 🚀 