import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://16.171.139.19:5000/api';

export default function App() {
  const [metrics, setMetrics] = useState({
    active_mechanics: 16,
    cancelled_bookings: 27,
    completed_bookings: 374,
    new_customers: 33,
    pending_bookings: 56,
    todays_bookings: 71,
    total_bookings: 550,
    total_revenue: 102709.22,
  });
  const [isLive, setIsLive] = useState(true);

  // Fetch overview data from backend API
  useEffect(() => {
    fetch(`${API_BASE_URL}/dashboard/overview`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setMetrics(data);
      })
      .catch((err) => console.log("Using cached/fallback metrics", err));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-zinc-950/80 to-zinc-950 pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Instant Mechanic</h1>
                <p className="text-xs sm:text-sm text-zinc-400">Real-Time Operations & Dispatch Command Center</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium">
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-zinc-300">{isLive ? 'Live System Streaming' : 'Polling Sync'}</span>
            </span>
          </div>
        </header>

        {/* 4 Core KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard
            title="Total Revenue"
            value={`$${Number(metrics.total_revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subtitle="Lifetime Earnings"
            badge="+12.4%"
            badgeColor="emerald"
            icon={
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <KpiCard
            title="Total Bookings"
            value={metrics.total_bookings}
            subtitle={`${metrics.todays_bookings} Booked Today`}
            badge="Active"
            badgeColor="blue"
            icon={
              <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          <KpiCard
            title="Completed Jobs"
            value={metrics.completed_bookings}
            subtitle={`${metrics.pending_bookings} Currently Pending`}
            badge="68% Rate"
            badgeColor="emerald"
            icon={
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <KpiCard
            title="Active Mechanics"
            value={metrics.active_mechanics}
            subtitle="On Road & Available"
            badge="Deployable"
            badgeColor="purple"
            icon={
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>

        {/* Secondary Metrics & Quick Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Breakdown Panel */}
          <div className="lg:col-span-2 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white mb-4">Operations Status Distribution</h2>
            <div className="space-y-4">
              <StatusProgressBar label="Completed Services" count={metrics.completed_bookings} total={metrics.total_bookings} color="bg-emerald-500" />
              <StatusProgressBar label="Pending Dispatch" count={metrics.pending_bookings} total={metrics.total_bookings} color="bg-amber-500" />
              <StatusProgressBar label="Cancelled Requests" count={metrics.cancelled_bookings} total={metrics.total_bookings} color="bg-rose-500" />
            </div>
          </div>

          {/* Customer Overview Panel */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Customer Acquisition</h2>
              <p className="text-xs text-zinc-400">Recent onboarding activity</p>
            </div>
            
            <div className="my-6 text-center">
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                +{metrics.new_customers}
              </span>
              <p className="text-sm font-medium text-zinc-400 mt-2">New Registrations This Month</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 flex justify-between items-center">
              <span>Avg Repair Ticket</span>
              <span className="font-semibold text-zinc-200">
                ${metrics.total_bookings ? (metrics.total_revenue / metrics.total_bookings).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* Helper Component for KPI Cards */
function KpiCard({ title, value, subtitle, badge, badgeColor, icon }) {
  const badgeClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-md hover:border-zinc-700/80 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">{title}</span>
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">{icon}</div>
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-extrabold tracking-tight text-white">{value}</h3>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-zinc-500">{subtitle}</span>
          {badge && (
            <span className={`px-2 py-0.5 rounded-md border font-medium ${badgeClasses[badgeColor] || badgeClasses.blue}`}>
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* Helper Component for Progress Bars */
function StatusProgressBar({ label, count, total, color }) {
  const percentage = total ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-center text-sm mb-1.5">
        <span className="text-zinc-300 font-medium">{label}</span>
        <span className="text-zinc-400 text-xs">
          <strong className="text-zinc-200">{count}</strong> ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800/50">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}