import useSWR from 'swr';
import { ClientDashboardData, ClientDataDetails } from '../types/clientDashboard';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch client data');
  }
  return response.json();
};

export function useClientData(clientId: string) {
  const { data, error, isLoading } = useSWR<{ dashboardData: ClientDashboardData; clientDataDetails: ClientDataDetails }>(
    `/api/clients/${clientId}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error
  };
}
