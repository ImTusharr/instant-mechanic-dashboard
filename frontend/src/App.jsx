import React, { useEffect, useState, useCallback } from 'react';
import { Wrench, Radio } from 'lucide-react';
import MetricCards from './components/MetricCards';
import AnalyticsCharts from './components/AnalyticsCharts';
import BookingsTable from './components/BookingsTable';
import MechanicsGrid from './components/MechanicsGrid';
import { 
  fetchDashboardOverview, 
  fetchDashboardAnalytics, 
  fetchBookings, 
  fetchMechanics,
  subscribeToLiveUpdates 
} from './services/api';

export default function App() {
  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [bookingsData, setBookingsData] = useState({ bookings: [], total: 0, pages: 1, current_page: 1 });
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: 'All'
  });

  const loadData = useCallback(async () => {
    try {
      const [ov, an, me] = await Promise.all([
        fetchDashboardOverview(),
        fetchDashboardAnalytics(),
        fetchMechanics()
      ]);
      setOverview(ov);
      setAnalytics(an);
      setMechanics(me);
    } catch (err) {
      console.error("Error loading dashboard data", err);
    }
  }, []);

  const loadBookingsData = useCallback(async () => {
    setLoadingBookings(true);
    try {
      const bk = await fetchBookings(filters);
      setBookingsData(bk);
    } catch (err) {
      console.error("Error loading bookings", err);
    } finally {
      setLoadingBookings(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadBookingsData();
  }, [loadBookingsData]);

  // Connect to SSE Real-time Feed[cite: 1]
  useEffect(() => {
    const unsubscribe = subscribeToLiveUpdates((eventData) => {
      setIsLive(true);
      if (eventData.event === 'booking_updated') {
        loadData();
        loadBookingsData();
      }
    });
    return () => unsubscribe();
  }, [loadData, loadBookingsData]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Instant Mechanic</h1>
              <p className="text-xs text-slate-500 font-medium">Live Operations Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200">
            <Radio className="w-4 h-4 animate-pulse text-emerald-600" />
            <span>SSE Real-Time Active</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        <MetricCards overview={overview} />
        <AnalyticsCharts analytics={analytics} />
        <MechanicsGrid mechanics={mechanics} />
        <BookingsTable 
          data={bookingsData} 
          onFilterChange={handleFilterChange} 
          onStatusUpdated={() => { loadData(); loadBookingsData(); }}
          loading={loadingBookings}
        />
      </main>
    </div>
  );
}