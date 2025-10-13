📊 Design Your Own Analytics Dashboard

🧠 A customizable, interactive analytics platform built with React, where users can design, configure, and manage their own dashboards — featuring real-time data visualization, drag-and-drop widgets, and persistent layouts.

🔗 Live Demo: https://your-own-analytics-dashboard.netlify.app/

💻 GitHub: https://github.com/jasminekeshari/analytics-dashboard

🚀 Overview

Analytics Dashboard is a fully dynamic and customizable web application designed for data-driven professionals who want to visualize and interact with their analytics in their own way.

Users can:

Build dashboards using drag-and-drop widgets

Configure each widget (data source, title, visualization type, etc.)

Resize, duplicate, or remove widgets freely

Persist layouts between sessions

Simulate real-world data APIs and error handling

Switch between Editor (can modify) and Viewer (read-only) roles

This project demonstrates strong front-end architecture, state management, and data visualization skills with clean code, TypeScript safety, and modern UI principles.

✨ Key Features
Category	Feature	Description
🎨 UI	Modern Design	Beautiful, minimal UI built with Tailwind CSS
🧩 Widgets	8 Types Available	Charts, tables, KPIs, and markdown notes
🖱️ Interactions	Drag, Resize, Reorder	Intuitive grid-based widget manipulation
⚙️ Customization	Configurable Widgets	Edit titles, data sources, and appearance live
💾 Persistence	Local Storage Save	Dashboards are saved and loaded automatically
🔁 Undo/Redo	Mini History (10 steps)	Reverse accidental layout changes
🔐 Auth System	Mock Login with Roles	Viewer (read-only) and Editor (full access)
🧱 Error Handling	Widget Error Boundaries	One broken widget won’t crash the whole app
📱 Responsive	Mobile-Friendly	Adaptive design for all screen sizes
⚡ Performance	Code Splitting	Lazy-loaded widgets improve load speed
🧭 Use Case

This app can serve as a template or starter project for:

Product Analytics Dashboards

Admin Panels / BI Tools

Team Performance Tracking

KPI Reporting Interfaces

Client-Facing Insights Portals

It helps organizations or individuals visualize performance metrics, track progress, and make data-informed decisions in a customizable and interactive way.

🛠️ Tech Stack
Frontend

⚛️ React 18

⚡ Vite

🎨 Tailwind CSS

🧠 Zustand (state management)

🔄 TanStack React Query (data fetching)

📈 Recharts (charts)

🧾 react-hook-form + Zod (form & validation)

📐 react-grid-layout (drag & resize system)

🧩 Lucide React (icons)

Backend (Mock API)

🟢 Node.js + Express

🧰 json-server (mock endpoints)

🔁 Simulated latency + random errors for realism

🌐 CORS enabled

📁 Project Structure
analytics-dashboard/
├── backend/              
│   ├── server.js        # Express + json-server mock API
│   └── seed.json        # Mock data sources
│
├── frontend/            
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Login & role management
│   │   │   ├── dashboard/     # Canvas, Gallery, Config Panel
│   │   │   ├── widgets/       # All widget types (charts, tables, etc.)
│   │   │   └── common/        # Shared UI elements
│   │   ├── store/             # Zustand stores (auth, dashboard)
│   │   ├── lib/               # API clients, hooks
│   │   ├── utils/             # Helper functions
│   │   └── App.jsx            # Root component
│   └── package.json
│
└── README.md

🎯 Available Widgets
Charts

📈 Time Series Chart — Line chart showing trends over time

📊 Bar Chart — Compare category-wise values

🍩 Pie Chart — Display proportional data

Tables

📋 Orders Table — Paginated table with sorting/filtering

👥 Users Table — Filter users by role or status

KPIs

💰 Single KPI — Shows one key metric with delta change

📊 Multi KPI — Displays 2–3 metrics in a single card

Other

📝 Markdown Notes — Add formatted documentation or notes

⚡ Quick Start Guide
Prerequisites

Node.js v18+

npm or yarn

Installation
# Clone the repository
git clone https://github.com/jasminekeshari/analytics-dashboard
cd analytics-dashboard

Backend Setup
cd backend
npm install
node server.js


Mock API runs at 👉 http://localhost:4000

Frontend Setup
cd ../frontend
npm install
npm run dev


App runs at 👉 http://localhost:5173

Login

Use any email/password to log in.
Choose:

Editor → Full access (edit dashboard)

Viewer → Read-only view

⚙️ Environment Variables

Create .env in the frontend folder:

VITE_API_BASE_URL=http://localhost:4000


For production, update this to your deployed backend URL.

🧠 Core Concepts Explained
🧩 Drag & Drop

Powered by react-grid-layout, enabling smooth drag, resize, and reorder interactions on a responsive 12-column grid.

🔁 Undo/Redo

Implemented via a history stack storing the last 10 layout operations. Supports deep cloning for accurate state recovery.

🧱 Error Boundaries

Each widget is wrapped in its own boundary. If one fails, the rest remain functional — ensuring robust UI resilience.

⚡ Code Splitting

Widgets are lazy-loaded with React.lazy() and Suspense, reducing bundle size and improving startup performance.

🌍 Mock API Resilience

The mock backend:

Adds 200–600ms latency

Triggers 10% random errors

Returns empty datasets occasionally
This ensures widgets handle loading, empty, and error states gracefully.

🧪 Testing
cd frontend
npm test


Includes Tests For:

History reducer (undo/redo)

Config validators (Zod)

API error mapper

Widget rendering (loading → success → error)

📦 Build for Production
cd frontend
npm run build


Build output:
frontend/dist/

☁️ Deployment
Deploy to Netlify or Vercel

Push your code to GitHub

Go to vercel.com
 or netlify.com

Import your repository

Vercel/Netlify auto-detects Vite & deploys automatically

🤝 Contributing

Contributions are welcome!
If you’d like to improve features or fix bugs, feel free to open a Pull Request or create an issue.

📝 License

MIT License — Free for personal or commercial use.
Use this project as a learning resource or boilerplate for your own analytics dashboard projects.

👤 Author

Jasmine Keshari
🌐 GitHub: github.com/jasminekeshari

💼 LinkedIn: 

🙏 Acknowledgments

🧱 React Grid Layout — for the drag & drop grid system

📊 Recharts — for beautiful charts and graphs

🎨 Tailwind CSS — for rapid, modern UI styling

🧠 React Query — for smooth async data management

❤️ React Community — for documentation and libraries

💡 Final Note

This project showcases modern React architecture, resilient UI patterns, and data-driven design principles — crafted to demonstrate real-world problem-solving, scalability, and developer craftsmanship.

“Build your own dashboard. Shape your own data story.” 📊
