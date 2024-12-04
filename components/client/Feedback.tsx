// components/client/Feedback.tsx

import React from 'react';

interface FeedbackRecord {
  createdAt: string;
  comment: string;
  rating: string;
}

interface FeedbackProps {
  data?: FeedbackRecord[];
}

const Feedback: React.FC<FeedbackProps> = ({ data = [] }) => {
  const headers = ['Date', 'Comment', 'Rating'];

  const rows = data.map((record) => [
    new Date(record.createdAt).toLocaleDateString(),
    record.comment,
    record.rating
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

export default Feedback;
