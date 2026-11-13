# DevOps Portfolio

[![CI](https://github.com/mihntriet/Portfolio/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mihntriet/Portfolio/actions/workflows/ci.yml)

This portfolio documents my current DevOps learning path and projects. I deployed this repository to an Amazon Linux 2023 EC2 instance from WSL using Ansible, Docker, and Nginx.

## Current status

- Hands-on foundation: Linux, Docker, Ansible, and AWS EC2. The Ansible playbooks and a reproducible EC2 walkthrough are in this repository.
- Theory only: Terraform and Kubernetes. They are not presented as production experience.
- GitHub Actions CI runs lint, test, build, and Docker smoke checks on pushes to `main` and pull requests. The [first successful hosted run](https://github.com/mihntriet/Portfolio/actions/runs/42351969216) passed both jobs. The workflow now includes a GHCR publish job for verified commits on `main`; EC2 deployment remains a manual Ansible step.
- Pipeline animations, terminal output, and project architecture diagrams on the site are illustrative, not live monitoring data.
- Only this portfolio currently has a project-specific repository link in the site. Links for other projects will be added when verified.

For the Windows + WSL + Amazon Linux 2023 setup, follow the [EC2 deployment guide](ansible/README.md) and read the [deployment case study](ansible/CASE_STUDY.md). The bootstrap and deployment playbooks have been run on EC2, and the portfolio was reachable through the instance's public address on port 8080.

---

## Tech Stack & Architecture

- Frontend: React 19, Vite, Tailwind CSS
- Animation: Framer Motion
- Communication: EmailJS REST API
- Deployment: Docker & Nginx

---

## Key Features

1. Contact and terminal: EmailJS client-side contact form and a simulated terminal for browsing portfolio information.
2. Architecture Canvas: Illustrative project diagrams. The nodes and animations are not live infrastructure telemetry.
3. Mobile Optimization: Automatically transforms layouts to vertical stacks on screens below 768px. Hover effects convert dynamically to touch tap actions.
4. Translation Protection: Configured with "translate=no" parameters to prevent browser translation extensions from corrupting the React virtual DOM.

---

## Local Development & Operation

### 1. Install Dependencies
```bash
npm ci
```

### 2. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 3. Run the same checks as CI
```bash
npm run lint
npm test
npm run build
```

The GitHub Actions workflow runs these checks on pull requests and pushes to `main`, then builds the Docker image and tests that Nginx serves the homepage and SPA fallback. The first hosted smoke test encountered a connection reset just after starting the container. The retry and diagnostic update passed in the [next run on `main`](https://github.com/mihntriet/Portfolio/actions/runs/42351969216). After both jobs pass on `main`, the new publish job transfers that tested image to GHCR with a commit tag and records its immutable digest in the workflow summary. Publishing and deployment from that digest still need to be verified on a hosted run.

### 4. Optional contact form configuration

Copy `.env.example` to `.env` and fill in the three EmailJS values before running Vite locally. These `VITE_*` values are embedded in browser code; never put secrets in them. Without configuration, the form is disabled and the email address remains visible. The current Docker build excludes `.env`, so its contact form is disabled by default.

### 5. Build Production Bundle
```bash
npm run build
```

---

## EC2 deployment with Ansible

The control node is Ubuntu in WSL on Windows; the managed node is Amazon Linux 2023 on EC2. The [bootstrap playbook](ansible/bootstrap-amazon-linux.yml) installs and starts Docker. The [deployment playbook](ansible/deploy.yml) copies the build inputs, builds the image on EC2, starts an Nginx container on port 8080, and checks the local HTTP response. The [inventory template](ansible/inventory.example.ini) shows the SSH settings; the real inventory and private key stay outside Git.

```bash
ansible -i ansible/inventory.ini portfolio -m ansible.builtin.ping
ansible-playbook -i ansible/inventory.ini ansible/bootstrap-amazon-linux.yml
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
```

The deployment was run twice: the first run reported `changed=6`, and the second reported `changed=0`, with no failed or unreachable hosts. After pinning a compatible `community.docker` version and updating the site, another unchanged run also reported `changed=0` without warnings. The playbook's HTTP check passed. This is an HTTP lab endpoint; HTTPS and automated delivery are future phases.

The next release path is documented in the [GHCR promotion guide](ansible/README.md#5-publish-and-promote-a-verified-image). It uses `ansible/deploy-image.yml` to pull a published image by digest, switch the container, check HTTP, and restore the previous image if that check fails. The existing `ansible/deploy.yml` still builds local workspace files; running it after a digest deployment intentionally switches the site back to a local build.

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

The Nginx configuration falls back to `index.html` for SPA page reloads:

```nginx
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```
