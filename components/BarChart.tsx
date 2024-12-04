// components/BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

// Define the props interface
interface BarChartProps {
  title: string;
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

const BarChart: React.FC<BarChartProps> = ({ title, data, options }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md w-full h-64">
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <Bar data={data} options={{ ...options, responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

BarChart.defaultProps = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

export default BarChart;
