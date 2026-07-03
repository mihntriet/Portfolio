# DevOps Interactive Portfolio

Welcome to the DevOps Interactive Portfolio. This project is built utilizing React, Vite, Tailwind CSS, and Framer Motion, designed to run responsively on any desktop, tablet, or mobile viewport.

---

## Tech Stack & Architecture

- Frontend: React 18, Vite, Tailwind CSS
- Animation: Framer Motion
- Communication: EmailJS REST API
- Deployment: Docker & Nginx

---

## Key Features

1. Command Center: Features a simulated Radar Signal Transmitter panel side-by-side with an interactive Linux CLI Terminal on desktop viewports.
2. Architecture Canvas: Dynamic architectural graphs showing active nodes. Fully responsive and swipeable on mobile screen views.
3. Mobile Optimization: Automatically transforms layouts to vertical stacks on screens below 768px. Hover effects convert dynamically to touch tap actions.
4. Translation Protection: Configured with "translate=no" parameters to prevent browser translation extensions from corrupting the React virtual DOM.

---

## Local Development & Operation

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 3. Build Production Bundle
```bash
npm run build
```

---

## Docker Deployment

This project uses a Multi-stage Dockerfile to compile and host static files via Nginx.

### 1. Build Docker Image
```bash
docker build -t portfolio:v1 .
```

### 2. Run Docker Container
```bash
docker run -d -p 8080:80 --name my-portfolio portfolio:v1
```
Access at http://localhost:8080.

---

## Docker Compose Deployment

### 1. Start the System
```bash
docker compose up -d --build
```

### 2. Stop the System
```bash
docker compose down
```

---

## Nginx Routing Configuration

Custom nginx.conf configuration is used to prevent React Router 404 errors when reloading the page:

```nginx
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```
