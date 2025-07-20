#!/bin/bash

# LVA Studio Wix Headless Auth Deployment Script
echo "🚀 Deploying LVA Studio Wix Headless Auth Backend..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the wix-headless-auth directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🔨 Building React app..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Display deployment information
echo ""
echo "🎯 Deployment Information:"
echo "   Frontend URL: https://staylegitlonewolf.github.io/LVA.studio-Template/"
echo "   Backend URL: https://staylegit.wixstudio.com/lvastudiot1"
echo "   API Endpoints:"
echo "     - Health Check: /api/health"
echo "     - Login: /api/auth/login"
echo "     - Register: /api/auth/register"
echo "     - Verify Token: /api/auth/verify"
echo "     - Logout: /api/auth/logout"
echo "     - Profile: /api/auth/profile/:userId"
echo ""

echo "🚀 To start the server:"
echo "   npm run server"
echo ""
echo "🔄 For development with auto-restart:"
echo "   npm run dev:server"
echo ""
echo "📋 To test the API endpoints:"
echo "   curl https://staylegit.wixstudio.com/lvastudiot1/api/health"
echo ""

echo "✅ Deployment script completed!" 