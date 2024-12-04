// components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

// Define the props interface
interface LineChartProps {
  title: string;
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ title, data, options }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md w-full h-64">
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <Line data={data} options={{ ...options, responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

LineChart.defaultProps = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

export default LineChart;
