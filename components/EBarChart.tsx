// components/BarChart.tsx
import React from 'react';

interface BarData {
  label: string;
  value: number;
}

const barData: BarData[] = [
  { label: 'Jun 28', value: 40 },
  { label: 'Jul 5', value: 100 },
  { label: 'Jul 12', value: 50 },
  { label: 'Jul 19', value: 20 },
  { label: 'Jul 26', value: 40 },
];

const BarChart: React.FC = () => {
  return (
    <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
      {barData.map((data) => (
        <React.Fragment key={data.label}>
          <div
            className="w-full bg-[#283139] border-t-2 border-[#9cacba]"
            style={{ height: `${data.value}%` }}
          ></div>
          <p className="text-[#9cacba] text-[13px] font-bold leading-normal tracking-[0.015em]">
            {data.label}
          </p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BarChart;
