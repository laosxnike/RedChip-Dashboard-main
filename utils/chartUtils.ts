import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

export const registerChartComponents = () => {
  if (!ChartJS.registry.controllers.get('bar')) {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  }
};

export const destroyExistingChart = (canvasId: string) => {
  const existingChart = ChartJS.getChart(canvasId);
  if (existingChart) {
    existingChart.destroy();
  }
};

