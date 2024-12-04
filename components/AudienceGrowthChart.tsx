import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AudienceGrowthChartProps {
  data: { date: string; value: number }[];
}

const AudienceGrowthChart: React.FC<AudienceGrowthChartProps> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map(point => point.date),
    datasets: [
      {
        label: 'Audience Growth',
        data: data.map(point => point.value),
        borderColor: '#00BFFF',
        backgroundColor: 'rgba(0, 191, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}`,
        },
        grid: {
          color: '#3b4954',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow">
      <h4 className="text-white text-sm font-medium mb-2">Audience Growth Over Time</h4>
      <div style={{ height: '200px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AudienceGrowthChart;