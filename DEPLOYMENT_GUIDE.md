# 🚀 LVA Studio Authentication Deployment Guide

## Quick Fix for 404 Error

The 404 error occurs because the backend isn't deployed yet. Here are your options:

## Option 1: Local Development (Quick Test)

1. **Start the local server**:
   ```bash
   cd wix-headless-auth
   npm run server
   ```

2. **Test the authentication**:
   - Open `http://localhost:3001` in your browser
   - The login popup should now work

## Option 2: Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd wix-headless-auth
vercel
```

### Step 3: Update Frontend URL
After deployment, update `js/auth-integration.js`:
```javascript
this.backendUrl = 'https://your-vercel-url.vercel.app';
```

## Option 3: Deploy to Netlify

### Step 1: Create netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server"
  status = 200

[functions]
  directory = "."
```

### Step 2: Deploy
```bash
cd wix-headless-auth
netlify deploy --prod
```

## Option 4: Deploy to Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Deploy
```bash
cd wix-headless-auth
railway login
railway init
railway up
```

## Current Status

- ✅ Frontend: `https://staylegitlonewolf.github.io/LVA.studio-Template/`
- ❌ Backend: Needs deployment
- ✅ Code: Ready for deployment

## Testing

1. **Local Test**: Open `test-auth.html` in your browser
2. **Backend Test**: Visit `http://localhost:3001/api/health`
3. **Full Test**: Click login button after backend is running

## Environment Variables

Set these in your hosting platform:
```env
WIX_SITE_ID=3cb2316f-a2b6-4ece-9af1-b457cb62671a
WIX_CLIENT_ID=a4452af2-5a36-41b8-80c3-446da4824e27
WIX_API_KEY=your_api_key_here
```

## Troubleshooting

- **404 Error**: Backend not deployed or wrong URL
- **CORS Error**: Check CORS configuration in server.js
- **Auth Error**: Verify Wix credentials in config 