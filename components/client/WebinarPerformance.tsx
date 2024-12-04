// components/client/WebinarPerformance.tsx

import React from 'react';

interface WebinarRecord {
  date: string;
  registrations: number;
  attendance: number;
  conversionRate: number;
}

interface WebinarPerformanceProps {
  data?: WebinarRecord[];
}

const WebinarPerformance: React.FC<WebinarPerformanceProps> = ({ data = [] }) => {
  const headers = ['Date', 'Registrations', 'Attendance', 'Conversion Rate'];

  const rows = data.map((record) => [
    new Date(record.date).toLocaleDateString(),
    record.registrations.toLocaleString(),
    record.attendance.toLocaleString(),
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

export default WebinarPerformance;
