import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import useSWR from 'swr';

interface DashboardData {
  youtubeViews: number;
  youtubeViewsGrowth: number;
  youtubeWatchTime: number;
  youtubeWatchTimeGrowth: number;
  youtubeSubscribers: number;
  youtubeSubscribersGrowth: number;
  youtubeAvgViewDuration: number;
  youtubeAvgViewGrowth: number;
  youtubeEngagementRate: number;
  youtubeEngagementGrowth: number;
  youtubeNewVideos: number;
  youtubeNewVideosGrowth: number;
  chartData: {
    labels: string[];
    views: number[];
    watchTime: number[];
    subscribers: number[];
    duration: number[];
    engagement: number[];
    videos: number[];
  };
}

interface Metric {
  label: string;
  value: string;
  change?: {
    value: string;
    trend: 'up' | 'down';
  };
  chartData?: {
    labels: string[];
    data: number[];
  };
}

interface PlatformMetricsProps {
  platform: string;
  metrics: Metric[];
  icon?: React.ReactNode;
  color?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const formatWatchTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  return `${hours}K min`;
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const PlatformMetrics: React.FC<PlatformMetricsProps> = ({ 
  platform, 
  metrics,
  icon,
  color = '#4bc0c0'
}) => {
  const { data, error } = useSWR<DashboardData>(
    platform.toLowerCase() === 'youtube' ? '/api/dashboard/youtube-metrics' : null,
    fetcher,
    { refreshInterval: 60000 }
  );

  console.log('Raw API Response:', data);

  if (error) {
    console.error(`Error fetching ${platform} metrics:`, error);
    return <div>Error loading metrics</div>;
  }
  
  if (platform.toLowerCase() === 'youtube' && !data) {
    return <div>Loading...</div>;
  }

  const displayMetrics = platform.toLowerCase() === 'youtube' && data ? [
    {
      label: "Video Views",
      value: `${(data?.youtubeViews / 1000).toFixed(1)}K`,
      change: { 
        value: `${data?.youtubeViewsGrowth?.toFixed(1) || '0'}%`, 
        trend: (data?.youtubeViewsGrowth || 0) >= 0 ? 'up' as const : 'down' as const 
      },
      chartData: {
        labels: data?.chartData?.labels || [],
        data: data?.chartData?.views || []
      }
    },
    {
      label: "Watch Time",
      value: formatWatchTime(data?.youtubeWatchTime || 0),
      change: { 
        value: `${data?.youtubeWatchTimeGrowth?.toFixed(1) || '0'}%`, 
        trend: (data?.youtubeWatchTimeGrowth || 0) >= 0 ? 'up' as const : 'down' as const 
      },
      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [45, 55, 50, 65, 63, 75, 80]
      }
    },
    {
      label: "Subscribers",
      value: `${(data?.youtubeSubscribers / 1000).toFixed(1)}K`,
      change: { 
        value: `${data?.youtubeSubscribersGrowth?.toFixed(1) || '0'}%`, 
        trend: (data?.youtubeSubscribersGrowth || 0) >= 0 ? 'up' as const : 'down' as const 
      },
      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [50, 60, 55, 70, 68, 80, 90]
      }
    },
    {
      label: "Avg. View Duration",
      value: formatDuration(data?.youtubeAvgViewDuration || 0),
      change: { 
        value: `${data?.youtubeAvgViewGrowth?.toFixed(1) || '0'}%`, 
        trend: (data?.youtubeAvgViewGrowth || 0) >= 0 ? 'up' as const : 'down' as const 
      },
      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [2, 3, 2.5, 4, 3.8, 5, 6]
      }
    },
    {
      label: "Engagement Rate",
      value: `${(data?.youtubeEngagementRate || 0).toFixed(1)}%`,
      change: { 
        value: `${data?.youtubeEngagementGrowth?.toFixed(1) || '0'}%`, 
        trend: (data?.youtubeEngagementGrowth || 0) >= 0 ? 'up' as const : 'down' as const 
      },
      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [10, 12, 11, 15, 14, 18, 20]
      }
    },
    {
      label: "New Videos",
      value: (data?.youtubeNewVideos || 0).toString(),
      change: { 
        value: `${data?.youtubeNewVideosGrowth?.toFixed(1) || 0}%`, 
        trend: (data?.youtubeNewVideosGrowth || 0) >= 0 ? 'up' as const : 'down' as const 
      },
      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [1, 2, 1.5, 3, 2.8, 4, 5]
      }
    }
  ] : metrics;

  console.log('Chart Data:', data?.chartData);

  return (
    <div className="flex flex-col gap-4 rounded-xl p-6 border border-[#3b4954] bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-opacity-20" style={{ backgroundColor: `${color}20` }}>
              <div className="w-full h-full flex items-center justify-center">
                {icon}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-white text-xl font-semibold">{platform}</h3>
            <p className="text-[#9cacba] text-sm">Platform Analytics</p>
          </div>
        </div>
        <button className="px-4 py-2 text-sm text-white bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {displayMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="flex flex-col p-4 bg-[#2a2a2a] rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[#9cacba] text-sm font-medium">{metric.label}</span>
              {metric.change && (
                <div className={`flex items-center gap-1 text-xs ${
                  metric.change.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change.trend === 'up' ? (
                    <ArrowUpIcon className="w-3 h-3" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3" />
                  )}
                  <span>{metric.change.value}</span>
                </div>
              )}
            </div>
            
            <span className="text-white text-lg font-bold mb-3">{metric.value}</span>
            
            {metric.chartData && (
              <div className="h-12 mt-auto">
                <Line
                  data={{
                    labels: metric.chartData.labels,
                    datasets: [
                      {
                        data: metric.chartData.data,
                        borderColor: color,
                        backgroundColor: `${color}20`,
                        fill: true,
                        tension: 0.4
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                      x: { display: false, grid: { display: false } },
                      y: { display: false, grid: { display: false } }
                    },
                    elements: { point: { radius: 0 } }
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformMetrics; 