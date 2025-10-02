# Global GMP/GDP Risk Assessment Tool

A comprehensive web-based application for the pharmaceutical industry to manage risks associated with medicine transportation, in compliance with GMP (Good Manufacturing Practice) and GDP (Good Distribution Practice) guidelines.

## 🚀 Features

### Core Functionality
- **Multi-user System**: Distinct access levels for administrators, risk assessors, and viewers
- **CRUD Operations**: Add, update, and delete risk entries with an intuitive interface
- **Interactive Dashboard**: Visual heatmaps, KPIs, risk distribution charts, and trend analysis
- **Regulatory References**: Searchable library of regulatory references linked to risk assessments
- **Audit Trail**: Complete history of all changes made to risk entries

### Advanced Features
- **FMEA Integration**: Failure Mode and Effects Analysis with automated risk calculations
- **Risk Treatment Planning**: Comprehensive mitigation strategies and action plans
- **Approval Workflows**: Multi-level approval system with digital signatures
- **Export Capabilities**: PDF and Excel export functionality for reports and assessments
- **Real-time Analytics**: Live dashboard with risk metrics and trends

## 🛠️ Technical Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Export**: jsPDF and xlsx for document generation
- **Deployment**: GitHub Pages with GitHub Actions

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/popovicfilip9-ux/RISK-Tool.git
cd RISK-Tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates a `dist` directory with production-ready files.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── DashboardPage.jsx
│   ├── RiskManagementPage.jsx
│   ├── FMEAOverviewPage.jsx
│   └── ...
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 🔧 Configuration

The application is configured for GitHub Pages deployment with:
- Base path: `/RISK-Tool/`
- Asset optimization for production
- Responsive design for all devices

## 📊 Key Components

### Dashboard
- Risk overview with visual metrics
- Trend analysis and KPI tracking
- Quick access to critical assessments

### Risk Management
- Comprehensive risk entry forms
- Risk matrix visualization
- Mitigation tracking

### FMEA Module
- Failure mode analysis
- Risk priority number calculations
- Action item tracking

### Approval Workflows
- Multi-stage approval process
- Digital signature integration
- Status tracking and notifications

## 🚀 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions. Every push to the main branch triggers a new deployment.

Live URL: [https://popovicfilip9-ux.github.io/RISK-Tool/](https://popovicfilip9-ux.github.io/RISK-Tool/)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.
