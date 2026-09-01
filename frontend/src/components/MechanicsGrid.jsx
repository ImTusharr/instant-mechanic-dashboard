import React from 'react';
import { Wrench, CheckCircle } from 'lucide-react';

const STATUS_INDICATOR = {
  'Available': 'bg-emerald-500',
  'On Job': 'bg-amber-500',
  'Offline': 'bg-slate-400'
};

export default function MechanicsGrid({ mechanics }) {
  if (!mechanics) return null;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Wrench className="w-5 h-5 text-blue-600" />
        Mechanics Fleet Status
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {mechanics.map((m) => (
          <div key={m.id} className="p-3 border border-slate-100 bg-slate-50 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-slate-800">{m.name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${STATUS_INDICATOR[m.status]}`} title={m.status}></span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {m.jobs_completed} jobs
              </span>
              <span className="font-medium text-slate-700">{m.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}