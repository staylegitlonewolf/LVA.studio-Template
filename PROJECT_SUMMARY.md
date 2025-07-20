# 🚀 LVA.studio™ Portal - Project Documentation

## 🎯 Project Overview

A modern web portal with integrated Wix Headless authentication system, featuring Google/Facebook OAuth login, user profile management, and comprehensive service platform for health insurance, solar, contracting, and design services.

### 🏗️ Architecture
- **Frontend**: Vanilla JavaScript, HTML5, CSS3 with modern UI/UX
- **Backend**: Node.js/Express server with Wix Headless authentication
- **Authentication**: Wix OAuth 2.0 with Google/Facebook providers
- **Database**: Wix CMS collections for user data storage
- **Deployment**: GitHub Pages (frontend) + Vercel/Heroku (backend)

## 🔧 Key Components

### Frontend Structure
```
LVA Template/
├── index.html              # Main portal interface
├── css/                    # Styling (epic, light themes, cards, etc.)
├── js/                     # Core functionality modules
│   ├── auth-integration.js # Wix OAuth frontend integration
│   ├── main.js            # Application initialization
│   ├── portal.js          # Portal navigation & loading
│   ├── cards.js           # Service card system
│   └── [other modules]    # Health, solar, contracting services
└── media/                 # Background videos, images
```

### Backend Structure
```
wix-headless-auth/
├── server.js              # Express server with OAuth endpoints
├── src/services/
│   ├── authService.js     # Wix API integration
│   └── profileService.js  # User profile management
├── package.json           # Dependencies & scripts
└── vercel.json           # Deployment configuration
```

## 🔐 Authentication Flow

1. **User clicks login** → Frontend calls backend for OAuth URL
2. **OAuth popup opens** → Wix handles Google/Facebook authentication
3. **Callback processing** → Backend exchanges code for tokens
4. **User creation** → Backend creates/updates user in Wix CMS
5. **Session management** → Frontend stores tokens, updates UI

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 16+
- Wix Developer Account
- Google/Facebook OAuth apps configured

### Environment Setup
```bash
# Clone repository
git clone https://github.com/staylegitlonewolf/LVA.studio-Template.git
cd LVA.studio-Template

# Backend setup
cd wix-headless-auth
npm install
cp env.example .env
# Configure .env with Wix API credentials

# Frontend setup (from root)
npm install
```

### Configuration
1. **Wix OAuth App**: Set redirect URI to `http://localhost:3001/auth-callback`
2. **Environment Variables**: Configure Wix API keys in `wix-headless-auth/.env`
3. **CMS Collection**: Backend auto-creates "Main" collection if missing

### Running Locally
```bash
# Terminal 1: Backend (OAuth server)
cd wix-headless-auth
npm run server

# Terminal 2: Frontend (local server)
node serve-local.js

# Access: http://localhost:8080
```

## ✨ Key Features

### Authentication System
- ✅ Wix OAuth 2.0 integration
- ✅ Google/Facebook login providers
- ✅ User profile management
- ✅ Session persistence
- ✅ Secure token handling

### Portal Interface
- ✅ Modern responsive design
- ✅ Epic/light theme switching
- ✅ Service card navigation
- ✅ Loading animations
- ✅ Mobile-friendly layout

### Service Modules
- ✅ Health Insurance portal
- ✅ Solar services
- ✅ Contracting services
- ✅ 3D model viewer
- ✅ Wix integration
- ✅ Partner services

## 🐛 Common Issues & Solutions

### OAuth Errors
- **400 Bad Request**: Check redirect URI matches Wix OAuth app settings
- **CORS errors**: Ensure backend CORS allows frontend origin
- **Ad blocker interference**: Disable ad blockers for OAuth testing

### Backend Issues
- **Port 3001 in use**: Kill existing process or change port
- **Wix API errors**: Verify API credentials and collection permissions
- **Module import errors**: Ensure all dependencies installed

### Frontend Issues
- **Import statements**: Use regular script tags, not ES6 modules
- **404 errors**: Check file paths and server configuration
- **Authentication popup**: Ensure both servers running

### Debug Tools
- `debug-oauth.html`: OAuth URL testing
- `test-oauth.html`: Backend connectivity testing
- `simple-auth.html`: Demo authentication fallback
- Browser console logging for detailed error tracking

## 🚀 Deployment

### Backend Deployment
```bash
# Vercel (recommended)
cd wix-headless-auth
vercel --prod

# Update frontend backend URL to production URL
```

### Frontend Deployment
- Push to GitHub main branch
- GitHub Pages auto-deploys from `https://staylegitlonewolf.github.io/LVA.studio-Template/`

## 📋 Development Workflow

1. **Local development**: Use local servers for testing
2. **OAuth testing**: Test with Wix OAuth app in development mode
3. **Production deployment**: Deploy backend first, then update frontend URLs
4. **Error handling**: Comprehensive error messages and fallback systems

### Project Goals
- 🎯 Seamless user authentication experience
- 🏗️ Scalable service portal architecture
- 🎨 Modern, responsive design
- 🔒 Secure OAuth implementation
- 🚀 Easy deployment and maintenance

### Support Resources
- Check `DEPLOYMENT.md` for detailed setup instructions
- Review `OAUTH_SETUP.md` for Wix configuration
- Use debug pages for troubleshooting
- Monitor browser console for detailed error messages

---

**🎉 This project demonstrates a complete OAuth integration with Wix Headless, providing a solid foundation for building authenticated web applications with modern authentication flows.** 