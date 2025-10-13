# 📊 Design Your Own Analytics Dashboard

🧠 A customizable, interactive analytics platform built with React, where users can design, configure, and manage their own dashboards — featuring real-time data visualization, drag-and-drop widgets, and persistent layouts.

🔗 Live Demo: https://your-own-analytics-dashboard.netlify.app/

💻 GitHub: https://github.com/jasminekeshari/analytics-dashboard

<img width="1366" height="768" alt="Screenshot (134)" src="https://github.com/user-attachments/assets/68ffc7bc-bfd0-452f-b4db-d12d5800e717" />

dashboard

# 🚀 Overview

Analytics Dashboard is a fully dynamic and customizable web application designed for data-driven professionals who want to visualize and interact with their analytics in their own way.

# Users can:

-**Build dashboards using drag-and-drop widgets**
-**Configure each widget (data source, title, visualization type, etc.)**
-**Resize, duplicate, or remove widgets freely**
-**Persist layouts between sessions**
-**Simulate real-world data APIs and error handling**
-**Switch between Editor (can modify) and Viewer (read-only) roles**
-This project demonstrates strong front-end architecture, state management, and data visualization skills with clean code, TypeScript safety, and modern UI principles.

## ✨ Features

| Category              | Feature                     | Description                                    |
| --------------------- | --------------------------- | ---------------------------------------------- |
| 🎨 **UI**             | **Modern Design**           | Beautiful, minimal UI built with Tailwind CSS  |
| 🧩 **Widgets**        | **8 Types Available**       | Charts, tables, KPIs, and markdown notes       |
| 🖱️ **Interactions**  | **Drag, Resize, Reorder**   | Intuitive grid-based widget manipulation       |
| ⚙️ **Customization**  | **Configurable Widgets**    | Edit titles, data sources, and appearance live |
| 💾 **Persistence**    | **Local Storage Save**      | Dashboards are saved and loaded automatically  |
| 🔁 **Undo/Redo**      | **Mini History (10 steps)** | Reverse accidental layout changes              |
| 🔐 **Auth System**    | **Mock Login with Roles**   | Viewer (read-only) and Editor (full access)    |
| 🧱 **Error Handling** | **Widget Error Boundaries** | One broken widget won’t crash the whole app    |
| 📱 **Responsive**     | **Mobile-Friendly**         | Adaptive design for all screen sizes           |
| ⚡ **Performance**     | **Code Splitting**          | Lazy-loaded widgets improve load speed         |


## 🧭 Use Case

-This app can serve as a template or starter project for:
-Product Analytics Dashboards
-Admin Panels / BI Tools
-Team Performance Tracking
-KPI Reporting Interfaces
-Client-Facing Insights Portals
-It helps organizations or individuals visualize performance metrics, track progress, and make data-informed decisions in a customizable and interactive way.

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/analytics-dashboard.git
cd analytics-dashboard
```

2. **Install dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Start the backend server**

```bash
cd backend
node server.js
```

The API will run on `http://localhost:4000`

4. **Start the frontend** (in a new terminal)

```bash
cd frontend
npm run dev
```

The app will open at `http://localhost:5173`

5. **Login**

Enter any email and password to login. Choose "Editor" role to edit dashboards or "Viewer" for read-only access.

## 📁 Project Structure

```
analytics-dashboard/
├── backend/              # Mock API server
│   ├── server.js        # Express server with mock data
│   └── package.json
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   │   ├── auth/    # Login component
│   │   │   ├── dashboard/ # Canvas, Gallery, Config
│   │   │   ├── widgets/   # All widget types
│   │   │   └── common/    # Reusable components
│   │   ├── store/       # Zustand state management
│   │   │   ├── authStore.js
│   │   │   └── dashboardStore.js
│   │   ├── lib/         # API client
│   │   ├── utils/       # Helper functions
│   │   └── App.jsx      # Main app component
│   └── package.json
└── README.md
```

## 🎯 Available Widgets

### Charts
- **Time Series Chart** - Line chart showing trends over time
- **Bar Chart** - Compare values across categories
- **Pie Chart** - Show distribution as percentages

### Tables
- **Orders Table** - View and filter orders with pagination
- **Users Table** - Manage users with role filters

### KPIs
- **Single KPI** - Display one key metric with trend
- **Multi KPI** - Show 2-3 metrics side by side

### Other
- **Notes** - Add markdown-formatted documentation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **TanStack Query** - Data fetching and caching
- **react-grid-layout** - Drag and drop grid system
- **Recharts** - Beautiful charts
- **react-hook-form + Zod** - Form handling and validation
- **Lucide React** - Icon library

### Backend
- **Node.js + Express** - Mock API server
- **CORS** - Cross-origin resource sharing

## 🎨 Key Features Explained

### Drag & Drop
Uses `react-grid-layout` for smooth drag and resize interactions. Each widget snaps to a 12-column grid system.

### Undo/Redo
Implemented with a history stack that stores up to 10 previous states. Uses deep cloning to prevent reference issues.

### Error Boundaries
Each widget is wrapped in React Error Boundary. If one widget crashes, others continue working normally.

### Code Splitting
Widgets are lazy-loaded using `React.lazy()` and `Suspense`. This reduces initial bundle size and improves load times.

### Mock API Resilience
The backend simulates real-world conditions with:
- Random delays (200-600ms)
- 10% error rate
- Realistic mock data

## 🧪 Testing

```bash
cd frontend
npm test
```

Tests cover:
- Undo/Redo functionality
- Configuration validators
- API error handling
- Widget rendering

## 📦 Build for Production

```bash
cd frontend
npm run build
```

Production build will be in `frontend/dist/`

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Environment Variables

Create `.env` in frontend folder:

```env
VITE_API_BASE_URL=http://localhost:4000
```

For production, update to your deployed backend URL.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👤 Author

**Your Name**
- GitHub:https://github.com/jasminekeshari
- LinkedIn: 

## 🙏 Acknowledgments

- React Grid Layout for the amazing drag & drop functionality
- Recharts for beautiful charting components
- Tailwind CSS for making styling a breeze
- The React community for excellent documentation

---

Made with ❤️ for the interview assignment
