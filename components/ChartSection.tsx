// components/ChartSection.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartSectionProps {
  label: string;
  data: { date: string; value: number }[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ label, data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: label,
        data: data.map(item => item.value),
        borderColor: '#9CACBA',
        backgroundColor: '#283139',
        fill: true,
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
          callback: (value: number) => `${value}${label.includes('%') ? '%' : ''}`,
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
        display: false,
      },
    },
  };

  return (
    <div className="my-8">
      <h3 className="text-white text-lg font-bold">{label}</h3>
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartSection;
