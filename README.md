# Instant Mechanic — Live Operations Dashboard

A modern, real-time Live Vehicle Service Operations Dashboard designed for operations teams to monitor bookings, mechanic status, customer analytics, and revenue metrics in real-time.

---

## Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Recharts, Lucide Icons, Axios.
* **Backend:** Python (Flask), SQLAlchemy ORM, Gunicorn, Server-Sent Events (SSE).
* **Database:** SQLite (SQLAlchemy ORM for cross-database compatibility).
* **Deployment:** Vercel (Frontend), AWS EC2 / Docker (Backend).

---

## Architecture Flow

```text
[ React + Tailwind Frontend ]
          │
          ├─► REST API (HTTP) ──────► [ Flask Backend ] ──► [ SQLAlchemy ORM / DB ]
          │                                  │
          └─► Real-Time SSE Stream (GET) ────┘ (Pushes live status updates)