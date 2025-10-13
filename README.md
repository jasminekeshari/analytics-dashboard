# 🧮 Analytics Dashboard

A modern **React + Tailwind CSS** web application for visualizing analytics data in an intuitive, clean, and interactive interface.  
This project is built with performance, scalability, and maintainability in mind — following best practices for modern frontend development.

## 🌟 Features

✅ **Responsive UI** — Built with Tailwind CSS for fast, adaptive layouts.  
✅ **Reusable Components** — Modular design for scalability.  
✅ **Interactive Charts** — Integrates with Chart.js/Recharts for data visualization.  
✅ **Dark Mode Ready** — Tailwind dark theme configuration.  
✅ **Optimized Performance** — Code-splitting and lazy loading enabled.  
✅ **Clean Folder Structure** — Organized and developer-friendly architecture.

## 🧩 Folder Structure

```
frontend/
│
├── public/                # Static assets (favicon, images, etc.)
├── src/
│   ├── assets/            # Icons, images, etc.
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page-level components (Dashboard, Login, etc.)
│   ├── store/             # State management (Zustand/Redux)
│   ├── utils/             # Helper functions
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind base styles
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/analytics-dashboard.git
cd analytics-dashboard/frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the development server
```bash
npm run dev
```

### 4️⃣ Build for production
```bash
npm run build
```

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | React (Vite) |
| Styling | Tailwind CSS |
| State Management | Zustand / Redux Toolkit |
| Charts | Recharts / Chart.js |
| Icons | Lucide React |
| Animations | Framer Motion |
| Deployment | Netlify / Vercel |


## 📂 Folder Structure

frontend/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images & icons
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── store/ # Global state management
│ ├── pages/ # Page components (Dashboard, Reports, etc.)
│ ├── App.jsx # Root component
│ ├── main.jsx # Entry point
│ └── index.css # Tailwind base styles
├── package.json
└── tailwind.config.js

## ⚙️ Installation

Follow these steps to set up and run the project locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/analytics-dashboard.git

# 2️⃣ Navigate to the project directory
cd analytics-dashboard/frontend

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev


---

### 🧩 **Block 7 — Tailwind Setup**
```markdown
## 🎨 Tailwind Setup (if not already configured)

If Tailwind is not set up, run:
```bash
npx tailwindcss init -p
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {},
},
plugins: [],

And in index.css, add:

@tailwind base;
@tailwind components;
@tailwind utilities;


---

### 🧩 **Block 8 — Running the Project**
```markdown
## 🧩 Running the Project

After installation, start the development server:
```bash
npm run dev

Then open your browser at:

http://localhost:5173


---

### 🧩 **Block 9 — Deployment**
```markdown
## 🌍 Deployment

You can deploy this project easily on **Netlify**, **Vercel**, or **GitHub Pages**.

For Netlify:
1. Push your project to GitHub.
2. Go to [https://app.netlify.com](https://app.netlify.com)
3. Click **New Site from Git**, connect your repository.
4. Set build command: `npm run build`
5. Set publish directory: `dist`

## 🖼️ Example Screenshot

<img width="1366" height="768" alt="Screenshot (134)" src="https://github.com/user-attachments/assets/e3169ac2-8894-4d34-9b10-6a865252372c" />

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page]( to get started https://github.com/jasminekeshari/analytics-dashboard)

## 🧾 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
## 👩‍💻 Author

**Jasmine Keshari**  
💼 [GitHub]
🌐 [Portfolio]



