#!/bin/bash

# Uro360 Portal Azure Deployment Script
echo "🚀 Starting Uro360 Portal deployment to Azure..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git remote add origin <your-github-repo-url>"
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  You're not on the main branch. Current branch: $CURRENT_BRANCH"
    echo "   Switching to main branch..."
    git checkout main
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Add all changes
echo "📝 Adding changes to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy to Azure Static Web Apps - $(date)"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment initiated successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to Azure Portal: https://portal.azure.com"
    echo "2. Create a new Static Web App"
    echo "3. Connect it to your GitHub repository"
    echo "4. Your app will be available at: https://your-app-name.azurestaticapps.net"
    echo ""
    echo "📖 For detailed instructions, see: azure-deploy.md"
    echo ""
    echo "⏱️  Deployment usually takes 2-5 minutes to complete."
else
    echo "❌ Failed to push to GitHub. Please check your git configuration."
    exit 1
fi
