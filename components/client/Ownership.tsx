import React from 'react';

interface OwnershipRecord {
  institution: string;
  shares: number;
  change: string;
}

interface OwnershipProps {
  data?: OwnershipRecord[];
}

const Ownership: React.FC<OwnershipProps> = ({ data = [] }) => {
  const headers = ['Institution', 'Shares', 'Change'];

  const rows = data.map((record) => [
    record.institution,
    record.shares.toLocaleString(),
    record.change,
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

export default Ownership;
