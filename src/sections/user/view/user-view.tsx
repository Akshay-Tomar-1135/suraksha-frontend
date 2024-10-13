import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import {Snackbar, Alert} from '@mui/material';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

import { UserAddModal } from '../user-add-modal';
import { UserEditModal } from '../user-edit-modal';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog';
// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const [users, setUsers] = useState<UserProps[]>(_users); // State to store users
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State to control modal
  
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State to control Edit Modal
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null); // Store current user to edit

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete dialog
  const [userToDelete, setUserToDelete] = useState<UserProps | null>(null); // Track the user to delete

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Snackbar handlers
  const openSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const handleOpenAddModal = () => {
    console.log('Opening Modal');
    setAddModalOpen(true);
  };
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleAddUser = (newUser: UserProps) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleOpenEditModal = (user: UserProps) => {
    setCurrentUser(user); // Set the user to be edited
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleEditUser = (updatedUser: UserProps) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  // const handleDeleteUser = (userId: string) => {
  //   setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  // };

  async function deleteUserContact(phoneNumber: string) {
    try {
      const response = await fetch(`http://localhost:8000/delete_user_contact`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }), 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, message: data.message };
      } 
      
      return { success: false, message: data.message };
      
    } catch (error) {
      console.error('Error deleting user contact:', error);
      return { success: false, message: 'An error occurred while deleting the user contact.' };
    }
  }

  // const handleDeleteUser = () => {
  //   if (userToDelete) {
  //     setUsers((prevUsers) =>
  //       prevUsers.filter((user) => user.id !== userToDelete.id)
  //     );
      
  //     setDeleteDialogOpen(false); // Close the dialog after deleting
  //   }
  // };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        const result = await deleteUserContact(userToDelete.role);
  
        if (result.success) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userToDelete.id)
          );
  
          // Show success snackbar
          openSnackbar('User deleted successfully', 'success');
        } else {
          // Show error snackbar
          openSnackbar(`Failed to delete user: ${result.message}`, 'error');

        }
      } catch (error) {
        console.error('Error deleting user contact:', error);
        openSnackbar('An error occurred while deleting the user.', 'error');
      } finally {
        setDeleteDialogOpen(false);
      }
    }
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (user: UserProps) => {
    setUserToDelete(user); // Store the user to delete
    setDeleteDialogOpen(true); // Open the dialog
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false); // Close the dialog without deleting
    setUserToDelete(null); // Reset the user to delete
  };

  const dataFiltered: UserProps[] = applyFilter({
    // inputData: _users,
    inputData: users, 
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenAddModal}
        >
          New user
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Relation' },
                  { id: 'role', label: 'Phone Number' },
                  { id: 'isVerified', label: 'Email', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onEditRow={() => handleOpenEditModal(row)} // Open the edit modal
                      onDeleteRow={() => handleOpenDeleteDialog(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {/* Add Modal */}
      <UserAddModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddUser={handleAddUser}
      />

      {currentUser && (
        <UserEditModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          user={currentUser}
          onEditUser={handleEditUser}
        />
      )}

      {/* Confirmation dialog for delete */}
      {userToDelete && (
        <ConfirmDeleteDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteUser} // Confirm deletion
          userName={userToDelete.name} // Optionally pass the user's name
        />
      )}

      {/* Add Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
