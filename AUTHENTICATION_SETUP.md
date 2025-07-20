# LVA Studio Authentication System Setup

This document explains how to set up and use the authentication system for LVA Studio.

## 🏗️ Architecture Overview

The authentication system consists of two main components:

1. **Frontend**: Static HTML/CSS/JS site at `https://staylegitlonewolf.github.io/LVA.studio-Template/`
2. **Backend**: Wix Headless Auth system in the `wix-headless-auth` directory

## 🔧 Backend Setup (Wix Headless Auth)

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Wix Headless project with OAuth app configured

### Installation

1. Navigate to the backend directory:
   ```bash
   cd wix-headless-auth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your Wix credentials in `src/config/wix.js`:
   - Update `siteId` with your Wix site ID
   - Update `clientId` with your OAuth app client ID
   - Update `apiKey` with your Wix API key

4. Build the React app:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm run server
   ```

### Development

For development with auto-restart:
```bash
npm run dev:server
```

### API Endpoints

The backend provides the following API endpoints:

- `GET /api/health` - Health check
- `GET /api/auth/verify` - Verify authentication token
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile/:userId` - Get user profile
- `PUT /api/auth/profile/:userId` - Update user profile

## 🎨 Frontend Integration

### Authentication Button

The login button has been added to the top menu of your main site. It includes:

- Login/Logout functionality
- User dropdown menu
- Profile access
- Automatic token verification

### Features

1. **Automatic Authentication Check**: On page load, the system checks if the user is already authenticated
2. **Popup Authentication**: Login opens in a popup window for better UX
3. **Token Management**: Automatic token storage and verification
4. **User Profile**: Access to user profile and settings
5. **Logout**: Secure logout with token cleanup

### User Flow

1. **Unauthenticated User**:
   - Sees "Login" button in top menu
   - Clicking opens authentication popup
   - Can register new account or login with existing credentials

2. **Authenticated User**:
   - Sees their name in the top menu
   - Clicking shows dropdown with Profile and Logout options
   - Profile opens in new tab
   - Logout clears all authentication data

## 🔐 Wix Integration

### CMS Collection Setup

The system automatically creates a "Main" collection in your Wix CMS with the following fields:

- `title` (Text) - Entry title
- `description` (Text) - Entry description
- `owner` (Reference) - Reference to the member who owns this entry
- `createdDate` (Date) - When the entry was created
- `updatedDate` (Date) - When the entry was last updated

### Member Management

- New users are automatically created as Wix members
- Member profiles are linked to CMS entries
- Profile updates sync between frontend and Wix

## 🚀 Deployment

### Backend Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to your hosting platform (Vercel, Netlify, etc.)

3. Update the frontend configuration with your backend URL

### Frontend Deployment

The frontend is already deployed at:
`https://staylegitlonewolf.github.io/LVA.studio-Template/`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
WIX_SITE_ID=your_site_id
WIX_CLIENT_ID=your_client_id
WIX_API_KEY=your_api_key
```

### CORS Configuration

The backend is configured to accept requests from:
- `https://staylegitlonewolf.github.io`
- `http://localhost:3000` (for development)

## 🧪 Testing

### Test the Authentication System

1. **Health Check**:
   ```bash
   curl https://your-backend-url/api/health
   ```

2. **Test Login**:
   ```bash
   curl -X POST https://your-backend-url/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Test Registration**:
   ```bash
   curl -X POST https://your-backend-url/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"newuser@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
   ```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend URL is in the CORS configuration
2. **Token Verification Fails**: Check that your Wix API key is valid
3. **Collection Creation Fails**: Verify your Wix site permissions
4. **Authentication Popup Blocked**: Ensure popups are allowed for your domain

### Debug Mode

Enable debug logging by setting the log level in the browser console:
```javascript
localStorage.setItem('debug', 'auth:*');
```

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify your Wix configuration
3. Test the API endpoints directly
4. Check the network tab for failed requests

## 🔄 Updates

To update the authentication system:

1. Pull the latest changes
2. Run `npm install` to update dependencies
3. Rebuild the project: `npm run build`
4. Restart the server: `npm run server`

## 📋 Checklist

- [ ] Backend dependencies installed
- [ ] Wix configuration updated
- [ ] React app built successfully
- [ ] Server running on correct port
- [ ] Frontend authentication button working
- [ ] Login/Register functionality tested
- [ ] User profile access working
- [ ] Logout functionality tested
- [ ] CMS collection created automatically
- [ ] CORS configuration correct 