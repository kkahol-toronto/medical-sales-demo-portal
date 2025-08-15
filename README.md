# Uro360 Portal - Physician Intelligence Platform

A comprehensive AI-powered platform for sales representatives to access dynamic, data-rich profiles of healthcare providers who prescribe Ostomy or Internal Catheter products.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/kkahol-toronto/medical-sales-demo-portal.git
cd medical-sales-demo-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

### Authentication
- **Username**: `demo@hollister.com`
- **Password**: `demo123`
- **Note**: Login page is the home page - you'll be redirected to dashboard after successful authentication

## 🌐 Azure Deployment

### Quick Deploy to Azure Static Web Apps (Cheapest Option)

1. **Fork this repository** to your GitHub account
2. **Create Azure Static Web App**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Create new "Static Web App"
   - Connect to your GitHub repository
   - Set build details: App location `/`, Output location `dist`
3. **Configure GitHub Secrets**:
   - Add `AZURE_STATIC_WEB_APPS_API_TOKEN` from Azure
4. **Deploy**: Push to main branch triggers automatic deployment

### Cost Breakdown
- **Free Tier**: $0/month (2GB storage, 100GB bandwidth)
- **Pay-as-you-go**: ~$2-5/month after free tier

For detailed deployment instructions, see [Azure Deployment Guide](azure-deployment-guide.md).

## 📊 Data Overview

### Physician Database
- **42 Physicians** across 3 states:
  - Colorado: 20 physicians
  - Kansas: 10 physicians  
  - New Mexico: 12 physicians
- **Confidence Levels**:
  - High: 40% (green)
  - Medium: 30% (yellow)
  - Low: 30% (pink)
- **Intelligence Signals**: A-F with descriptive tooltips

### Mock Data Sources
- Product utilization trends
- Salesforce trip notes
- Research publications
- Conference attendance
- Practice expansion data
- Social media insights

## 🎯 Key Features

### Dashboard
- **Analytics Overview**: Total physicians, average scores, confidence distribution
- **Interactive Charts**: Score distribution pie chart, state distribution bar chart
- **Smart Filtering**: Search by name, specialty, location, confidence level
- **Needs Attention**: Tooltip showing low-confidence physicians requiring follow-up

### Physician Profiles (HCP)
- **Comprehensive Analytics**: Product utilization, publications, conferences
- **AI Sales Intelligence**: Personalized insights and recommended actions
- **Contact Information**: Simulated contact details and next visit scheduling
- **Trip Notes**: Historical visit records with detailed expansion
- **Practice Expansion**: Job postings and growth indicators
- **Social Media Insights**: Trending topics and engagement patterns

### Best Practices Library
- **Clinical Guidelines**: CAUTI prevention, catheterization best practices
- **Implementation Tools**: Step-by-step guides and checklists
- **Sales Resources**: External links to CDC, UroToday, and industry resources
- **Case Studies**: Real-world implementation examples

## 🏗️ Project Structure

```
src/
├── api/           # Mock API endpoints
├── assets/        # Images and static files
├── components/    # Reusable UI components
├── data/          # Mock data and constants
├── lib/           # Utility functions
├── pages/         # Main application pages
└── main.jsx       # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Green (#16a34a) - Success and growth
- **Accent**: Orange (#ea580c) - Attention and action
- **Neutral**: Slate (#64748b) - Text and borders

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: Monospace for technical content

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent padding and hover states
- **Charts**: Responsive with interactive tooltips
- **Forms**: Clean inputs with validation states

## ⚙️ Configuration

### Environment Variables
```bash
# Development
VITE_API_URL=http://localhost:3000/api

# Production (Azure)
VITE_API_URL=https://your-app.azurestaticapps.net/api
```

### Build Configuration
- **Vite**: Fast development and optimized builds
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side navigation
- **Recharts**: Interactive data visualization

## 📈 Analytics & Performance

### Performance Metrics
- **Load Time**: < 2 seconds for physician profiles
- **Bundle Size**: Optimized with code splitting
- **Caching**: Static assets cached for 1 year
- **CDN**: Global content delivery network

### Monitoring
- **Error Tracking**: Built-in error boundaries
- **Performance**: Core Web Vitals optimization
- **Analytics**: User behavior tracking ready

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test locally
4. Commit with descriptive messages
5. Push and create pull request

### Code Standards
- **ESLint**: JavaScript/React linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety (future enhancement)
- **Testing**: Unit and integration tests (future enhancement)

## 📄 License

This project is proprietary to Hollister Incorporated. All rights reserved.

## 🆘 Support

### Documentation
- [Azure Deployment Guide](azure-deployment-guide.md)
- [Requirements Mapping](REQUIREMENTS_MAPPING.md)
- [API Documentation](docs/api.md) (future)

### Contact
- **Technical Issues**: Create GitHub issue
- **Feature Requests**: Submit enhancement proposal
- **Security**: Report to security team

## 📋 Version History

### v1.0.0 (Current)
- ✅ Complete MVP implementation
- ✅ 42 physician profiles with mock data
- ✅ Interactive dashboard with analytics
- ✅ AI sales intelligence features
- ✅ Best practices library
- ✅ Azure deployment ready
- ✅ HIPAA compliance considerations
- ✅ Performance optimization
- ✅ Comprehensive documentation

### Future Enhancements
- 🔄 Real API integration
- 🔄 Advanced analytics dashboard
- 🔄 Mobile application
- 🔄 Multi-language support
- 🔄 Advanced search and filtering
- 🔄 Export functionality
- 🔄 Real-time notifications
