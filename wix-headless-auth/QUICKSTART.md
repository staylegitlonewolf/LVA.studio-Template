# Quick Start Guide

Get your Wix Headless Authentication system running in 5 minutes!

## 🚀 Quick Setup

### 1. Prerequisites
- Node.js installed
- Wix account with a site
- Wix API access

### 2. Install & Setup
```bash
# Navigate to the project
cd wix-headless-auth

# Run the setup wizard
npm run setup

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Wix Configuration (if you haven't already)

#### Create Users Collection in Wix:
1. Go to your Wix dashboard
2. Navigate to **Content Manager**
3. Click **+ Add Collection**
4. Name it "Users"
5. Add these fields:
   - `email` (Text, Required, Unique)
   - `password` (Text, Required)
   - `firstName` (Text, Required)
   - `lastName` (Text, Required)
   - `createdAt` (Date & Time, Required)
   - `isActive` (Boolean, Default: true)

#### Get API Credentials:
1. Go to [Wix Developers](https://dev.wix.com/)
2. Create a new app or use existing
3. Get your **Site ID** and **API Key**
4. Enable **Content Manager API** permissions

### 4. Test the System
1. Open `http://localhost:3000`
2. Try creating a new account
3. Test login/logout functionality
4. Update your profile

## 🎯 What You Get

- ✅ **Complete authentication system**
- ✅ **User registration & login**
- ✅ **Profile management**
- ✅ **Session persistence**
- ✅ **Responsive design**
- ✅ **Wix CMS integration**

## 🔧 Customization

- **Styling**: Edit `src/index.css`
- **Fields**: Add more fields to your Users collection
- **Validation**: Modify validation in components
- **Security**: Upgrade password hashing for production

## 🚨 Production Checklist

- [ ] Use bcrypt for password hashing
- [ ] Implement proper JWT with secret key
- [ ] Add HTTPS
- [ ] Set up proper error logging
- [ ] Add rate limiting
- [ ] Test thoroughly

## 📞 Need Help?

- Check the main README.md for detailed instructions
- Verify your Wix API permissions
- Test API calls in Wix's API playground
- Ensure your collection has the correct fields

---

**That's it!** Your Wix Headless authentication system is ready to use! 🎉 