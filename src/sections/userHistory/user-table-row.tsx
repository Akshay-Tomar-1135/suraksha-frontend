import React from 'react';

// Define the shape of the row data
export interface HistoryProps {
  id: string;
  source: string;
  destination: string;
  ratings: string; 
}

// Component to render each history row
export function HistoryTableRow({ row }: { row: HistoryProps }) {
  return (
    <tr>
      <td>{row.source}</td>
      <td>{row.destination}</td>
      <td>{row.ratings}</td>
    </tr>
  );
}
