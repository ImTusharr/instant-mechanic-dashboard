# 🛠️ Instant Mechanic — Operations Command Center

> A dynamic, real-time operations dashboard for mechanic fleet management, booking tracking, and revenue analytics.

**[Live Demo](#-production-deployment-links)** • **[Documentation](#-api-documentation)** • **[Report Bug](https://github.com/ImTusharr/instant-mechanic-dashboard/issues)** • **[Request Feature](https://github.com/ImTusharr/instant-mechanic-dashboard/issues)**

[![Node](https://img.shields.io/badge/Node-16+-green?logo=node.js&style=for-the-badge)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&style=for-the-badge)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker&style=for-the-badge)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-ImTusharr-black?logo=github&style=for-the-badge)](https://github.com/ImTusharr)

---

## 📖 Table of Contents

- [Overview](#-project-overview)
- [Features](#-main-features)
- [Tech Stack](#️-tech-stack)
- [Quick Stats](#-quick-stats)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Local Setup](#-local-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [AI Usage](#-ai-usage)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📊 Quick Stats

| Feature | Details |
|---------|---------|
| 🎨 **Frontend** | React 18 + Vite + Tailwind CSS |
| 🔧 **Backend** | Python Flask + SQLAlchemy ORM |
| 💾 **Database** | SQLite with historical records |
| ☁️ **Hosting** | Vercel (Frontend) + AWS EC2 (Backend) |
| 🔄 **Real-time** | Server-Sent Events (SSE) |
| 📱 **Design** | Glassmorphism dark theme |
| 🐳 **Containerization** | Docker support |

---

## 📖 Project Overview

### What We Built

**Instant Mechanic — Operations Command Center** is a Single-Page Application (SPA) designed to provide a **centralized command center** for mechanic service operations.

The dashboard dynamically displays critical operational metrics:

- 💰 **Total Revenue** — Real-time revenue tracking
- 📊 **Booking Analytics** — Comprehensive booking statistics
  - Total Bookings
  - Completed Bookings
  - Pending Bookings
  - Cancelled Bookings
- 🚗 **Fleet Management** — Active mechanics count
- 👥 **Customer Acquisition** — New customer tracking
- 📈 **Status Distribution** — Visual booking status breakdown
- 📋 **Paginated History** — Efficient booking record browsing
- ⚡ **Real-time Updates** — Live dispatch and operational events

### Why We Built It

Traditional mechanic operations rely on **static spreadsheets and manually refreshed dashboards**, making it difficult to:

- ❌ Monitor real-time booking status
- ❌ Track mechanic availability
- ❌ Analyze revenue trends
- ❌ Manage customer acquisition

**Instant Mechanic solves this** by combining:
- **React Frontend** — Interactive, responsive UI
- **Flask Backend** — RESTful API with real-time SSE
- **SQLite Database** — Reliable data persistence
- **Docker + AWS** — Scalable cloud deployment

---

## ✨ Main Features

- 📊 **Dynamic Dashboard KPIs** — Real-time metrics for revenue, bookings, and mechanic status
- 📈 **Booking Analytics** — Visual status distribution and historical data
- 📋 **Paginated History** — Efficiently browse large booking datasets
- 🚗 **Fleet Management** — Track active mechanics and availability at a glance
- ⚡ **Real-Time Events** — Server-Sent Events for instant operational updates
- 🌙 **Dark Mode UI** — Professional glassmorphism design
- 📱 **Responsive Design** — Seamless experience on desktop and mobile
- 🔒 **Secure Deployment** — Environment-based configuration & security best practices

---

## 🛠️ Tech Stack

### Frontend

- **React 18** — Modern UI library with hooks
- **Vite** — Lightning-fast build tool & dev server
- **Tailwind CSS** — Utility-first styling
- **JavaScript (ES6+)** — Modern JavaScript features
- **SSE Client** — Real-time event listening
- **Responsive Design** — Mobile-first approach
- **Glassmorphism UI** — Modern dark dashboard aesthetic

### Backend

- **Python 3.8+** — Production-ready language
- **Flask** — Lightweight, flexible web framework
- **Flask-SQLAlchemy** — ORM for database operations
- **REST API** — RESTful endpoint design
- **Server-Sent Events (SSE)** — Real-time data streaming
- **CORS Support** — Cross-origin request handling

### Database

- **SQLite** — Reliable, serverless database
- **Flask-SQLAlchemy ORM** — Type-safe database queries
- **Pre-seeded Data** — Historical operational records

### Infrastructure

- **Docker** — Container orchestration
- **AWS EC2** — Cloud compute (Ubuntu 22.04 LTS)
- **Vercel** — Frontend hosting & API routing
- **GitHub** — Version control & CI/CD

### Development Tools

- **Git** — Version control
- **npm** — Package management
- **Python venv** — Virtual environment
- **Docker Engine** — Local containerization

---

## 🏗️ Architecture

The application follows a clean **three-tier architecture**:

```
Frontend → API Gateway → Backend → Database
```

### Visual Architecture Diagram

```
┌───────────────────────────────────┐
│    🎨 React Frontend              │
│    (Vite + Tailwind CSS)          │
│    Hosted on Vercel               │
└─────────────────┬─────────────────┘
                  │ HTTPS
                  ▼
┌───────────────────────────────────┐
│  📡 Vercel API Proxy              │
│  /api/* Rewrite to Backend        │
└─────────────────┬─────────────────┘
                  │ HTTP
                  ▼
┌───────────────────────────────────┐
│  🔧 Flask Backend + SSE           │
│  REST API + Real-time Events      │
│  Docker Container / AWS EC2       │
└─────────────────┬─────────────────┘
                  │ SQL/ORM
                  ▼
┌───────────────────────────────────┐
│  💾 SQLite Database               │
│  Historical Operational Records   │
└───────────────────────────────────┘
```

### Data Flow

1. **Frontend** → React app sends API requests (e.g., `GET /api/dashboard/overview`)
2. **API Proxy** → Vercel rewrites `/api/*` requests to AWS EC2 backend
3. **Backend** → Flask processes request, queries SQLite database
4. **Database** → SQLite returns operational metrics
5. **Response** → JSON data flows back to frontend for dynamic rendering
6. **Real-time** → SSE stream provides live updates without page refresh

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **Python** v3.8 or higher ([Download](https://www.python.org/))
- **Git** ([Download](https://git-scm.com/))
- **Docker** (optional, for containerized deployment) ([Download](https://www.docker.com/))

Verify installation:

```bash
node --version    # v16+
python --version  # 3.8+
git --version
docker --version  # optional
```

---

## 📁 Project Structure

```
instant-mechanic-dashboard/
│
├── 📂 backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile             # Docker configuration
│   ├── .env.example           # Environment variables template
│   ├── .env                   # Environment config (git-ignored)
│   └── 📂 instance/
│       └── mechanic.db        # SQLite database
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable React components
│   │   ├── 📂 pages/          # Page components
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── App.css            # Global styles
│   │
│   ├── package.json           # npm dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── .env.example           # Environment variables template
│   ├── .env                   # Environment config (git-ignored)
│   └── index.html             # HTML entry point
│
├── vercel.json                # Vercel deployment config
├── README.md                  # This file
├── .gitignore                 # Git ignore rules
└── LICENSE                    # MIT License
```

---

## 💻 Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ImTusharr/instant-mechanic-dashboard.git
cd instant-mechanic-dashboard
```

### 🐍 Backend Setup

#### Step 1: Navigate to Backend

```bash
cd backend
```

#### Step 2: Create Python Virtual Environment

**Windows (PowerShell):**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

#### Step 4: Configure Environment

Create `backend/.env`:

```env
PORT=5000
FLASK_ENV=development
DATABASE_URL=sqlite:///instance/mechanic.db
```

#### Step 5: Start Backend

```bash
python app.py
```

✅ Backend ready at: `http://localhost:5000`

---

### ⚛️ Frontend Setup

#### Step 1: Navigate to Frontend (New Terminal)

```bash
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Configure Environment

Create `frontend/.env`:

**For Local Development:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**For Production (Vercel):**
```env
VITE_API_BASE_URL=/api
```

#### Step 4: Start Frontend

```bash
npm run dev
```

✅ Frontend ready at: `http://localhost:5173`

Open your browser and navigate to the URL shown in the terminal.

---

## 🐳 Running Backend with Docker

### Build Docker Image

```bash
cd backend
docker build -t instant-mechanic-api .
```

### Run Container

```bash
docker run -d \
  -p 5000:5000 \
  --name mechanic-api \
  instant-mechanic-api
```

✅ API accessible at: `http://localhost:5000`

### View Logs

```bash
docker logs mechanic-api
```

### Stop Container

```bash
docker stop mechanic-api
docker rm mechanic-api
```

---

## 🔐 Environment Variables

### Backend Configuration

**File:** `backend/.env`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Flask server port |
| `FLASK_ENV` | No | `production` | Runtime environment (development/production) |
| `DATABASE_URL` | No | `sqlite:///instance/mechanic.db` | Database connection string |

**Example:**
```env
PORT=5000
FLASK_ENV=development
DATABASE_URL=sqlite:///instance/mechanic.db
```

### Frontend Configuration

**File:** `frontend/.env`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Yes | `/api` | Backend API base URL |

**Example (Local):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Example (Production):**
```env
VITE_API_BASE_URL=/api
```

### Security Best Practices

⚠️ **DO NOT commit `.env` files to GitHub!**

- Use `.env.example` templates
- Keep sensitive credentials local
- Use GitHub Secrets for CI/CD pipelines
- Rotate credentials regularly

---

## 📡 API Documentation

### Base URLs

| Environment | URL |
|-------------|-----|
| **Local** | `http://localhost:5000/api` |
| **Production** | `/api` (routed via Vercel) |

---

### 1️⃣ Dashboard Overview

Returns main operational metrics.

```http
GET /api/dashboard/overview
```

**Response:**
```json
{
  "total_revenue": 102709.22,
  "total_bookings": 550,
  "completed_bookings": 374,
  "pending_bookings": 56,
  "cancelled_bookings": 27,
  "active_mechanics": 16,
  "new_customers": 33
}
```

**Use Case:** Display KPI cards on dashboard homepage

---

### 2️⃣ Bookings History

Returns paginated booking records.

```http
GET /api/bookings?page=1&limit=10
```

**Response:**
```json
[
  {
    "id": 1,
    "customer": "John Doe",
    "status": "completed",
    "amount": 150.00,
    "date": "2024-01-15"
  },
  {
    "id": 2,
    "customer": "Jane Smith",
    "status": "pending",
    "amount": 200.00,
    "date": "2024-01-16"
  }
]
```

**Use Case:** Populate booking history table with pagination

---

### 3️⃣ Real-Time Stream

Server-Sent Events endpoint for live updates.

```http
GET /api/stream
```

**Response Type:** `text/event-stream`

**Example Event:**
```
data: {"type": "booking_updated", "booking_id": 42, "status": "completed"}
```

**Use Case:** Real-time dashboard updates without page refresh

**Frontend Usage:**
```javascript
const eventSource = new EventSource('/api/stream');
eventSource.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  // Update dashboard with new data
});
```

---

## 🚀 Deployment

The project uses a **hybrid deployment strategy** for optimal performance and cost efficiency.

| Component | Hosting | Benefits |
|-----------|---------|----------|
| **Frontend** | Vercel | Fast CDN, auto-scaling, free tier |
| **Backend** | AWS EC2 | Full control, flexible config, Docker support |
| **Database** | SQLite (local) | Lightweight, no additional DB service needed |

---

### ☁️ Backend Deployment — AWS EC2

#### Environment

- **Server:** AWS EC2 instance (Ubuntu 22.04 LTS)
- **Runtime:** Docker container
- **Database:** SQLite (in-container)

#### Deployment Flow

```
Developer Push
       ↓
GitHub Repository
       ↓
Pull to EC2 Instance
       ↓
Build Docker Image
       ↓
Run Container
       ↓
Flask API Live
```

#### Deployment Steps

1. **SSH into EC2 instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. **Clone repository:**
```bash
git clone https://github.com/ImTusharr/instant-mechanic-dashboard.git
cd instant-mechanic-dashboard/backend
```

3. **Build & run Docker:**
```bash
docker build -t instant-mechanic-api .
docker run -d -p 5000:5000 --name mechanic-api instant-mechanic-api
```

4. **Configure Security Group:**
   - Allow inbound traffic on port 5000
   - Restrict to Vercel IP range if possible

---

### ▲ Frontend Deployment — Vercel

#### Environment

- **Hosting:** Vercel global CDN
- **Framework:** React + Vite
- **API Routing:** Vercel reverse proxy

#### Configuration File: `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "http://your-ec2-ip:5000/api/$1"
    }
  ]
}
```

#### Deployment Steps

1. **Connect GitHub repository to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import project from GitHub
   - Authorize and connect

2. **Configure Environment:**
   - Add `VITE_API_BASE_URL=/api` to Vercel project settings
   - Update `vercel.json` with actual EC2 IP

3. **Deploy:**
   - Push to main branch
   - Vercel auto-deploys on push

#### API Routing Example

```
Browser Request
    ↓
https://your-app.vercel.app/api/dashboard/overview
    ↓
Vercel Proxy (via vercel.json)
    ↓
http://your-ec2-ip:5000/api/dashboard/overview
    ↓
Flask Backend
    ↓
Response back to Browser
```

---

## 🔒 Security Considerations

✅ **Best Practices Implemented:**

- ✔️ Environment variables for sensitive configuration
- ✔️ `.env` files excluded from version control
- ✔️ API requests routed through Vercel proxy (HTTPS)
- ✔️ Backend containerized with Docker
- ✔️ AWS Security Group restricts port access
- ✔️ CORS configured for frontend domain
- ✔️ Database backup strategies recommended

⚠️ **Security Checklist:**

- [ ] Update EC2 Security Group rules
- [ ] Use HTTPS for all API calls
- [ ] Rotate AWS credentials regularly
- [ ] Enable EC2 CloudWatch monitoring
- [ ] Configure VPC security groups
- [ ] Use secrets management for credentials
- [ ] Enable API rate limiting (production)
- [ ] Implement authentication (future)

---

## 🐛 Troubleshooting

### Frontend Issues

#### **Problem:** Frontend not connecting to backend

**Solution:**
```bash
# 1. Check .env file
cat frontend/.env

# 2. Verify VITE_API_BASE_URL
# For local: http://localhost:5000/api
# For production: /api

# 3. Check backend is running
curl http://localhost:5000/api/dashboard/overview
```

#### **Problem:** CORS error in browser console

**Solution:**
```python
# backend/app.py - Add CORS support
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
```

#### **Problem:** npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Backend Issues

#### **Problem:** Backend won't start (Port already in use)

**Solution:**
```bash
# Check what's using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 python app.py
```

#### **Problem:** Database connection error

**Solution:**
```bash
# Verify database file exists
ls -la backend/instance/mechanic.db

# Reset database
rm backend/instance/mechanic.db
python backend/app.py  # Recreates database
```

#### **Problem:** Import errors in Flask

**Solution:**
```bash
# Verify virtual environment is activated
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

---

### Docker Issues

#### **Problem:** Docker image build fails

**Solution:**
```bash
# Check Python version
docker run python:3.9 --version

# Build with verbose output
docker build -t instant-mechanic-api . --progress=plain
```

#### **Problem:** Container exits immediately

**Solution:**
```bash
# View container logs
docker logs mechanic-api

# Run interactive shell
docker run -it instant-mechanic-api /bin/bash
```

---

## 🧪 Testing

Before deployment, verify:

### Backend Tests
- [ ] Flask server starts without errors
- [ ] Database connection works
- [ ] All API endpoints respond with correct data
- [ ] SSE stream connects and sends events
- [ ] Environment variables load correctly

### Frontend Tests
- [ ] React app builds successfully (`npm run build`)
- [ ] Dashboard loads without errors
- [ ] KPI cards display correct metrics
- [ ] Booking table shows paginated data
- [ ] Real-time updates work (SSE connection)
- [ ] Responsive design works on mobile

### Integration Tests
- [ ] Frontend connects to backend API
- [ ] API proxy rewrites work in production
- [ ] Database persists data correctly
- [ ] Docker container runs without errors
- [ ] EC2 deployment accessible via public IP

### Performance Tests
- [ ] Dashboard loads in < 2 seconds
- [ ] API responses < 500ms
- [ ] Real-time updates latency < 1 second
- [ ] Mobile experience is smooth

---

## 🤖 AI Usage

AI tools (**ChatGPT**, **Gemini**) were used as development assistants:

### Architecture & Planning
- ✅ Designing frontend/backend architecture
- ✅ Planning Vercel-to-EC2 API proxy flow
- ✅ Solving HTTPS-to-HTTP mixed-content issues

### Development & Debugging
- ✅ Troubleshooting integration issues
- ✅ Debugging API communication problems
- ✅ Reviewing implementation approaches
- ✅ Identifying configuration issues

### UI/UX Design
- ✅ Refining Tailwind CSS utility classes
- ✅ Improving dashboard layouts
- ✅ Enhancing responsive design
- ✅ Perfecting glassmorphism styling
- ✅ Improving visual hierarchy

### Documentation
- ✅ Organizing API documentation
- ✅ Structuring deployment instructions
- ✅ Improving README clarity
- ✅ Reviewing setup instructions

**Note:** AI was used as a development assistance tool. Project implementation, integration, testing, and deployment were performed during the development process.

---

## 📋 Project Requirements Checklist

- [x] Project Overview (What & Why)
- [x] Complete Tech Stack
- [x] Architecture Diagram & Data Flow
- [x] Local Setup Instructions
- [x] Environment Variables Documentation
- [x] Comprehensive API Documentation
- [x] Deployment Strategy (Backend & Frontend)
- [x] Security Considerations
- [x] AI Usage Disclosure
- [x] Testing Guidelines
- [x] Troubleshooting Guide
- [x] Professional README Structure
- [x] Quick Stats Table
- [x] Prerequisites Section
- [x] Table of Contents

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please ensure your code follows the existing style and includes tests.

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🌐 Important URLs

### Local Development

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| API Base | http://localhost:5000/api |

### Production

| Service | URL |
|---------|-----|
| Live Frontend Dashboard (Vercel) | [https://instant-mechanic-dashboard-mu.vercel.app](https://instant-mechanic-dashboard-mu.vercel.app) |
| Backend REST API (AWS EC2)| [http://16.171.139.19:5000/api/dashboard/overview](http://16.171.139.19:5000/api/dashboard/overview) |
| GitHub Repository| [https://github.com/ImTusharr/instant-mechanic-dashboard](https://github.com/ImTusharr/instant-mechanic-dashboard)|

---

## 💬 Getting Help

- **Issues:** [Report bugs on GitHub](https://github.com/ImTusharr/instant-mechanic-dashboard/issues)
- **Discussions:** [Start a discussion](https://github.com/ImTusharr/instant-mechanic-dashboard/discussions)
- **Documentation:** Check the [API Documentation](#-api-documentation) section

---

## 👨‍💻 About

**Instant Mechanic — Operations Command Center**

A full-stack real-time operations dashboard showcasing modern web development practices with React, Flask, SQLite, Docker, AWS EC2, and Vercel.

**Built with ❤️ by [ImTusharr](https://github.com/ImTusharr)**

---

<div align="center">

### ⭐ If you found this helpful, please consider giving it a star!

**[⬆ Back to top](#-instant-mechanic--operations-command-center)**

</div>
