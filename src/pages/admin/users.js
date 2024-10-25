import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainContainer } from '../../style/mainContainer';
import {
  DataGrid,
  GridActionsCellItem,
  GridEditInputCell,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';
import { getUsers } from '../../functions/user';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import moment from 'moment';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const newId = Date.now(); // Generate a unique ID
    setRows((oldRows) => [
      ...oldRows,
      { _id: newId, displayName: '', email: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'displayName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<PersonAddIcon color="success" />}
        onClick={handleClick}
        sx={{
          color: 'green',
          textTransform: 'none',
          fontWeight: 700,
        }}
      >
        Ajouter un utilisateur
      </Button>
    </GridToolbarContainer>
  );
}

const StyledBox = styled('div')(({ theme }) => ({
  height: 400,
  width: '100%',
  '& .MuiDataGrid-cell--editable': {
    backgroundColor: 'rgb(217 243 190)',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: 'rgb(126,10,15, 0.1)',
    color: '#750f0f',
  },
}));

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function EmailEditInputCell(props) {
  const { error } = props;
  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? null : 'Invalid email format';
};

const preProcessEditCellProps = async (params) => {
  const errorMessage = validateEmail(params.props.value.toString());
  return { ...params.props, error: errorMessage };
};

function PasswordEditInputCell(props) {
  const { error, value, onChange } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledTooltip open={!!error} title={error}>
      <TextField
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </StyledTooltip>
  );
}

const renderPasswordCell = (params) => {
  const { value } = params;
  // Check if value is defined and return masked characters, else return a placeholder
  return <div>{value ? '*'.repeat(value.length) : ''}</div>;
};

const Users = () => {
  const { drawer } = useSelector((state) => state);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setRows(response.data);
    } catch (error) {
      console.error('Failed to load users', error);
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

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const rowToSave = rows.find((row) => row._id === id);
    console.log('Saving row data:', rowToSave); // Log the old row data if needed

    // Here you can add your code to send the updated data to the server
    // Example: saveUserData(rowToSave).then(response => { /* handle response */ });

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows((oldRows) => oldRows.filter((row) => row._id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow && editedRow.isNew) {
      setRows((oldRows) => oldRows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow };
    console.log('Updated row data:', updatedRow); // Log the updated row data

    // Send updatedRow to the server
    // Example: saveUserData(updatedRow).then(response => { /* handle response */ });

    setRows((oldRows) =>
      oldRows.map((row) => (row._id === newRow._id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const renderDateCell = (params) => {
    return moment(params.value).format('DD/MM/YYYY HH:mm:ss'); // Desired format
  };

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: (params) => (
        <Box display="flex" alignItems="center" style={{ height: '100%' }}>
          <Avatar src={params.value} alt="Avatar" />
        </Box>
      ),
    },
    { field: 'displayName', headerName: 'Name', width: 180, editable: true },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
      editable: true,
      editable: true,
      preProcessEditCellProps,
      renderEditCell: (params) => <EmailEditInputCell {...params} />,
    },
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['admin', 'Quality', 'Sav', 'Wc'],
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 220,
      editable: true,
      type: 'boolean',
    },
    {
      field: 'password',
      headerName: 'Password',
      width: 250,
      editable: true,
      renderCell: renderPasswordCell, // Use renderCell for viewing
      renderEditCell: (params) => <PasswordEditInputCell {...params} />,
    },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      width: 180,
      editable: false,
      renderCell: renderDateCell, // Use the custom date rendering function
    },
    {
      field: 'updatedAt',
      headerName: 'Last Login',
      width: 180,
      editable: false,
      renderCell: renderDateCell, // Use the custom date rendering function
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => {
        const { id } = params;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <Tooltip title="Edit user" arrow>
            <GridActionsCellItem
              icon={<ManageAccountsIcon color="warning" />}
              label="Edit"
              onClick={handleEditClick(id)}
            />
          </Tooltip>,
          <Tooltip title="Delete user" arrow>
            <GridActionsCellItem
              icon={<PersonRemoveIcon color="error" />}
              label="Delete"
              onClick={handleDeleteClick(id)}
            />
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <MainContainer
      open={drawer}
      sx={{ backgroundColor: darkMode ? 'auto' : grey[100], height: '100%' }}
    >
      <Typography variant="h5" sx={{ m: 2, fontWeight: 700 }}>
        Listes des utilisateurs
      </Typography>
      <Box sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          getRowId={(row) => row._id}
          sx={{
            m: 2,
            boxShadow: 3,
            border: 2,
            borderColor: grey[200],
            backgroundColor: darkMode ? 'auto' : 'white',
          }}
        />
      </Box>
    </MainContainer>
  );
};

export default Users;
