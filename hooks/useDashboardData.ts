// hooks/useDashboardData.ts

import { useState, useEffect } from 'react';
import api from '../lib/api'; // Import the configured Axios instance
import { DashboardData } from '../types/dashboard';

const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchDashboardData = async () => {
      try {
        const response = await api.get<DashboardData>('/dashboard');
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    // Set interval to fetch data every minute (60000 ms)
    interval = setInterval(() => {
      fetchDashboardData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { data, isLoading, error };
};

export default useDashboardData;
