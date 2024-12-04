// lib/api.ts

import axios from 'axios';

// Determine if the code is running on the server or client
const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: '/api', // Use Next.js API routes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authentication headers on the client side
    if (!isServer) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global error responses here
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login page)
      console.log('Unauthorized access');
      if (!isServer) {
        // Redirect or handle in a client environment
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Fetch dashboard data
export const fetchDashboardData = async (): Promise<any> => {
  try {
    console.log('Fetching dashboard data from:', `${api.defaults.baseURL}/dashboard`);
    const response = await api.get('/dashboard');
    console.log('Dashboard data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    }
    throw error;
  }
};

// Fetch client data
export const fetchClientData = async (clientId: string): Promise<any> => {
  try {
    const response = await api.get(`/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for client ${clientId}:`, error);
    throw error;
  }
};

// Fetch Google Analytics data
export const fetchGoogleAnalyticsData = async (startDate: string, endDate: string): Promise<any> => {
  try {
    const response = await api.get('/dashboard/google-analytics', {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    throw error;
  }
};

// Fetch client-specific Google Analytics data
export const fetchClientGoogleAnalyticsData = async (
  clientId: string,
  startDate: string,
  endDate: string
): Promise<any> => {
  try {
    const response = await api.get(`/clients/${clientId}/google-analytics`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Google Analytics data for client ${clientId}:`, error);
    throw error;
  }
};

export default api;
