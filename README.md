# Physician 360 - AI-Powered Sales Intelligence Platform

A comprehensive AI platform designed to generate dynamic, data-rich profiles on healthcare providers who prescribe Ostomy or Internal Catheter products. Built for Hollister sales representatives to deliver highly personalized, insight-driven engagement strategies.

## 🚀 Features

### Core Functionality
- **Physician Intelligence**: Dynamic profiles with AI-generated insights
- **Sales Intelligence**: Actionable recommendations for sales representatives
- **Data Visualization**: Interactive charts and analytics
- **Best Practices**: Evidence-based protocols and guidelines
- **Contact Management**: Complete physician contact information

### Key Components
- **Dashboard**: Overview of 42 physicians across CO, KS, and NM
- **Individual Profiles**: Detailed physician analysis with AI insights
- **Best Practices Library**: Clinical guidelines and implementation tools
- **Interactive Charts**: Score distribution, state analysis, and trends
- **Sales Resources**: CDC guidelines, case studies, and implementation tools

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts library
- **Routing**: React Router DOM
- **Icons**: Heroicons (SVG)
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Uro360-portal-v3
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## 🔐 Authentication

### Demo Login
- **Email**: rep@hollister.com
- **Password**: demo123
- **Roles**: Sales Rep, Manager, Admin

## 📊 Data Overview

### Physician Distribution
- **Colorado**: 20 physicians
- **Kansas**: 10 physicians  
- **New Mexico**: 12 physicians

### Confidence Levels
- **High**: ~40% (17 physicians)
- **Medium**: ~30% (13 physicians)
- **Low**: ~30% (12 physicians)

### Signals (A-F)
- **A**: Evidence-based practice
- **B**: Volume/Setting optimization
- **C**: Environmental factors
- **D**: Relationship strength
- **E**: Engagement level
- **F**: Fit/Coverage alignment

## 🎯 Key Features

### AI Sales Intelligence
- **Key Insights**: Confidence level analysis, signal detection, volume categorization
- **Recommended Actions**: Score-based strategies, engagement tactics, evidence focus
- **Next Visit Scheduling**: Dynamic future visit dates
- **Relationship Status**: Color-coded relationship indicators

### Interactive Dashboard
- **Analytics Overview**: Total physicians, average scores, high performers, needs attention
- **Score Distribution**: Pie chart showing score ranges
- **State Distribution**: Bar chart of physicians by state
- **Hover Tooltips**: Detailed information on hover

### Best Practices Library
- **CAUTI Prevention Bundle**: CDC guidelines and implementation tools
- **Intermittent Catheterization Protocol**: Clinical best practices
- **Patient Education Framework**: Educational resources
- **Quality Metrics Dashboard**: Performance tracking tools

### Sales Resources
- **Clinical Guidelines**: CDC and UroToday resources
- **Patient Materials**: Brochures, videos, instructions
- **Research & Data**: Clinical studies and outcomes
- **Implementation Tools**: Checklists and training materials
- **Case Studies**: Real-world success stories
- **Contact & Support**: Clinical support and consultation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Badges.jsx      # Badge and pill components
│   ├── ScoreChart.jsx  # Score visualization
│   └── Tabs.jsx        # Tab navigation
├── data/
│   └── physicians.js   # Mock physician data
├── lib/
│   └── score.js        # Scoring algorithms
├── pages/              # Main application pages
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Hcp.jsx         # Individual physician profiles
│   ├── Login.jsx       # Authentication
│   └── Practices.jsx   # Best practices library
└── api/
    └── mock.js         # Mock API endpoints
```

## 🎨 Design System

### Color Scheme
- **Primary**: Brand red (#dc2626)
- **Secondary**: Slate grays
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Components
- **Cards**: Rounded corners with shadows
- **Buttons**: Consistent styling with hover states
- **Charts**: Interactive with tooltips
- **Forms**: Clean, accessible design

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific configuration:

```env
VITE_APP_TITLE=Physician 360
VITE_API_BASE_URL=http://localhost:3000
```

### Customization
- **Brand Colors**: Update `tailwind.config.js`
- **Data Sources**: Modify `src/data/physicians.js`
- **API Endpoints**: Update `src/api/mock.js`

## 📈 Analytics & Insights

### Physician Scoring
- **Factor A**: Evidence-based practice (0-1)
- **Factor B**: Volume/Setting optimization (0-1)
- **Factor C**: Environmental factors (0-1)
- **Factor D**: Relationship strength (0-1)
- **Factor E**: Engagement level (0-1)
- **Factor F**: Fit/Coverage alignment (0-1)

### Confidence Levels
- **High**: Strong engagement potential
- **Medium**: Moderate opportunity for growth
- **Low**: Needs focused attention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software developed for Hollister Incorporated.

## 🆘 Support

For technical support or questions:
- **Email**: support@hollister.com
- **Documentation**: See `REQUIREMENTS_MAPPING.md` for detailed feature mapping

## 🔄 Version History

- **v0.3.0**: Enhanced AI insights, contact information, sales resources
- **v0.2.0**: Added best practices library and interactive charts
- **v0.1.0**: Initial dashboard and physician profiles

---

**Note**: This is a demo application with mock data. For production use, integrate with real data sources and implement proper security measures.
