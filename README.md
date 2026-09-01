🛠️ Instant Mechanic — Operations Command Center

A dynamic, real-time operations dashboard built to streamline vehicle repair request tracking, mechanic fleet dispatching, customer acquisition analytics, and revenue management.

📖 Project Overview

What We Built

Instant Mechanic — Operations Command Center is a Single-Page Application (SPA) designed to provide a centralized view of mechanic operations.

The dashboard dynamically displays important operational information such as:

Total Revenue

Lifetime Bookings

Completed Bookings

Pending Bookings

Cancelled Bookings

Active Mechanics

New Customers

Booking Status Distribution

Paginated Booking History

Real-time Dispatch Updates

The application retrieves data from the backend API and calculates dashboard metrics dynamically from database records.

Why We Built It

Traditional mechanic operations may depend on static records, spreadsheets, or manually refreshed dashboards. This can make it difficult to monitor bookings, mechanic availability, and revenue in real time.

The purpose of this project is to provide a centralized operations command center where important business information can be viewed through an interactive dashboard.

The system combines a React frontend, Flask backend, SQLite database, and Server-Sent Events (SSE) to provide dynamic data and real-time operational updates.

🛠️ Tech Stack

Frontend

React

Vite

Tailwind CSS

JavaScript

Server-Sent Events (SSE) Client

Responsive UI

Glassmorphism-based dark dashboard design

Backend

Python

Flask

Flask-SQLAlchemy

REST API

Server-Sent Events (SSE)

Database

SQLite

Flask-SQLAlchemy ORM

Pre-seeded historical operational records

Infrastructure

Docker

AWS EC2

Ubuntu 22.04 LTS

Vercel

Development Tools

Git

GitHub

npm

Python Virtual Environment

Docker Engine

🏗️ Architecture

The application follows a simple:

Frontend → API → Backend → Database

architecture.

                    ┌─────────────────────────┐
                    │      React Frontend     │
                    │       Vite + Tailwind   │
                    │      Hosted on Vercel   │
                    └────────────┬────────────┘
                                 │
                                 │ HTTPS
                                 ▼
                    ┌─────────────────────────┐
                    │     Vercel API Proxy    │
                    │      /api/* Rewrite     │
                    └────────────┬────────────┘
                                 │
                                 │ HTTP Request
                                 ▼
                    ┌─────────────────────────┐
                    │      Flask Backend      │
                    │       REST API + SSE    │
                    │      Docker / EC2       │
                    └────────────┬────────────┘
                                 │
                                 │ SQL / ORM
                                 ▼
                    ┌─────────────────────────┐
                    │       SQLite DB         │
                    │   Historical Records    │
                    └─────────────────────────┘

🔄 Data Flow

1. Frontend

The React application loads the dashboard and sends asynchronous API requests to the backend.

For example:

GET /api/dashboard/overview

The frontend receives the JSON response and updates the dashboard KPIs dynamically.

2. API Proxy

In production, the frontend uses the /api path.

Vercel rewrites these requests and forwards them to the Flask backend running on AWS EC2.

This allows the frontend to communicate through HTTPS without directly making browser requests from HTTPS to an HTTP backend.

3. Backend

The Flask backend receives API requests and performs the required database operations.

Flask-SQLAlchemy is used to interact with the SQLite database.

The backend calculates operational metrics such as:

Revenue

Booking counts

Booking statuses

Active mechanics

New customers

The resulting information is returned to the frontend as JSON.

4. Database

SQLite stores the operational data required by the application.

The database contains records related to:

Customers

Bookings

Repair statuses

Mechanics

Revenue information

Historical operational records

5. Real-Time Updates

The backend also provides a Server-Sent Events endpoint:

GET /api/stream

The frontend can establish an SSE connection and receive operational updates without requiring a complete page refresh.

✨ Main Features

📊 Dynamic Dashboard KPIs

The dashboard dynamically displays important operational metrics including:

Total Revenue

Total Bookings

Completed Bookings

Pending Bookings

Cancelled Bookings

Active Mechanics

New Customers

These values are retrieved from the backend instead of being hard-coded in the frontend.

📈 Booking Status Distribution

The dashboard provides a visual representation of booking statuses.

Example statuses include:

Completed
Pending
Cancelled

The values are calculated from the database records.

📋 Booking History

The dashboard includes a booking history section that displays repair requests.

Each booking can contain information such as:

Booking ID

Customer

Booking Status

Amount

The booking list supports pagination so that large numbers of records can be displayed efficiently.

🚗 Mechanic Fleet Information

The dashboard provides information about mechanic availability and active mechanics.

This allows operations teams to quickly understand the current mechanic fleet status.

⚡ Real-Time Event Streaming

The application uses Server-Sent Events (SSE) to support real-time updates.

The frontend connects to:

GET /api/stream

The backend maintains the event stream and can send operational updates to connected clients.

🌙 Dashboard UI

The frontend uses a dark operations-center style interface with:

Tailwind CSS

Glassmorphism elements

Zinc-based dark surfaces

Amber highlights

Responsive layouts

KPI cards

Status indicators

Data tables

Interactive dashboard components

📁 Project Structure

A simplified project structure is shown below:

instant-mechanic-dashboard/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env
│   └── instance/
│       └── mechanic.db
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── ...
│
├── vercel.json
├── README.md
└── .gitignore

The exact file structure may differ depending on the final implementation.

💻 Local Setup

Follow the steps below to run the project locally.

1. Clone the Repository

git clone https://github.com/<YOUR_GITHUB_USERNAME>/instant-mechanic-dashboard.git

Move into the project directory:

cd instant-mechanic-dashboard

🐍 Backend Setup

Open a terminal and move to the backend directory:

cd backend

2. Create a Python Virtual Environment

python -m venv venv

Windows PowerShell

venv\Scripts\activate

macOS / Linux

source venv/bin/activate

3. Install Backend Dependencies

pip install -r requirements.txt

4. Configure Backend Environment

Create a .env file inside the backend directory.

Example:

PORT=5000
FLASK_ENV=development
DATABASE_URL=sqlite:///instance/mechanic.db

5. Start the Backend

python app.py

The backend should now be available at:

http://localhost:5000

⚛️ Frontend Setup

Open another terminal.

From the project root:

cd frontend

6. Install Frontend Dependencies

npm install

7. Configure Frontend Environment

Create a .env file inside the frontend directory.

For local development:

VITE_API_BASE_URL=http://localhost:5000/api

If the project is configured to use a local Vite proxy, the value can instead be:

VITE_API_BASE_URL=/api

8. Start the Frontend

npm run dev

The Vite development server will normally be available at:

http://localhost:5173

Open the URL in your browser to access the dashboard.

🐳 Running the Backend with Docker

The backend can also be run using Docker.

Navigate to the backend directory:

cd backend

Build the Docker image:

docker build -t instant-mechanic-api .

Run the container:

docker run -d \
  -p 5000:5000 \
  --name mechanic-api \
  instant-mechanic-api

The Flask API will then be accessible at:

http://localhost:5000

🔐 Environment Variables

Backend

Create:

backend/.env

Variable

Required

Default

Description

PORT

No

5000

Port on which the Flask server runs

FLASK_ENV

No

production

Flask runtime environment

DATABASE_URL

No

sqlite:///instance/mechanic.db

Database connection string

Example:

PORT=5000
FLASK_ENV=production
DATABASE_URL=sqlite:///instance/mechanic.db

Frontend

Create:

frontend/.env

Variable

Required

Default

Description

VITE_API_BASE_URL

Yes

/api

Base URL/path used by frontend API requests

Example for production:

VITE_API_BASE_URL=/api

Example for local development:

VITE_API_BASE_URL=http://localhost:5000/api

Do not commit .env files containing sensitive configuration or credentials to GitHub.

📡 API Documentation

Base API URL

Local

http://localhost:5000/api

Production

/api

The production frontend uses the Vercel reverse proxy to forward API requests to the backend running on AWS EC2.

1. Dashboard Overview

Endpoint

GET /api/dashboard/overview

Description

Returns the main operational dashboard metrics.

Example Response

{
  "total_revenue": 102709.22,
  "total_bookings": 550,
  "completed_bookings": 374,
  "pending_bookings": 56,
  "cancelled_bookings": 27,
  "active_mechanics": 16,
  "new_customers": 33
}

2. Bookings

Endpoint

GET /api/bookings

Description

Returns repair booking records used by the booking history section.

Example Response

[
  {
    "id": 1,
    "customer": "John Doe",
    "status": "completed",
    "amount": 150.00
  }
]

The endpoint can be used by the frontend to populate the booking history table.

3. Real-Time Stream

Endpoint

GET /api/stream

Description

Creates a Server-Sent Events connection for real-time operational or dispatch updates.

Response Type

text/event-stream

The frontend can listen to the stream and update the dashboard when new events are received.

🚀 Deployment

The project uses separate hosting environments for the frontend and backend.

Frontend → Vercel
Backend  → AWS EC2
Database → SQLite
Backend Runtime → Docker

☁️ Backend Deployment — AWS EC2

The Flask backend is containerized using Docker and deployed to an AWS EC2 instance.

Deployment Environment

AWS EC2

Ubuntu 22.04 LTS

Docker Engine

Flask API

SQLite database

General Deployment Flow

Developer
    │
    ▼
GitHub Repository
    │
    ▼
AWS EC2
    │
    ▼
Docker Image
    │
    ▼
Flask Container
    │
    ▼
SQLite Database

The EC2 security configuration allows the required application traffic to reach the backend.

▲ Frontend Deployment — Vercel

The React/Vite frontend is deployed using Vercel.

The frontend is configured to use /api for API requests.

Vercel rewrites these requests to the backend API running on AWS EC2.

Example:

Browser
   │
   │ HTTPS
   ▼
Vercel
   │
   │ /api/*
   ▼
AWS EC2
   │
   ▼
Flask API

This reverse-proxy approach allows the frontend to communicate through the Vercel domain instead of directly making browser requests from HTTPS to an HTTP backend.

🔁 Vercel API Rewrite

The project uses a vercel.json configuration for API routing.

Conceptually, requests follow:

/api/*
      ↓
AWS EC2 Backend
      ↓
/api/*

The actual EC2 address should be configured according to the deployment environment rather than committed as a sensitive or changeable value.

🔒 Security Considerations

The project follows several basic deployment practices:

Environment variables are used for configurable values.

.env files should not be committed to the repository.

API requests are routed through the Vercel /api path in production.

The backend is containerized using Docker.

AWS Security Group rules should expose only the ports required by the application.

Production credentials and private configuration should remain outside the source repository.

🤖 AI Usage

AI tools such as ChatGPT and Gemini were used as development assistants during the project.

AI assistance was mainly used for:

Architecture

Understanding and structuring the frontend/backend architecture.

Designing the Vercel-to-EC2 API proxy flow.

Working through HTTPS-to-HTTP mixed-content issues.

Development & Debugging

Troubleshooting frontend and backend integration issues.

Debugging API communication.

Reviewing implementation approaches.

Identifying configuration issues.

UI/UX

Refining Tailwind CSS utility classes.

Improving dashboard layouts.

Improving responsive design.

Refining glassmorphism and dark-mode styling.

Improving visual hierarchy of dashboard components.

Documentation

Organizing API documentation.

Structuring Docker deployment instructions.

Improving README documentation.

Reviewing project configuration and setup instructions.

AI was used as a development assistance and problem-solving tool. The project implementation, integration, testing, and deployment were performed as part of the project development process.

🧪 Testing

Before deployment, the application should be tested for:

Backend API availability

Frontend-to-backend communication

Dashboard KPI calculations

Booking data retrieval

Pagination

SSE connection

Database connectivity

Docker container startup

Production API proxying

Responsive dashboard behavior

🚀 Production Deployment Links

Live Frontend Dashboard (Vercel): https://<YOUR_VERCEL_APP_URL>.vercel.app

Backend REST API (AWS EC2): http://<YOUR_EC2_PUBLIC_IP>:5000/api/dashboard/overview

GitHub Repository: https://github.com/<YOUR_GITHUB_USERNAME>/instant-mechanic-dashboard

Replace the placeholder values with your actual Vercel URL, EC2 public IP, and GitHub repository URL before submitting the project.

📌 Important URLs

Local Frontend

http://localhost:5173

Local Backend

http://localhost:5000

API Base

http://localhost:5000/api

Production Frontend

https://<YOUR_VERCEL_DOMAIN>

Production Backend

http://<YOUR_EC2_PUBLIC_IP>:5000

Replace the placeholder values with the actual deployment URLs before submitting the repository.

📋 Project Requirements Checklist

The README includes all required sections:

Project Overview

What was built

Why it was built

Tech Stack

Frontend

Backend

Database

Infrastructure

Architecture

Data Flow

Local Setup

Environment Variables

API Documentation

Deployment

AI Usage

👨‍💻 Project

Instant Mechanic — Operations Command Center

A full-stack real-time operations dashboard built using React, Flask, SQLite, Docker, AWS EC2, and Vercel.
