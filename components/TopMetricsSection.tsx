import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import useSWR from 'swr';
import { formatNumber } from '../utils/formatters';

interface Metric {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down';
  };
}

interface DashboardData {
  engagementRate: number;
  newUsers: number;
  pageviews: number;
  trends?: {
    engagementRate: { value: string; trend: 'up' | 'down' };
    newUsers: { value: string; trend: 'up' | 'down' };
    pageviews: { value: string; trend: 'up' | 'down' };
  };
}

const defaultTrend = { value: "0%", trend: "up" as const };

const TopMetricsCard: React.FC<Metric> = ({ title, value, change }) => (
  <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3b4954] bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a]">
    <p className="text-[#9cacba] text-sm font-medium leading-normal">{title}</p>
    <p className="text-white tracking-light text-2xl font-bold leading-tight">
      {typeof value === 'number' ? formatNumber(value) : value}
      {title.toLowerCase() === 'engagement rate' && '%'}
    </p>
    {change && (
      <div className={`flex items-center gap-1 text-sm ${
        change.trend === 'up' ? 'text-green-500' : 'text-red-500'
      }`}>
        {change.trend === 'up' ? (
          <ArrowUpIcon className="w-4 h-4" />
        ) : (
          <ArrowDownIcon className="w-4 h-4" />
        )}
        {change.value}
      </div>
    )}
  </div>
);

const fetcher = (url: string) => fetch(url).then(res => res.json());

const TopMetricsSection: React.FC = () => {
  const { data, error } = useSWR<DashboardData>('/api/dashboard/google-analytics', fetcher, {
    refreshInterval: 60000
  });

  console.log('Weekly Dashboard Data:', data);

  if (error) console.error('Error fetching metrics:', error);

  const metrics: Metric[] = [
    {
      title: "Engagement rate",
      value: data?.engagementRate?.toFixed(2) || '0',
      change: data?.trends?.engagementRate || defaultTrend
    },
    {
      title: "New Users",
      value: data?.newUsers || 0,
      change: data?.trends?.newUsers || defaultTrend
    },
    {
      title: "Page Views",
      value: data?.pageviews || 0,
      change: data?.trends?.pageviews || defaultTrend
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {metrics.map((metric, index) => (
        <TopMetricsCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default TopMetricsSection; 