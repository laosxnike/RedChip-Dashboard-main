import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

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

const PlatformMetrics: React.FC<PlatformMetricsProps> = ({ 
  platform, 
  metrics, 
  icon,
  color = '#4bc0c0'
}) => {
  const miniChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.4,
      },
    },
  };

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
        {metrics.map((metric, index) => (
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
                      },
                    ],
                  }}
                  options={miniChartOptions}
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