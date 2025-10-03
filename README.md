# Global GMP/GDP Risk Assessment Tool

> **🎯 Interactive Demonstration Platform**  
> This is a fully functional demonstration of a pharmaceutical risk assessment tool. All data is stored locally in your browser using localStorage, providing a persistent and interactive experience without requiring a backend server.

A comprehensive web-based application for the pharmaceutical industry to manage risks associated with medicine transportation, in compliance with GMP (Good Manufacturing Practice) and GDP (Good Distribution Practice) guidelines.

## 🌟 Demo Features

**Try it live:** [https://popovicfilip9-ux.github.io/RISK-Tool/](https://popovicfilip9-ux.github.io/RISK-Tool/)

### Demo Credentials
- **Administrator:** `admin` / `admin123`
- **Risk Assessor:** `assessor` / `assessor123`  
- **Viewer:** `viewer` / `viewer123`

### Data Persistence
- All changes you make are **automatically saved** to your browser's local storage
- Your data **persists between sessions** on the same device
- Use the "Reset Demo" button to restore initial demo data
- Data is **device-specific** and not shared between browsers or devices

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
- **Data Storage**: Browser localStorage (no backend required)
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
- localStorage-based data persistence

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

**Live Demo:** [https://popovicfilip9-ux.github.io/RISK-Tool/](https://popovicfilip9-ux.github.io/RISK-Tool/)

## 💾 Data Storage Architecture

This demonstration uses browser localStorage to simulate a full-stack application:

- **Initial Data**: Demo data is loaded on first visit
- **Persistence**: All changes are automatically saved to localStorage
- **State Management**: React Context API manages application state
- **Data Integrity**: Automatic backup and restore functionality
- **Reset Capability**: Built-in demo reset functionality

## 🎯 Use Cases

This demonstration showcases:
- **Pharmaceutical Risk Management**: Complete GMP/GDP compliance workflows
- **Interactive Data Visualization**: Real-time charts and analytics
- **Role-Based Access Control**: Different user permission levels
- **Audit Trail Management**: Complete change tracking
- **Export Functionality**: PDF and Excel report generation

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
