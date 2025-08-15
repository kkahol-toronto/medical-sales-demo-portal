# Azure Deployment Guide for Uro360 Portal

## Overview
This guide will help you deploy the Uro360 Portal to Azure Static Web Apps, which is the most cost-effective solution for a 2-week demo.

## Cost Estimate
- **Azure Static Web Apps (Free Tier)**: $0/month for first 2GB bandwidth
- **Estimated cost for 2 weeks**: $0-5 (depending on usage)
- **Total estimated cost**: $0-5 for the entire demo period

## Prerequisites
1. Azure account (free tier available)
2. GitHub account
3. Your code pushed to a GitHub repository

## Step-by-Step Deployment

### 1. Prepare Your Repository
```bash
# Make sure your code is committed and pushed to GitHub
git add .
git commit -m "Prepare for Azure deployment"
git push origin main
```

### 2. Create Azure Static Web App

1. **Go to Azure Portal**: https://portal.azure.com
2. **Search for "Static Web Apps"** and click "Create"
3. **Fill in the basics**:
   - **Subscription**: Choose your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `uro360-portal-demo`
   - **Region**: Choose closest to your client (e.g., East US, West Europe)
   - **Hosting Plan**: Free
   - **Source**: GitHub

4. **Connect to GitHub**:
   - Click "Sign in with GitHub"
   - Authorize Azure
   - Select your repository
   - Select branch: `main`

5. **Build Details**:
   - **Build Preset**: React
   - **App location**: `/` (leave as default)
   - **API location**: (leave empty)
   - **Output location**: `dist`

6. **Click "Review + Create"** then **"Create"**

### 3. Configure GitHub Secrets (Optional - for CI/CD)

If you want automatic deployments:

1. **Go to your GitHub repository**
2. **Settings → Secrets and variables → Actions**
3. **Add new repository secret**:
   - **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - **Value**: Get this from Azure Static Web Apps → Configuration → Deployment tokens

### 4. Get Your URL

After deployment (usually 2-5 minutes):
1. **Go to your Static Web App in Azure Portal**
2. **Copy the URL** (format: `https://your-app-name.azurestaticapps.net`)
3. **Share this URL with your client**

## Testing Your Deployment

1. **Visit your URL** in a browser
2. **Test the login flow**:
   - Email: `rep@hollister.com`
   - Password: `demo123`
3. **Verify all features work**:
   - Dashboard
   - HCP pages
   - Best Practices
   - Logout functionality

## Monitoring and Analytics

### Azure Portal Monitoring
- **Go to your Static Web App**
- **Check "Overview"** for:
  - Request count
  - Data transfer
  - Error rates

### Custom Domain (Optional)
If you want a custom domain:
1. **Go to Custom domains** in your Static Web App
2. **Add your domain**
3. **Configure DNS** as instructed

## Cost Optimization Tips

1. **Use Free Tier**: Static Web Apps free tier includes:
   - 2GB bandwidth/month
   - 100GB storage
   - Perfect for demos

2. **Monitor Usage**: Check usage in Azure Portal to stay within limits

3. **Clean Up**: Delete the resource group after demo to avoid charges

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check GitHub Actions logs
   - Verify `package.json` has correct build script
   - Ensure all dependencies are in `dependencies` not `devDependencies`

2. **404 Errors**:
   - Verify `staticwebapp.config.json` is in root
   - Check routing configuration

3. **Authentication Issues**:
   - Verify localStorage is working
   - Check browser console for errors

### Support:
- **Azure Documentation**: https://docs.microsoft.com/en-us/azure/static-web-apps/
- **GitHub Issues**: Check your repository's Actions tab

## Post-Demo Cleanup

After your 2-week demo:
1. **Delete Resource Group** in Azure Portal
2. **Remove GitHub repository** (if no longer needed)
3. **Cancel any subscriptions** if you upgraded from free tier

This will ensure no ongoing charges.
