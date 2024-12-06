import { useTheme } from 'next-themes';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const DashboardCharts: React.FC = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#9cacba' : '#1e252b';
  const gridColor = theme === 'dark' ? '#3b4954' : '#e5e7eb';

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          color: textColor,
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
          drawBorder: false
        },
        ticks: {
          color: textColor,
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: gridColor,
          drawBorder: false
        },
        ticks: {
          color: textColor,
          font: {
            size: 11
          }
        }
      }
    }
  };

  const chartConfigs = [
    {
      title: "Traffic Source Breakdown",
      type: "doughnut",
      data: {
        labels: ['Organic', 'Paid Search', 'Social', 'Direct', 'Referral'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#F44336'],
          borderWidth: 0
        }]
      }
    },
    {
      title: "Top Pages Visited",
      type: "line",
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Page Views',
          data: [300, 450, 400, 600, 450, 550, 500],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    },
    {
      title: "Average Session Duration",
      type: "line",
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Duration (min)',
          data: [3.5, 4.2, 3.8, 4.5, 3.9, 3.2, 3.7],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    },
    {
      title: "Top Performing Ads",
      type: "line",
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Clicks',
          data: [250, 300, 280, 350, 300, 320, 310],
          borderColor: '#FFC107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    },
    {
      title: "Geographic Distribution",
      type: "line",
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Visitors',
          data: [400, 500, 450, 600, 500, 550, 520],
          borderColor: '#9C27B0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    },
    {
      title: "Returning vs New Visitors",
      type: "line",
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Returning',
            data: [500, 600, 550, 700, 650, 600, 700],
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'New',
            data: [300, 400, 350, 450, 400, 350, 400],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      }
    }
  ];

  return (
    <div className="rounded-xl p-6 border border-[#3b4954] bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chartConfigs.map((chart, index) => (
        <div
          key={index}
          className="bg-transparent p-6 rounded-xl h-[300px] border border-[#3b4954] shadow-inner"
        >
          <h3 className="text-white text-lg font-semibold mb-6">{chart.title}</h3>
          <div className="h-[200px]">
            {chart.type === 'doughnut' ? (
              <Doughnut data={chart.data} options={baseOptions} />
            ) : (
              <Line data={chart.data} options={baseOptions} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCharts; 