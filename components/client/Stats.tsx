// components/client/Stats.tsx

import React from 'react';
import SectionTitle from '../SectionTitle';
import StatCard from '../StatCard';
import type { Stats as StatsType } from '../../types/clientDashboard';

interface StatsProps {
  data: StatsType;
}

const Stats: React.FC<StatsProps> = ({ data }) => {
  const statsEntries = [
    { title: 'Total Views', value: data.totalViews },
    { title: 'Total Leads', value: data.totalLeads },
    { title: 'Leads Today', value: data.leadsToday },
  ];

  return (
    <div className="my-8">
      <SectionTitle title="Statistics" subtitle="Key performance indicators." />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {statsEntries.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            // Optional: Add icons or colors based on stat type
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
