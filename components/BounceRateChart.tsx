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

interface BounceRateChartProps {
  data: { date: string; value: number }[];
}

const BounceRateChart: React.FC<BounceRateChartProps> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map(point => point.date),
    datasets: [
      {
        label: 'Bounce Rate (%)',
        data: data.map(point => point.value),
        borderColor: '#9CACBA',
        backgroundColor: 'rgba(40, 49, 57, 0.2)',
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
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`,
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
      <h4 className="text-white text-sm font-medium mb-2">Bounce Rate Over Time</h4>
      <div style={{ height: '200px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BounceRateChart; 