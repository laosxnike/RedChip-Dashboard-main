// components/client/ResearchCoverage.tsx

import React from 'react';

interface ResearchRecord {
  date: string;
  firm: string;
  rating: string;
  priceTarget: number;
}

interface ResearchCoverageProps {
  data?: ResearchRecord[];
}

const ResearchCoverage: React.FC<ResearchCoverageProps> = ({ data = [] }) => {
  const headers = ['Date', 'Firm', 'Rating', 'Price Target'];

  const rows = data.map((record) => [
    new Date(record.date).toLocaleDateString(),
    record.firm,
    record.rating,
    `$${record.priceTarget.toLocaleString()}`
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

export default ResearchCoverage;
