import React from 'react';
import { Wrench, Calendar, CheckCircle2, Clock, XCircle, DollarSign, Users, UserPlus } from 'lucide-react';

export default function MetricCards({ overview }) {
  if (!overview) return <div className="animate-pulse h-24 bg-slate-200 rounded-xl"></div>;

  const cards = [
    { title: "Total Bookings", value: overview.total_bookings, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Today's Bookings", value: overview.todays_bookings, icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Completed", value: overview.completed_bookings, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Pending", value: overview.pending_bookings, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Cancelled", value: overview.cancelled_bookings, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Total Revenue", value: `$${overview.total_revenue?.toLocaleString()}`, icon: DollarSign, color: "text-teal-600", bg: "bg-teal-50" },
    { title: "Active Mechanics", value: overview.active_mechanics, icon: Wrench, color: "text-sky-600", bg: "bg-sky-50" },
    { title: "New Customers", value: overview.new_customers, icon: UserPlus, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${card.bg}`}>
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}