# 🛠️ Instant Mechanic — Operations Command Center

A full-stack, real-time operations dashboard built to streamline vehicle repair request tracking, mechanic fleet dispatching, customer acquisition analytics, and revenue management.

---

## 🚀 Production Deployment Links

* **Live Frontend Dashboard (Vercel):** [https://instant-mechanic-dashboard-mu.vercel.app](https://instant-mechanic-dashboard-mu.vercel.app)
* **Backend REST API (AWS EC2):** [http://16.171.139.19:5000/api/dashboard/overview](http://16.171.139.19:5000/api/dashboard/overview)
* **GitHub Repository:** [https://github.com/ImTusharr/instant-mechanic-dashboard](https://github.com/ImTusharr/instant-mechanic-dashboard)

---

## 📖 Project Overview & Development Journey

This application was engineered to address real-time operational bottlenecks in mobile mechanic dispatching. The objective was to replace traditional static logging with a high-throughput dynamic command center capable of reflecting live operational metrics without requiring manual browser reloads.

### Key Milestones Achieved:
1. **Database & API Architecture:** Designed an SQLite database seeded with over 550 operational records and built a Flask REST API to serve aggregated metrics and real-time streams.
2. **Containerization & AWS Infrastructure:** Packaged the Python Flask API into a lightweight Docker container and deployed it onto an AWS EC2 Ubuntu instance.
3. **Frontend & UX Engineering:** Developed a single-page application (SPA) using React, Vite, and Tailwind CSS, featuring glassmorphic dark-mode visuals and glowing status indicators.
4. **Security & Proxy Bridge:** Solved browser mixed-content restrictions (`HTTPS` Vercel origin attempting to reach `HTTP` EC2 IP) by engineering a reverse proxy configuration via `vercel.json`.

---

## 🏗️ System Architecture & Data Flow

[ React SPA Frontend ] (Hosted on Vercel - HTTPS)
│
▼  (Routes requests through /api to avoid Mixed-Content blocking)
[ Vercel Reverse Proxy ] (vercel.json)
│
▼  (Forwards HTTP API Calls)
[ AWS EC2 Instance ] (Ubuntu 22.04 LTS)
│
▼  (Exposes Port 5000)
[ Docker Container ] ──► [ Flask REST API ] ──► [ SQLite Database ]
│                                  └──► [ SSE Event Stream Engine ]

### Data Flow Breakdown:
1. **Client Initialization:** Upon load, the React frontend executes an asynchronous `fetch` request to `/api/dashboard/overview`.
2. **Proxy Resolution:** Vercel intercepts the `/api` request and rewrites the target destination to `http://16.171.139.19:5000/api/dashboard/overview`.
3. **Database Query & Aggregation:** The Flask backend processes the request, queries SQLite using SQLAlchemy, aggregates total revenue, active mechanics, job statuses, and customer numbers, and returns a structured JSON payload.
4. **Real-Time Streaming:** An active Server-Sent Events (SSE) connection streams live operational updates from the backend to the client to dynamically recalculate UI metrics on the fly.

---

## ✨ Core Features

* **Glassmorphism Dark Mode Interface:** Tailored UI built with Tailwind CSS (`zinc-950` background, semi-transparent card overlays, subtle borders, and neon status badges).
* **Live Operational KPIs:** Instant visual access to Total Revenue ($102.7k+), Lifetime Bookings (550), Completed Job Rates (68%), and On-Road Mechanics (16).
* **Dynamic Distribution Bars:** Visual progress indicators calculating real-time percentages for Completed Services, Pending Dispatches, and Cancelled Requests.
* **Mixed-Content Protection:** Seamless connection handling between cloud-hosted non-SSL backends and SSL-encrypted edge frontends.

---

## 📡 Backend API Reference

Base Endpoint: `http://16.171.139.19:5000/api`

| Endpoint | Method | Description | Sample Response Payload |
| :--- | :--- | :--- | :--- |
| `/dashboard/overview` | `GET` | Fetches aggregated KPI metrics and operational stats | `{"total_revenue": 102709.22, "total_bookings": 550, "completed_bookings": 374, "pending_bookings": 56, "cancelled_bookings": 27, "active_mechanics": 16, "new_customers": 33}` |
| `/bookings` | `GET` | Returns paginated list of all repair bookings | `[{"id": 1, "customer": "John Doe", "status": "completed", "amount": 150.00}]` |
| `/stream` | `GET` | Server-Sent Events (SSE) stream for real-time dispatch events | `text/event-stream` feed |

---

## ☁️ Production Deployment Steps

### 1. AWS EC2 Container Deployment
1. Launched an AWS EC2 `t2.micro` instance running Ubuntu 22.04 LTS.
2. Configured Security Group inbound rules:
   * **SSH (Port 22):** Allowed for administration.
   * **Custom TCP (Port 5000):** Opened to allow traffic to the Flask backend.
3. Installed Docker on EC2 and built the backend image:
   ```bash
   sudo apt update && sudo apt install docker.io -y
   sudo docker build -t instant-mechanic-api ./backend
   sudo docker run -d -p 5000:5000 --name mechanic-api instant-mechanic-api


## 🛠️ Local Development & Setup

# 1. Clone the Repository
git clone [https://github.com/](https://github.com/)<YOUR_GITHUB_USERNAME>/instant-mechanic-dashboard.git
cd instant-mechanic-dashboard

# 2. Start Backend API (http://localhost:5000)
cd backend
python -m venv venv

# Activate Virtual Environment:
# Windows (PowerShell): venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

pip install -r requirements.txt
python app.py

# 3. Start Frontend Dashboard (http://localhost:5173) [In a separate terminal window]
cd ../frontend
npm install
npm run dev

# Alternative: Run Backend Container Locally via Docker
cd ../backend
sudo docker build -t instant-mechanic-api .
sudo docker run -d -p 5000:5000 --name mechanic-api instant-mechanic-api

   
