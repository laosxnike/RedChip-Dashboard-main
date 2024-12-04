// components/MetricsSection.tsx

import React from 'react';
import MetricCard from './MetricCard';

interface MetricsSectionProps {
  data: {
    engagementRate: number;
    dailyAverageNewFollowers: number;
    qrCodeEngagement: number;
    bounceRate: number;
    CPA: number;
    conversionRate: number;
    CTR: number;
    newUsers: number;
    returningUsers: number;
    sessions: number;
    users: number;
    pageviews: number;
    averageSessionDuration: number;
  };
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ data }) => {
  const metrics = [
    { title: 'Engagement Rate', value: data.engagementRate, unit: '%' },
    { title: 'Daily Avg. New Followers', value: data.dailyAverageNewFollowers },
    { title: 'QR Code Engagement', value: data.qrCodeEngagement },
    { title: 'Bounce Rate', value: data.bounceRate, unit: '%' },
    { title: 'CPA', value: data.CPA, unit: '$' },
    { title: 'Conversion Rate', value: data.conversionRate, unit: '%' },
    { title: 'CTR', value: data.CTR, unit: '%' },
    { title: 'New Users', value: data.newUsers },
    { title: 'Returning Users', value: data.returningUsers },
    { title: 'Sessions', value: data.sessions },
    { title: 'Users', value: data.users },
    { title: 'Pageviews', value: data.pageviews },
    { title: 'Avg. Session Duration', value: `${data.averageSessionDuration}s`, unit: 's' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} title={metric.title} value={metric.value} unit={metric.unit} />
      ))}
    </div>
  );
};

export default MetricsSection;
