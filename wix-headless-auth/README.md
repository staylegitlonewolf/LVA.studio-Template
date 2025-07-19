# Wix Headless Authentication System

A complete authentication system built with React and Wix Headless, featuring user registration, login, and profile management using Wix CMS.

## Features

- ✅ **User Registration** - Create new accounts with email validation
- ✅ **User Login** - Secure authentication with password hashing
- ✅ **Profile Management** - Edit user profile information
- ✅ **Session Management** - Persistent login sessions
- ✅ **Responsive Design** - Modern, mobile-friendly UI
- ✅ **Wix CMS Integration** - Store user data in Wix Content Manager

## Prerequisites

- Node.js (v16 or higher)
- A Wix account with a site
- Wix API access

## Setup Instructions

### 1. Create Wix Site and CMS Collection

1. **Create a new Wix site** or use an existing one
2. **Go to Content Manager** in your Wix dashboard
3. **Create a new collection** called "Users" with these fields:
   - `email` (Text, Required, Unique)
   - `password` (Text, Required)
   - `firstName` (Text, Required)
   - `lastName` (Text, Required)
   - `createdAt` (Date & Time, Required)
   - `isActive` (Boolean, Default: true)

### 2. Get Wix API Credentials

1. **Go to Wix Developers** → **My Apps**
2. **Create a new app** or use existing one
3. **Get your Site ID and API Key**
4. **Enable the Content Manager API** in your app permissions

### 3. Install Dependencies

```bash
cd wix-headless-auth
npm install
```

### 4. Configure Environment Variables

1. **Copy the environment file:**
   ```bash
   cp env.example .env
   ```

2. **Edit `.env` with your Wix credentials:**
   ```env
   VITE_WIX_SITE_ID=your_actual_site_id
   VITE_WIX_API_KEY=your_actual_api_key
   ```

### 5. Update Collection ID

1. **Get your Users collection ID** from Wix Content Manager
2. **Update `src/config/wix.js`:**
   ```javascript
   export const COLLECTIONS = {
     USERS: 'your_actual_collection_id_here',
   };
   ```

### 6. Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

## Project Structure

```
wix-headless-auth/
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx      # Login form component
│   │   ├── SignupForm.jsx     # Registration form component
│   │   └── Dashboard.jsx      # User dashboard component
│   ├── services/
│   │   └── authService.js     # Authentication logic
│   ├── config/
│   │   └── wix.js            # Wix SDK configuration
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── package.json
├── vite.config.js
├── wix.config.json
└── README.md
```

## API Integration

The authentication system uses Wix's Content Manager API to:

- **Create users** in the CMS collection
- **Query users** by email for login
- **Update user profiles** 
- **Manage user sessions** with JWT tokens

## Security Features

- **Password hashing** using SHA-256 (upgrade to bcrypt for production)
- **JWT token authentication** for session management
- **Input validation** and error handling
- **Secure API key management** via environment variables

## Customization

### Styling
- Modify `src/index.css` for custom styling
- Update color schemes and layouts as needed

### Functionality
- Add additional user fields in the CMS collection
- Extend the authentication service with more features
- Implement password reset functionality
- Add email verification

### Deployment
- Build for production: `npm run build`
- Deploy to your preferred hosting platform
- Update environment variables for production

## Troubleshooting

### Common Issues

1. **"Collection not found" error**
   - Verify your collection ID in `src/config/wix.js`
   - Ensure the collection exists in your Wix site

2. **"API key invalid" error**
   - Check your API key in the `.env` file
   - Verify API permissions in Wix Developers

3. **"Site ID not found" error**
   - Confirm your site ID in the `.env` file
   - Ensure the site exists and is accessible

### Getting Help

- Check Wix API documentation
- Verify your Wix app permissions
- Test API calls using Wix's API playground

## Production Considerations

- **Use bcrypt** for password hashing instead of SHA-256
- **Implement proper JWT** with a secret key
- **Add rate limiting** for API calls
- **Set up HTTPS** for secure communication
- **Add input sanitization** and validation
- **Implement proper error logging**

## License

MIT License - feel free to use this project for your own applications! 