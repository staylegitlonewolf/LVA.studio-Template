#!/bin/bash

# Build the project
echo "Building Wix Headless Authentication System..."
npm run build

# Create gh-pages branch if it doesn't exist
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Remove old files
rm -rf *

# Copy built files
cp -r dist/* .

# Add all files
git add .

# Commit changes
git commit -m "Deploy Wix Headless Authentication System"

# Push to gh-pages branch
git push origin gh-pages

# Switch back to main branch
git checkout main

echo "Deployment complete! Your authentication system is now live on GitHub Pages."
echo "URL: https://staylegitlonewolf.github.io/LVA.studio-Template/" 