import React from 'react';

// Define the props for the table head component
interface TableHeadProps {
  headLabel: {
    id: string;
    label: string;
  }[];
}

// Component to render the table header
export function HistoryTableHead({ headLabel }: TableHeadProps) {
  return (
    <thead>
      <tr>
        {headLabel.map((head) => (
          <th key={head.id}>{head.label}</th>
        ))}
      </tr>
    </thead>
  );
}
