# Azure Deployment Guide - Cheapest Option

## Overview
This guide will help you deploy your Uro360 portal to Azure Static Web Apps, which is the most cost-effective hosting solution for React applications on Azure.

## Why Azure Static Web Apps?
- **Free Tier**: 2GB storage, 100GB bandwidth per month
- **Pay-as-you-go**: $0.40 per GB after free tier
- **Global CDN**: Fast loading worldwide
- **Built-in CI/CD**: Automatic deployments from GitHub
- **Custom domains**: Free SSL certificates
- **Authentication**: Built-in auth providers

## Step-by-Step Deployment

### 1. Prerequisites
- Azure account (free tier available)
- GitHub repository with your code
- Node.js 18+ installed locally

### 2. Create Azure Static Web App

#### Option A: Azure Portal (Recommended)
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web App"
4. Click "Create"
5. Fill in the details:
   - **Subscription**: Choose your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `uro360-portal` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Build Details**:
     - Build Preset: `React`
     - App location: `/`
     - Output location: `dist`
     - API location: (leave empty)
6. Click "Review + Create" then "Create"

#### Option B: Azure CLI
```bash
# Install Azure CLI if not installed
# macOS: brew install azure-cli
# Windows: Download from Microsoft

# Login to Azure
az login

# Create resource group
az group create --name uro360-rg --location eastus

# Create Static Web App
az staticwebapp create \
  --name uro360-portal \
  --resource-group uro360-rg \
  --source https://github.com/kkahol-toronto/medical-sales-demo-portal \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

### 3. Configure GitHub Integration
1. In Azure Portal, go to your Static Web App
2. Click "Manage deployment tokens"
3. Copy the deployment token
4. Go to your GitHub repository
5. Go to Settings > Secrets and variables > Actions
6. Create new secret:
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: Paste the deployment token

### 4. Deploy Your Application
The GitHub Actions workflow (`azure-deploy.yml`) will automatically deploy when you push to main branch.

#### Manual Deployment
```bash
# Build locally
npm run build

# Deploy using Azure CLI
az staticwebapp deploy \
  --source dist \
  --name uro360-portal \
  --resource-group uro360-rg
```

### 5. Configure Custom Domain (Optional)
1. In Azure Portal, go to your Static Web App
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as instructed

## Cost Breakdown

### Free Tier (First 12 months)
- **Storage**: 2GB included
- **Bandwidth**: 100GB/month included
- **Build minutes**: 500 minutes/month included
- **Total cost**: $0

### Pay-as-you-go (After free tier)
- **Storage**: $0.40/GB/month
- **Bandwidth**: $0.40/GB
- **Build minutes**: $0.50/minute
- **Estimated monthly cost**: $2-5 for typical usage

## Alternative Cheap Options

### 1. Azure App Service (Basic Tier)
- **Cost**: $13/month
- **Pros**: Full server capabilities, custom domains
- **Cons**: More expensive than Static Web Apps

### 2. Azure Container Instances
- **Cost**: ~$5-10/month
- **Pros**: Containerized deployment
- **Cons**: More complex setup

### 3. Azure Functions + Storage
- **Cost**: ~$1-3/month
- **Pros**: Serverless, pay-per-use
- **Cons**: More complex architecture

## Performance Optimization

### 1. Enable Compression
Add to your `vite.config.js`:
```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts']
        }
      }
    }
  }
})
```

### 2. Optimize Images
- Use WebP format
- Implement lazy loading
- Compress images

### 3. Enable Caching
Add to your `public/_headers` file:
```
/*
  Cache-Control: public, max-age=31536000
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
```

## Monitoring and Analytics

### 1. Azure Application Insights
- Free tier: 5GB data/month
- Track performance and errors
- User analytics

### 2. Google Analytics
- Free tier available
- User behavior tracking
- Conversion tracking

## Security Considerations

### 1. Environment Variables
Store sensitive data in Azure Static Web Apps configuration:
```bash
az staticwebapp appsettings set \
  --name uro360-portal \
  --resource-group uro360-rg \
  --setting-names API_KEY="your-api-key"
```

### 2. Authentication
Configure built-in auth providers in Azure Portal:
- Azure AD
- GitHub
- Google
- Twitter

## Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version in workflow
2. **404 errors**: Verify output location is `dist`
3. **CORS issues**: Configure allowed origins in Azure Portal
4. **Slow loading**: Enable CDN and compression

### Support Resources
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Support](https://azure.microsoft.com/en-us/support/)

## Next Steps
1. Deploy to Azure Static Web Apps
2. Configure custom domain
3. Set up monitoring
4. Implement CI/CD pipeline
5. Add authentication if needed
