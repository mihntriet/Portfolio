# 🌐 Cyber-DevOps Interactive Portfolio

Welcome to the **Cyber-DevOps Interactive Portfolio** — a premium, high-performance web dashboard showcasing DevOps pipelines, system architectures, and engineering capabilities wrapped in an interactive Cyberpunk command center aesthetic.

This project is built from scratch utilizing React, Vite, Tailwind CSS, and Framer Motion, engineered to run securely and responsively on any desktop, tablet, or mobile viewport.

---

## ⚡ Tech Stack & Architecture

- **Frontend Core**: React 18, Vite (for ultra-fast HMR builds), Tailwind CSS (for modern utility styling).
- **Interactive Visuals**: Framer Motion (for smooth micro-animations, slide-out drawer, and dynamic CLI logs).
- **Communication Layer**: EmailJS REST API (dependency-free integration with secure network telemetry logging).
- **Deployment & Hosting**: Docker Multi-stage Build & Nginx (optimized static asset hosting & routing protection).

---

## 🚀 Key Features

1. **Operations Command Center**: Features a simulated Radar Signal Transmitter panel side-by-side with an interactive Linux CLI Terminal on desktop viewports.
2. **Interactive Architecture Canvas**: Dynamic architectural graphs showing active nodes. Fully responsive and swipeable on mobile screen views.
3. **100% Mobile Optimized**: Automatically transforms double-column grids to vertical flex stacks on screens below `768px`. Tilt effects convert dynamically to tactile touch scales.
4. **Translation Crash Proof**: Configured with `translate="no"` parameters to prevent external translation extensions (e.g., Google Translate) from corrupting the React virtual DOM tree.

---

## 💻 Local Development & Operation

### Prerequisites
Make sure you have Node.js (version 18 or above) installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to test locally.

### 3. Build Production Bundle
```bash
npm run build
```

---

## 🐳 Docker Deployment & Containerization

The project is packaged utilizing a **Multi-Stage Build** to minimize the final production image size and maximize performance.

### 1. Build Docker Image
Run the build command from the root directory containing the `Dockerfile`:
```bash
docker build -t cyberpunk-portfolio:v1 .
```

### 2. Run Docker Container
Launch the container, mapping port `80` (internal Nginx) to port `8080` (external host):
```bash
docker run -d -p 8080:80 --name my-portfolio cyberpunk-portfolio:v1
```
Access your running deployment at: [http://localhost:8080](http://localhost:8080).

---

## 🐙 Multi-Container Automation (Docker Compose)

For rapid operations and automation, a `compose.yaml` configuration is provided.

### 1. Start the Deployment
Build the context and start the services running in detached background mode:
```bash
docker compose up -d --build
```

### 2. Monitor Container Status & Logs
```bash
docker compose ps
docker compose logs -f
```

### 3. Stop the Deployment
```bash
docker compose down
```

---

## ⚙️ Nginx & Routing Configuration

The deployment utilizes a custom [**`nginx.conf`**](file:///d:/24C02/Portfolio/nginx.conf) configuration to guarantee SPA routing works flawlessly without returning HTTP 404 errors on page reload (F5):

```nginx
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```
This forces Nginx to fall back to the React index page if a static asset matching the URL route is not found, letting React Router handle routing seamlessly.
