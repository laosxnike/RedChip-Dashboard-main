// components/PromotionTable.tsx
import React from 'react';

interface Promotion {
  name: string;
  adSpend: string;
  sales: string;
  roi: string;
  startDate: string;
  endDate: string;
  status: string;
}

const promotions: Promotion[] = [
  {
    name: "New Year's Sale",
    adSpend: '$1,500',
    sales: '$3,000',
    roi: '100%',
    startDate: 'Jan 1, 2023',
    endDate: 'Jan 5, 2023',
    status: 'Active',
  },
  // Add more promotions here
];

const PromotionTable: React.FC = () => {
  return (
    <div className="px-4 py-3">
      <div className="flex overflow-hidden rounded-xl border border-[#3b4954] bg-[#111518]">
        <table className="flex-1">
          <thead>
            <tr className="bg-[#1b2227]">
              {[
                'Promotion',
                'Ad Spend',
                'Sales',
                'ROI',
                'Start Date',
                'End Date',
                'Status',
                'Actions',
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-white text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {promotions.map((promo, index) => (
              <tr
                key={index}
                className="border-t border-t-[#3b4954] h-[72px]"
              >
                <td className="px-4 py-2 text-white text-sm font-normal">
                  {promo.name}
                </td>
                <td className="px-4 py-2 text-[#9cacba] text-sm font-normal">
                  {promo.adSpend}
                </td>
                <td className="px-4 py-2 text-[#9cacba] text-sm font-normal">
                  {promo.sales}
                </td>
                <td className="px-4 py-2 text-[#9cacba] text-sm font-normal">
                  {promo.roi}
                </td>
                <td className="px-4 py-2 text-[#9cacba] text-sm font-normal">
                  {promo.startDate}
                </td>
                <td className="px-4 py-2 text-[#9cacba] text-sm font-normal">
                  {promo.endDate}
                </td>
                <td className="px-4 py-2 text-sm font-normal">
                  <button className="flex min-w-[84px] items-center justify-center rounded-xl h-8 px-4 bg-[#283139] text-white text-sm font-medium w-full">
                    <span className="truncate">{promo.status}</span>
                  </button>
                </td>
                <td className="px-4 py-2 text-[#9cacba] text-sm font-bold">
                  View Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionTable;
