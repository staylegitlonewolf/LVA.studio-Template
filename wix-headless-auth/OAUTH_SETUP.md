# OAuth Setup Guide

## 🔧 **Required Setup: Get Your OAuth Client ID**

The authentication system requires a valid OAuth client ID from your Wix Headless project. Follow these steps:

### Step 1: Access Your Wix Headless Project Dashboard

1. Go to [Wix Dashboard](https://www.wix.com/my-account/site-selector/)
2. Select your Headless project (the one with site ID: `3cb2316f-a2b6-4ece-9af1-b457cb62671a`)

### Step 2: Create an OAuth App

1. In your project dashboard, click **Settings** in the left sidebar
2. Scroll down to the **Advanced** section
3. Click **Headless Settings**
4. Click **Create OAuth App**
5. Enter a name for your app (e.g., "LVA Studio Auth App")
6. Add an optional description
7. Click **Create OAuth App**

### Step 3: Get Your Client ID

1. After creating the OAuth app, you'll see the **Client info** section
2. Copy the **Client ID** (it looks like: `6ce0a9b3-385f-4274-a5f6-ccd8269feeaa`)

### Step 4: Configure Redirect URLs

1. In the **URLs** section of your OAuth app settings:
2. **Allow Redirect Domains**: Add `localhost:5174` (for development)
3. **Allow Authorization Redirect URIs**: Add `http://localhost:5174/auth-callback`

### Step 5: Update Your Configuration

1. Open `src/config/wix.js`
2. Replace `'YOUR_OAUTH_CLIENT_ID_HERE'` with your actual Client ID
3. Save the file

### Step 6: Test the Authentication

1. Restart your development server: `npm run dev`
2. Try the "Sign in with Wix" button
3. You should now be redirected to Wix's login page

## 🚨 **Important Notes**

- The OAuth client ID is different from your site ID
- Make sure your redirect URLs are exactly correct
- For production, you'll need to add your actual domain to the allowed redirect domains
- The OAuth app must be created in the same Wix project that your site ID belongs to

## 🔍 **Troubleshooting**

If you still get errors:
1. Double-check that the Client ID is correct
2. Verify that `localhost:5174` is in your allowed redirect domains
3. Make sure `http://localhost:5174/auth-callback` is in your allowed authorization redirect URIs
4. Check that you're using the OAuth app from the correct Wix project 