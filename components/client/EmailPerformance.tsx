// components/client/EmailPerformance.tsx

import React from 'react';

interface EmailRecord {
  date: string;
  sends: number;
  opens: number;
  clicks: number;
  conversionRate: number;
}

interface EmailPerformanceProps {
  data?: EmailRecord[];
}

const EmailPerformance: React.FC<EmailPerformanceProps> = ({ data = [] }) => {
  const headers = ['Date', 'Sends', 'Opens', 'Clicks', 'Conversion Rate'];

  const rows = data.map((record) => [
    new Date(record.date).toLocaleDateString(),
    record.sends.toLocaleString(),
    record.opens.toLocaleString(),
    record.clicks.toLocaleString(),
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

export default EmailPerformance;
