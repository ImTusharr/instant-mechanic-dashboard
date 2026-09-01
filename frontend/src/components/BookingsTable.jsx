import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { updateBookingStatus } from '../services/api';

const STATUS_BADGES = {
  'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'Assigned': 'bg-blue-50 text-blue-700 border-blue-200',
  'Mechanic On The Way': 'bg-purple-50 text-purple-700 border-purple-200',
  'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200'
};

export default function BookingsTable({ data, onFilterChange, onStatusUpdated, loading }) {
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdatingId(bookingId);
    try {
      await updateBookingStatus(bookingId, newStatus);
      if (onStatusUpdated) onStatusUpdated();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Controls Bar */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search ID, customer, vehicle..."
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange({ status: e.target.value, page: 1 })}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="Mechanic On The Way">Mechanic On The Way</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Mechanic</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {loading ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-slate-400">Loading bookings data...</td>
              </tr>
            ) : data.bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-slate-400">No bookings match your filter query.</td>
              </tr>
            ) : (
              data.bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-blue-600">{booking.id}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{booking.customer_name}</td>
                  <td className="py-3 px-4 text-slate-600">{booking.vehicle_details}</td>
                  <td className="py-3 px-4 text-slate-600">{booking.service_title}</td>
                  <td className="py-3 px-4 text-slate-600">{booking.mechanic_name}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">${booking.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_BADGES[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      disabled={updatingId === booking.id}
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Mechanic On The Way">Mechanic On The Way</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600">
        <div>
          Page <span className="font-semibold text-slate-900">{data.current_page}</span> of <span className="font-semibold text-slate-900">{data.pages}</span> ({data.total} total bookings)
        </div>
        <div className="flex gap-2">
          <button
            disabled={data.current_page <= 1}
            onClick={() => onFilterChange({ page: data.current_page - 1 })}
            className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            disabled={data.current_page >= data.pages}
            onClick={() => onFilterChange({ page: data.current_page + 1 })}
            className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}