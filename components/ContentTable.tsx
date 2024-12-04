// components/ContentTable.tsx
import React from 'react';

interface ContentData {
  title: string;
  views: string;
  engagements: string;
  engagementRate: string;
  reach: string;
}

const contentData: ContentData[] = [
  {
    title: 'How to invest in tech stocks this year',
    views: '100',
    engagements: '10',
    engagementRate: '10%',
    reach: '1,000',
  },
  {
    title: 'Understanding the Metaverse: A guide for investors',
    views: '200',
    engagements: '20',
    engagementRate: '10%',
    reach: '2,000',
  },
  {
    title: 'Why Bitcoin is a smart investment in 2023',
    views: '300',
    engagements: '30',
    engagementRate: '10%',
    reach: '3,000',
  },
  {
    title: 'The future of electric vehicles: A guide for investors',
    views: '400',
    engagements: '40',
    engagementRate: '10%',
    reach: '4,000',
  },
  {
    title: 'How to build a diversified stock portfolio',
    views: '500',
    engagements: '50',
    engagementRate: '10%',
    reach: '5,000',
  },
];

const ContentTable: React.FC = () => {
  return (
    <div className="px-4 py-3">
      <div className="flex overflow-hidden rounded-xl border border-[#3b4954] bg-[#111518]">
        <table className="flex-1">
          <thead>
            <tr className="bg-[#1b2227]">
              {['Title', 'Views', 'Engagements', 'Engagement Rate', 'Reach'].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-white text-sm font-medium leading-normal"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {contentData.map((item, index) => (
              <tr key={index} className="border-t border-t-[#3b4954]">
                <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
                  {item.title}
                </td>
                <td className="h-[72px] px-4 py-2 text-[#9cacba] text-sm font-normal leading-normal">
                  {item.views}
                </td>
                <td className="h-[72px] px-4 py-2 text-[#9cacba] text-sm font-normal leading-normal">
                  {item.engagements}
                </td>
                <td className="h-[72px] px-4 py-2 text-[#9cacba] text-sm font-normal leading-normal">
                  {item.engagementRate}
                </td>
                <td className="h-[72px] px-4 py-2 text-[#9cacba] text-sm font-normal leading-normal">
                  {item.reach}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentTable;
