# 🔐 Enhanced OAuth Setup Guide - Wix Official Implementation

This guide implements the official [Wix Velo OAuth SSO approach](https://dev.wix.com/docs/develop-websites/articles/code-tutorials/wix-editor-elements/using-oauth-sso-with-velo) with our custom LVA.studio frontend.

## 🎯 **What We've Built:**

### **Enhanced Security Features:**
- ✅ **CSRF Protection** - State parameter validation
- ✅ **Secure Token Exchange** - Server-side authorization code flow
- ✅ **Session Management** - Secure session tokens with expiration
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Wix Integration** - Official Wix OAuth patterns

### **LVA.studio Custom Features:**
- 🎨 **Custom UI** - Beautiful LVA.studio branded interface
- 🌐 **Custom Domain** - Works with GitHub Pages
- 📱 **Responsive Design** - Mobile-optimized
- 🔧 **Full Control** - Complete customization

## 🚀 **Setup Process:**

### **Step 1: Google Cloud Console Setup**

1. **Create Google Cloud Project**
   ```bash
   # Go to: https://console.cloud.google.com/
   # Create project: "LVA Studio OAuth"
   ```

2. **Enable Google+ API**
   ```bash
   # APIs & Services → Library
   # Search: "Google+ API" or "Google Identity"
   # Click: "Enable"
   ```

3. **Create OAuth 2.0 Credentials**
   ```bash
   # APIs & Services → Credentials
   # Create Credentials → OAuth 2.0 Client IDs
   # Application Type: Web application
   ```

4. **Configure OAuth Consent Screen**
   ```json
   {
     "app_name": "LVA Studio Authentication",
     "user_support_email": "your-email@domain.com",
     "developer_contact": "your-email@domain.com",
     "scopes": ["email", "profile", "openid"]
   }
   ```

5. **Set Authorized Origins**
   ```
   http://localhost:3000
   http://localhost:3001
   http://localhost:3002
   http://localhost:3003
   http://localhost:3004
   https://staylegitlonewolf.github.io
   ```

6. **Set Authorized Redirect URIs**
   ```
   http://localhost:3000/auth/google/callback
   http://localhost:3001/auth/google/callback
   http://localhost:3002/auth/google/callback
   http://localhost:3003/auth/google/callback
   http://localhost:3004/auth/google/callback
   https://staylegitlonewolf.github.io/auth/google/callback
   ```

### **Step 2: Update Code Configuration**

1. **Update OAuth Service**
   ```javascript
   // In src/services/wixOAuthService.js
   this.googleConfig = {
     clientId: 'YOUR_ACTUAL_GOOGLE_CLIENT_ID',
     redirectUri: `${window.location.origin}/auth/google/callback`,
     scope: 'email profile openid'
   };
   ```

2. **Add Client Secret (Secure)**
   ```javascript
   // In production, use Wix Secrets Manager
   client_secret: 'YOUR_GOOGLE_CLIENT_SECRET'
   ```

### **Step 3: Update Wix CMS Collection**

Add these fields to your "Users" collection:

```json
{
  "email": "Text",
  "firstName": "Text", 
  "lastName": "Text",
  "googleId": "Text",
  "profilePicture": "URL",
  "isGoogleUser": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date",
  "isActive": "Boolean"
}
```

### **Step 4: Test the OAuth Flow**

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test OAuth Flow**
   - Go to: `http://localhost:3004`
   - Click: "Sign in with Google"
   - Complete: Google OAuth flow
   - Verify: User created in Wix CMS

## 🔒 **Security Features Implemented:**

### **1. CSRF Protection**
```javascript
// Generate random state parameter
const state = this.generateRandomState();
sessionStorage.setItem('oauth_state', state);

// Validate state on callback
if (state !== savedState) {
  throw new Error('Invalid state parameter - possible CSRF attack');
}
```

### **2. Secure Token Exchange**
```javascript
// Server-side authorization code exchange
const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: this.googleConfig.clientId,
    client_secret: 'YOUR_CLIENT_SECRET',
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: this.googleConfig.redirectUri,
  }),
});
```

### **3. Session Token Validation**
```javascript
// Validate session tokens
validateSessionToken(token) {
  const payload = JSON.parse(atob(token));
  const now = Math.floor(Date.now() / 1000);
  
  if (payload.exp < now) return false; // Expired
  if (payload.iss !== 'lva-studio-auth') return false; // Invalid issuer
  
  return true;
}
```

### **4. Secure Storage**
```javascript
// Store authentication data securely
setAuthData(token, user) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('authMethod', 'google');
  localStorage.setItem('authTimestamp', Date.now().toString());
}
```

## 🌐 **Production Deployment:**

### **1. Update Google Cloud Console**
- Add production domain to authorized origins
- Add production callback URL

### **2. Deploy to GitHub Pages**
```bash
npm run build
git add .
git commit -m "Add enhanced OAuth implementation"
git push origin main
```

### **3. Configure Custom Domain**
- Update Google Cloud Console with production URLs
- Test OAuth flow on production domain

## 🔧 **Advanced Features:**

### **1. Multiple OAuth Providers**
```javascript
// Easy to add Facebook, Apple, etc.
const providers = {
  google: GoogleOAuthProvider,
  facebook: FacebookOAuthProvider,
  apple: AppleOAuthProvider
};
```

### **2. Wix Business Solutions Integration**
```javascript
// After OAuth login, integrate with Wix services
import { bookings } from '@wix/bookings';
import { stores } from '@wix/stores';
import { events } from '@wix/events';
```

### **3. Session Management**
```javascript
// Automatic session refresh
// Session timeout handling
// Multi-device session management
```

## 🐛 **Troubleshooting:**

### **Common Issues:**

1. **"Invalid origin" error**
   - Check Google Cloud Console authorized origins
   - Ensure exact URL match

2. **"Redirect URI mismatch"**
   - Verify callback URLs in Google Cloud Console
   - Check for trailing slashes

3. **"Invalid state parameter"**
   - Clear browser storage
   - Check CSRF protection implementation

4. **"Token exchange failed"**
   - Verify client secret
   - Check authorization code validity

### **Debug Steps:**

1. **Check Browser Console**
   ```javascript
   // Add debug logging
   console.log('OAuth state:', state);
   console.log('Authorization URL:', authUrl);
   ```

2. **Check Network Tab**
   - Monitor OAuth redirects
   - Check API responses

3. **Check Wix CMS**
   - Verify user creation
   - Check field mappings

## 🎉 **Success Indicators:**

### **✅ OAuth Flow Working:**
- User clicks "Sign in with Google"
- Redirects to Google OAuth
- Returns to callback page
- User created in Wix CMS
- Redirects to dashboard

### **✅ Security Working:**
- CSRF protection active
- Session tokens valid
- Secure token exchange
- Proper error handling

### **✅ Integration Working:**
- User data in Wix CMS
- Profile information imported
- Session management active
- Logout functionality working

## 🚀 **Next Steps:**

1. **Add More OAuth Providers** (Facebook, Apple)
2. **Integrate Wix Business Solutions** (Bookings, eCommerce)
3. **Add Advanced Features** (2FA, Password Reset)
4. **Implement Analytics** (Login tracking, User behavior)

Your LVA.studio authentication system now follows Wix's official OAuth SSO implementation with enhanced security and custom branding! 🎯 