import dynamic from 'next/dynamic';

const DynamicAudienceGrowthChart = dynamic(() => import('./AudienceGrowthChart'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>,
});

export default DynamicAudienceGrowthChart;
