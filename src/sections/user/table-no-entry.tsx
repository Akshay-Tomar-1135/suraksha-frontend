import type { TableRowProps } from '@mui/material/TableRow';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

type TableNoEntryProps = TableRowProps & {
  message?: string;
};

export function TableNoEntry({ message = "No entries available", ...other }: TableNoEntryProps) {
  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={7}>
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {message}
          </Typography>
          <Typography variant="body2">
            Add new entries to populate this table.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
