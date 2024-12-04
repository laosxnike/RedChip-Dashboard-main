// components/client/ShortPositions.tsx

import React from 'react';

interface ShortPosition {
  date: string;
  shortVolume: number;
  shortExemptVolume: number;
  totalVolume: number;
}

interface ShortPositionsProps {
  data?: ShortPosition[];
}

const ShortPositions: React.FC<ShortPositionsProps> = ({ data = [] }) => {
  const headers = ['Date', 'Short Volume', 'Short Exempt Volume', 'Total Volume'];

  const rows = data.map((position) => [
    new Date(position.date).toLocaleDateString(),
    position.shortVolume.toLocaleString(),
    position.shortExemptVolume.toLocaleString(),
    position.totalVolume.toLocaleString(),
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

export default ShortPositions;
