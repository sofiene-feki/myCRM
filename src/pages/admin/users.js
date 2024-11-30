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
          textTransform: 'none', // Prevent all-uppercase text
          fontWeight: 700, // Bold text
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 3D-like shadow
          mb: 1, // Margin bottom
          padding: '6px 9px', // Add padding for balanced spacing
          borderRadius: '8px', // Rounded corners
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          backdropFilter: 'blur(4px)', // Frosted-glass effect
          outline: 'none', // Remove outline
          transition: 'box-shadow 0.3s, background-color 0.3s', // Smooth hover effect
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Stronger shadow on hover
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly less transparent on hover
          },
          '&:focus': {
            boxShadow: '0 0 10px rgba(63, 81, 181, 0.4)', // Glow effect on focus
          },
          border: 1,
          borderColor: grey[400],
        }}
      >
        Ajouter un utilisateur
      </Button>

      <Button
        color="inherit"
        startIcon={<BusinessCenterIcon />}
        sx={{
          textTransform: 'none', // Prevent all-uppercase text
          fontWeight: 700, // Bold text
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 3D-like shadow
          mb: 1, // Margin bottom
          padding: '6px 9px', // Add padding for balanced spacing
          borderRadius: '8px', // Rounded corners
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          backdropFilter: 'blur(4px)', // Frosted-glass effect
          outline: 'none', // Remove outline
          transition: 'box-shadow 0.3s, background-color 0.3s', // Smooth hover effect
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Stronger shadow on hover
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly less transparent on hover
          },
          '&:focus': {
            boxShadow: '0 0 10px rgba(63, 81, 181, 0.4)', // Glow effect on focus
          },
          border: 1,
          borderColor: grey[400],
        }}
      >
        Gestion des départements
      </Button>

      <GridToolbarQuickFilter
        disableUnderline // Disables default underline
        sx={{
          marginLeft: 'auto',
          padding: '2px 4px',
          mb: 1,
          border: 1,
          borderColor: grey[400],
          width: '300px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#fff',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Stronger shadow on hover
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly less transparent on hover
          },
          '& .MuiInput-underline:before, & .MuiInput-underline:after': {
            display: 'none', // Remove the underline in all states
          },
          '& .MuiInput-root:hover:not(.Mui-disabled):before': {
            display: 'none', // Prevent underline from showing on hover
          },
          '& .MuiInput-root.Mui-focused:after': {
            display: 'none', // Prevent underline from showing on focus
          },
        }}
        type="search"
        placeholder="Search..."
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
      headerName: <strong>Avatar</strong>,
      renderCell: (params) => <Avatar src={params.value} />,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'uid',
      headerName: <strong>UID</strong>,
      flex: 0.4,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'displayName',
      headerName: <strong>Name</strong>,
      flex: 0.4,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },

    {
      field: 'email',
      headerName: <strong>Email</strong>,
      flex: 0.3,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'role',
      headerName: <strong>Department</strong>,
      flex: 0.3,
      editable: true,
      headerClassName: 'super-app-theme--header',
      type: 'singleSelect',
      valueOptions: ['admin', 'quality', 'sav', 'wc'],
    },
    {
      field: 'disabled',
      headerName: <strong>Disabled</strong>,
      flex: 0.3,
      editable: true,
      type: 'boolean',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'password',
      headerName: <strong>New Password</strong>,
      flex: 0.3,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'createdAt',
      headerName: <strong>Creation Date</strong>,
      headerClassName: 'super-app-theme--header',
      flex: 0.3,
      renderCell: renderDateCell,
    },
    {
      field: 'updatedAt',
      headerName: <strong>Last Login</strong>,
      flex: 0.3,
      headerClassName: 'super-app-theme--header',
      renderCell: renderDateCell,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: <strong>Actions</strong>,
      headerClassName: 'super-app-theme--header',
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
            '& .super-app-theme--header': {
              boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)', // Shadow only at the bottom
              //transition: 'background-color 0.3s, box-shadow 0.3s', // Smooth hover effects
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Stronger shadow on hover
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly less transparent on hover
              },
            },
          }}
        />
      </Box>
    </MainContainer>
  );
};

export default Users;
