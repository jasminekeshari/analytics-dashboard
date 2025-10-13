# 📊 Analytics Dashboard

A modern, responsive **Analytics Dashboard** built with **React + Vite**, **Tailwind CSS**, and **Chart.js**.  
It visualizes key performance metrics and provides interactive charts with clean UI components.

---

## 🚀 Features

- 📈 Interactive line, bar, and pie charts using **Chart.js**
- 🎨 Fully responsive UI built with **Tailwind CSS**
- ⚙️ Modular and scalable component structure
- 🌗 Dark mode ready (optional)
- 🧭 Easy navigation with React Router
- ⚡ Fast performance with **Vite**

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React (Vite) |
| Styling | Tailwind CSS |
| Charts | Chart.js / React-Chartjs-2 |
| Icons | Lucide React |
| Package Manager | npm or yarn |

---

## 📂 Folder Structure

frontend/
│
├── public/ # Static files
├── src/
│ ├── assets/ # Images & icons
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Dashboard pages
│ ├── store/ # State management (Zustand/Redux)
│ ├── App.jsx # Main App entry
│ ├── main.jsx # React root render
│ └── index.css # Global Tailwind styles
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/jasminekeshari/analytics-dashboard
cd analytics-dashboard/frontend

2️⃣ Install dependencies
npm install

3️⃣ Setup Tailwind CSS

If not already initialized:

npx tailwindcss init -p


Ensure your tailwind.config.js includes:

content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: { extend: {} },
plugins: [],

🧩 Development Commands
Command	Description
npm run dev	Run the app in development mode
npm run build	Build for production
npm run preview	Preview production build
🧠 Example Components
ChartCard.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";

export default function ChartCard({ title, data }) {
  return (
    <Card className="p-4 shadow-md rounded-2xl">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <CardContent>
        <Line data={data} />
      </CardContent>
    </Card>
  );
}

🧾 Example Chart Data
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [1200, 1900, 3000, 2500, 3200],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.4,
    },
  ],
};

📦 Build for Production
npm run build


Then deploy the dist/ folder to:

Netlify

Vercel

GitHub Pages

or your preferred host.

🌍 Deployment (Example: Netlify)

Run npm run build

Drag and drop the dist folder into Netlify Drop

Done 🎉

🧑‍💻 Author

Jasmine Keshari
📧 Email: jasminekeshari2@gmail.com

🌐 GitHub: https://github.com/jasminekeshari

🪪 License

This project is licensed under the MIT License.
Feel free to use and modify it for your own projects!

💡 Tip

If you get the error:

npm error could not determine executable to run


Try deleting your node_modules and reinstalling:

rm -rf node_modules package-lock.json
npm install


⭐ If you like this project, give it a star on GitHub!
