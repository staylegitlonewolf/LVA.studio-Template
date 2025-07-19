# LVA.studio™ Authentication Deployment Guide

Deploy the Wix Headless Authentication system to your existing GitHub Pages domain: `https://staylegitlonewolf.github.io/LVA.studio-Template/`

## 🚀 Deployment Options

### Option 1: Replace Current Template (Recommended)
Replace your current LVA.studio™ template with the authentication system.

### Option 2: Add as Subdirectory
Add the authentication system as a subdirectory (e.g., `/auth`) to your existing template.

## 📋 Pre-Deployment Checklist

- [ ] Wix site created with Users collection
- [ ] Wix API credentials obtained
- [ ] Collection ID from Wix Content Manager
- [ ] GitHub repository access

## 🔧 Setup Steps

### 1. Configure Wix Integration

1. **Create Users Collection in Wix:**
   - Go to your Wix dashboard → Content Manager
   - Create collection named "Users"
   - Add fields: `email`, `password`, `firstName`, `lastName`, `createdAt`, `isActive`

2. **Get API Credentials:**
   - Go to [Wix Developers](https://dev.wix.com/)
   - Create app or use existing
   - Enable Content Manager API permissions
   - Copy Site ID and API Key

### 2. Configure the Project

```bash
# Navigate to the auth project
cd wix-headless-auth

# Run setup wizard
npm run setup

# Install dependencies
npm install
```

### 3. Build for Production

```bash
# Build the project
npm run build

# The build output will be in the `dist` folder
```

## 🌐 GitHub Pages Deployment

### Option 1: Replace Current Template

1. **Backup your current template:**
   ```bash
   # In your LVA.studio-Template repository
   git checkout -b backup-current-template
   git push origin backup-current-template
   ```

2. **Replace with auth system:**
   ```bash
   # Copy built files to your repository
   cp -r wix-headless-auth/dist/* .
   
   # Update .gitignore if needed
   echo "node_modules/" >> .gitignore
   echo ".env" >> .gitignore
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Replace with LVA.studio™ Authentication System"
   git push origin main
   ```

### Option 2: Add as Subdirectory

1. **Create auth subdirectory:**
   ```bash
   # In your LVA.studio-Template repository
   mkdir auth
   cp -r wix-headless-auth/dist/* auth/
   ```

2. **Update navigation in your main template:**
   ```html
   <!-- Add to your existing navigation -->
   <a href="/auth/">Login / Signup</a>
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add LVA.studio™ Authentication System"
   git push origin main
   ```

## 🔗 Integration with Existing Template

### Add Authentication Link to Your Current Template

Update your existing `index.html` to include a link to the auth system:

```html
<!-- Add this to your navigation -->
<div class="auth-menu">
  <a href="/auth/" class="auth-btn">Login / Signup</a>
</div>
```

### Styling Integration

The authentication system uses the same LVA.studio™ branding:
- Same color scheme (#00bfff, #24faff)
- Same font family (Orbitron)
- Consistent design language

## 🌍 Domain Configuration

### Custom Domain (if you have one)

If you have a custom domain, update the environment variables:

```env
VITE_CUSTOM_DOMAIN=https://yourdomain.com
```

### GitHub Pages Domain

The system will work with your current domain:
`https://staylegitlonewolf.github.io/LVA.studio-Template/`

## 🔒 Security Considerations

### Environment Variables

For production, consider using:
- **GitHub Secrets** for API keys
- **Build-time environment variables**
- **Server-side environment management**

### HTTPS

GitHub Pages provides HTTPS by default, ensuring secure communication.

## 📱 Mobile Responsiveness

The authentication system is fully responsive and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ All modern browsers

## 🎨 Branding Consistency

The authentication system matches your LVA.studio™ brand:
- **Logo**: LVA.studio™
- **Tagline**: Living Victorious Always
- **Colors**: Signature blue gradient
- **Typography**: Orbitron font family
- **Design**: Modern, professional aesthetic

## 🔄 Updates and Maintenance

### Updating the System

1. **Make changes in the auth project**
2. **Rebuild:**
   ```bash
   npm run build
   ```
3. **Deploy updated files to GitHub Pages**

### Monitoring

- Check GitHub Pages deployment status
- Monitor Wix API usage
- Review user registration/login activity

## 🆘 Troubleshooting

### Common Issues

1. **"Collection not found"**
   - Verify collection ID in `src/config/wix.js`
   - Check Wix Content Manager

2. **"API key invalid"**
   - Verify API key in `.env` file
   - Check Wix app permissions

3. **"Site not loading"**
   - Check GitHub Pages deployment
   - Verify file paths and structure

### Getting Help

- Check Wix API documentation
- Verify GitHub Pages settings
- Test locally before deploying

## 🎯 Next Steps

After deployment:

1. **Test the authentication flow**
2. **Customize branding further if needed**
3. **Add additional features** (password reset, email verification)
4. **Integrate with your existing services**
5. **Set up analytics and monitoring**

---

**Your LVA.studio™ Authentication System is now ready for production!** 🚀 