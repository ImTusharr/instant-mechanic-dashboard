import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDashboardOverview = async () => {
  const res = await api.get('/dashboard/overview');
  return res.data;
};

export const fetchDashboardAnalytics = async () => {
  const res = await api.get('/dashboard/analytics');
  return res.data;
};

export const fetchBookings = async (params) => {
  const res = await api.get('/bookings', { params });
  return res.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const res = await api.patch(`/bookings/${bookingId}/status`, { status });
  return res.data;
};

export const fetchMechanics = async () => {
  const res = await api.get('/mechanics');
  return res.data;
};

// Real-Time Server-Sent Events (SSE) Listener
export const subscribeToLiveUpdates = (onMessageCallback) => {
  const eventSource = new EventSource(`${API_BASE_URL}/stream`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessageCallback(data);
    } catch (err) {
      console.error('SSE Parsing error:', err);
    }
  };

  eventSource.onerror = (err) => {
    console.error('SSE Connection Error:', err);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
};