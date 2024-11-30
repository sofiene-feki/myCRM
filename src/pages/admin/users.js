import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { MainContainer } from '../../style/mainContainer';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../../functions/user';
import moment from 'moment';
import { Avatar, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';
import { toast } from 'react-toastify';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const newId = `KE-${Date.now()}`;
    setRows((oldRows) => [
      ...oldRows,
      {
        uid: newId,
        displayName: '',
        email: '',
        role: '',
        password: '',
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="inherit"
        startIcon={<PersonAddIcon />}
        onClick={handleClick}
        sx={{
          //color: 'primary.main',
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 1,
          mb: 1,
        }}
      >
        Ajouter un utilisateur
      </Button>
      <Button
        color="inherit"
        startIcon={<BusinessCenterIcon />}
        sx={{
          // color: 'primary.main',
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 1,
          mb: 1,
          border: 0,
        }}
      >
        Gestion des départements
      </Button>
      <GridToolbarQuickFilter
        sx={{
          marginLeft: 'auto',
          paddingRight: 1,
          // boxShadow: 1,
          mb: 1,
          width: 'auto', // Set the width to auto or specify a custom width like '200px'
          border: 'none', // Remove the border
          outline: 'none', // Remove outline if present
        }}
      />
    </GridToolbarContainer>
  );
}

const Users = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});
  const [updatedRow, setUpdatedRow] = useState();
  const { drawer } = useSelector((state) => state);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setRows(response.data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (uid) => () => {
    setRowModesModel({ ...rowModesModel, [uid]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (uid) => () => {
    setRowModesModel({ ...rowModesModel, [uid]: { mode: GridRowModes.View } });
    // console.log('im the new row ', updatedRow);
  };

  const handleDeleteClick = async (uid) => {
    try {
      window.confirm('confirm delete user');
      setLoading(true);
      await deleteUser(uid); // Assuming deleteUser function takes the user id
      toast.success('User successfully deleted!');
      setRows((prevRows) => prevRows.filter((row) => row.uid !== uid));
    } catch (error) {
      toast.error(
        `Error deleting user: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (uid) => () => {
    setRowModesModel({
      ...rowModesModel,
      [uid]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.uid === uid); // Use uid instead of id
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.uid !== uid)); // Use uid instead of id
    }
  };

  const processRowUpdate = async (newRow) => {
    const rowToUpdate = { ...newRow };
    if (rowToUpdate.isNew) {
      setLoading(true);
      await createUser(rowToUpdate); // Make sure you're passing the correct object
      toast.success('User created successfully!');
      setLoading(false);
    } else {
      setLoading(true);
      await updateUser(rowToUpdate.uid, rowToUpdate); // Make sure you're passing the correct object
      toast.success('User updated successfully!');
      setLoading(false);
    }
    // Update the row in the state (assuming `setRows` is a state setter)
    setRows(rows.map((row) => (row.uid === newRow.uid ? rowToUpdate : row)));
    return rowToUpdate;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const renderDateCell = (params) =>
    moment(params.value).format('DD/MM/YYYY HH:mm:ss');

  const columns = [
    {
      field: 'avatar',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> Avatar</span>
        </strong>
      ),
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: 'uid',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> UID</span>
        </strong>
      ),
      flex: 0.4,
    },
    {
      field: 'displayName',
      headerName: (
        <strong>
          {' '}
          <span style={{ color: '#1976d2' }}> Name</span>
        </strong>
      ),
      flex: 0.4,
      editable: true,
    },

    {
      field: 'email',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> Email</span>
        </strong>
      ),
      flex: 0.3,
      editable: true,
    },
    {
      field: 'role',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> Department</span>
        </strong>
      ),
      flex: 0.3,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['admin', 'quality', 'sav', 'wc'],
    },
    {
      field: 'disabled',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> Disabled</span>
        </strong>
      ),
      flex: 0.3,
      editable: true,
      type: 'boolean',
    },
    {
      field: 'password',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}>New Password</span>
        </strong>
      ),
      flex: 0.3,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> Creation Date</span>
        </strong>
      ),
      flex: 0.3,
      renderCell: renderDateCell,
    },
    {
      field: 'updatedAt',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> Last Login</span>
        </strong>
      ),
      flex: 0.3,
      renderCell: renderDateCell,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: (
        <strong>
          <span style={{ color: '#1976d2' }}> Actions</span>
        </strong>
      ),
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={loading ? <CircularProgress size="18px" /> : <SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
              disabled={loading}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<ManageAccountsIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            sx={{
              color: 'warning.light',
            }}
          />,
          <GridActionsCellItem
            icon={<PersonRemoveIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="error"
            disabled={loading}
          />,
        ];
      },
    },
  ];

  return (
    <MainContainer
      open={drawer}
      sx={{ backgroundColor: darkMode ? 'auto' : grey[100] }}
    >
      <Typography variant="h5" sx={{ m: 2, fontWeight: 700 }}>
        Listes des utilisateurs
      </Typography>
      <Box
        sx={{
          height: 'calc(100vh - 150px)',
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          getRowId={(row) => row.uid} // Using uid as the row identifier
          loading={loading}
          slots={{ toolbar: EditToolbar, loadingOverlay: LinearProgress }}
          slotProps={{
            toolbar: {
              setRows,
              setRowModesModel,
            },
          }}
          sx={{
            m: 2,
            boxShadow: 3,
            border: 1,
            borderColor: grey[400],
            backgroundColor: darkMode ? 'auto' : 'white',
          }}
        />
      </Box>
    </MainContainer>
  );
};

export default Users;
