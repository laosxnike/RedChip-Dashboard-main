// components/ClientDashboard.tsx

import React from 'react';
import MetricCard from './MetricCard';
import Overview from './client/Overview';
import { ClientDashboardData, ClientDataDetails } from '../types/clientDashboard';

interface ClientDashboardProps {
  client: string;
  dashboardData: ClientDashboardData;
  clientDataDetails: ClientDataDetails;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ client, dashboardData, clientDataDetails }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
            {client} Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-8">
          <MetricCard title="Bounce Rate" value={dashboardData.bounceRate} unit="%" />
          <MetricCard title="CPA" value={dashboardData.CPA} unit="$" />
          <MetricCard title="Conversion Rate" value={dashboardData.conversionRate} unit="%" />
          <MetricCard title="CTR" value={dashboardData.CTR} unit="%" />
        </div>

        <Overview 
          dashboardData={dashboardData} 
          clientDataDetails={clientDataDetails} 
          client={client} 
        />
      </div>
    </div>
  );
};

export default ClientDashboard;
