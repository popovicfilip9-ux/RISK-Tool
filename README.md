# Global GMP/GDP Risk Assessment Tool

This is a web-based application for the pharmaceutical industry to manage risks associated with medicine transportation, in compliance with GMP and GDP guidelines.

## Features

- **Multi-user system:** Distinct access levels for administrators, risk assessors, and viewers.
- **CRUD operations:** Add, update, and delete risk entries with an intuitive interface.
- **Interactive Dashboard:** Visual heatmaps, KPIs, risk distribution charts, and trend analysis.
- **Regulatory References:** A searchable library of regulatory references linked to risk assessments.
- **Audit Trail:** A complete history of all changes made to risk entries.

## Technical Stack

- **Frontend:** React, React Router, Chart.js, and shadcn/ui.
- **Styling:** Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gmp-gdp-risk-tool.git
   ```
2. Navigate to the project directory:
   ```bash
   cd gmp-gdp-risk-tool
   ```
3. Install the dependencies:
   ```bash
   pnpm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
pnpm run dev
```

This will start the application on `http://localhost:5173`.

## Deployment

To build the application for production, run the following command:

```bash
pnpm run build
```

This will create a `dist` directory with the production-ready files. You can then deploy this directory to any static web host.

