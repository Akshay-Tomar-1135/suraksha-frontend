import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Rating from '@mui/material/Rating';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  role: string;
  status: string;
  company: string;
  avatarUrl: string;
  isVerified: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
};

export function UserTableRow({ row, selected }: UserTableRowProps) {
  
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center" sx={{ ml: 3 }}>
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.company}</TableCell>

        <TableCell>
          <Rating
            value={4} // Hardcoded value
            max={5}
            readOnly
            precision={0.5}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
