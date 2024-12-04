// components/client/LandingPageTraffic.tsx

import React from 'react';

interface TrafficRecord {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
}

interface LandingPageTrafficProps {
  data?: TrafficRecord[];
}

const LandingPageTraffic: React.FC<LandingPageTrafficProps> = ({ data = [] }) => {
  const headers = ['Date', 'Page Views', 'Unique Visitors', 'Conversion Rate'];

  const rows = data.map((record) => [
    new Date(record.date).toLocaleDateString(),
    record.pageViews.toLocaleString(),
    record.uniqueVisitors.toLocaleString(),
    `${record.conversionRate.toFixed(2)}%`
  ]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LandingPageTraffic;
