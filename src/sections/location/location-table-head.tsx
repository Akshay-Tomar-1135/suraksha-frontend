import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------

type UserTableHeadProps = {
  orderBy: string;
  order: 'asc' | 'desc';
  onSort: (id: string) => void;
  headLabel: Record<string, any>[];
};

export function UserTableHead({
  order,
  onSort,
  orderBy,
  headLabel,
}: UserTableHeadProps) {
  return (
    <TableHead>
      <TableRow>

{headLabel.map((headCell, index) => (
  <TableCell
    key={headCell.id}
    align={headCell.align || 'left'}
    sortDirection={orderBy === headCell.id ? order : false}
    sx={{
      width: headCell.width,
      minWidth: headCell.minWidth,
    }}
  >
    <Box
      sx={{
        ...(index === 0 && { ml: 3 }),  
      }}
    >
      <TableSortLabel
        hideSortIcon
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={() => onSort(headCell.id)}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box sx={{ ...visuallyHidden }}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </Box>
  </TableCell>
))}

      </TableRow>
    </TableHead>
  );
}