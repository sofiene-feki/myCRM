// import React, { useCallback, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { MainContainer } from '../../style/mainContainer';
// import Box from '@mui/material/Box';
// import { DataGrid, GridToolbarContainer, gridClasses } from '@mui/x-data-grid';
// import { Button, Stack, Typography } from '@mui/material';
// import { grey } from '@mui/material/colors';
// import { CustomNoRowsOverlay } from '../../style/dataGrid';
// import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CancelIcon from '@mui/icons-material/Cancel';
// import SaveIcon from '@mui/icons-material/Save';
// import AddIcon from '@mui/icons-material/Add';
// import { contractCreateColumns } from '../../components/dataGrid/columns';
// import * as XLSX from 'xlsx';
// import { createContract } from '../../functions/contract';

// const ContractCreate = () => {
//   const { drawer, user } = useSelector((state) => ({ ...state }));
//   const darkMode = useSelector((state) => state.darkMode.darkMode);

//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadLoading, setUploadLoading] = useState(false);

//   const getRowSpacing = useCallback((params) => {
//     return {
//       top: params.isFirstVisible ? 0 : 5,
//       bottom: params.isLastVisible ? 0 : 5,
//     };
//   }, []);

//   let idCounter = 0;
//   const createRandomRow = () => {
//     idCounter += 1;
//     const newRow = {

//       contratRef: idCounter,
//       ClientRef: '',
//       Civility: '',
//       Prénom: '',
//       Nom: '',
//       Tél: '',
//       Email: '',
//       Adresse: '',
//       CodePotal: '',
//       Commune: '',
//       Energie: '',
//       PDL: '',
//       Puissance: '',
//       Offre: '',
//       Statut: '',
//       Partenaire: '',
//       DateDébut: new Date(),
//       DateSignature: new Date(),
//       Mensualité: '',
//       isNew: true,
//     };
//     return newRow;
//   };

//   function CustomToolbar() {
//     const handleAddRow = () => {
//       const newRow = createRandomRow();
//       setRows((prevRows) => [...prevRows, newRow]);
//     };

//     return (
//       <GridToolbarContainer>
//         <Button size="small" startIcon={<AddIcon />} onClick={handleAddRow}>
//           Add a row
//         </Button>
//       </GridToolbarContainer>
//     );
//   }

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = event.target.result;
//       const workbook = XLSX.read(data, { type: 'binary', cellDates: true });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//       const headers = excelData[0];
//       const rows = excelData.slice(1).map((row) => {
//         return headers.reduce((obj, header, index) => {
//           obj[header] = row[index];
//           return obj;
//         }, {});
//       });
//       console.log(rows)
//       setRows(rows);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleReset = () => {
//     setRows([]);
//     console.log(user)
//   };

//   const handleSubmit = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     createContract(rows, user.token)
//       .then((res) => {
//         setLoading(false);
//         window.alert('Add New Data To db');
//         setLoading(false);
//         //window.location.reload();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <MainContainer open={drawer} sx={{backgroundColor : darkMode ? "auto"  : grey[100] }}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           m: 2,
//           width: 'auto',
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: 700 }}>
//           Inserer un fichier
//         </Typography>
//         <Stack direction="row" spacing={2}>
//           {rows && rows.length ? (
//             <Button
//               variant="outlined"
//               component="label"
//               startIcon={<CancelIcon />}
//               onClick={handleReset}
//             >
//               Reset
//             </Button>
//           ) : (
//             <Button
//               variant="outlined"
//               component="label"
//               startIcon={<UploadFileIcon />}
//               disabled={uploadLoading}
//             >
//               importer
//               <input hidden type="file" onChange={handleFileUpload} />
//             </Button>
//           )}

//           <LoadingButton
//             variant="contained"
//             type="submit"
//             startIcon={<SaveIcon />}
//              onClick={handleSubmit}
//             loading={loading}
//             loadingPosition="start"
//             disabled={!rows.length}
//           >
//             Enregistrer
//           </LoadingButton>
//         </Stack>
//       </Box>
//       <Box
//         sx={{
//           height: 'calc(100vh - 150px)',
//           width: '100%',
//         }}
//       >
//         <DataGrid
//           rows={rows}
//           columns={contractCreateColumns}
//           slots={{
//             noRowsOverlay: CustomNoRowsOverlay,
//             toolbar: CustomToolbar,
//           }}
//           getRowSpacing={getRowSpacing}
//           disableRowSelectionOnClick
//           getRowId={(row) => row.contratRef}
//           sx={{
//             m: 2,
//             boxShadow: 3,
//             border: 2,
//             borderColor: grey[200],
//            backgroundColor : darkMode ? "auto"  : "white"
//           }}
//         />
//       </Box>
//     </MainContainer>
//   );
// };

// export default ContractCreate;
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  DataGrid,
  GridCellEditStopReasons,
  GridColumnMenu,
  gridQuickFilterValuesSelector,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { MainContainer } from "../../style/mainContainer";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import UploadIcon from "@mui/icons-material/Upload";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Tools Icon (replace as needed)
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { set } from "lodash";
import {
  AutoAwesome,
  AutoAwesomeMotion,
  Co2Sharp,
  CropSquareRounded,
  Done,
  DoneAll,
  StopRounded,
} from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const commonButtonStyles = {
  backgroundColor: "#222", // Dark background
  color: "#ccc", // Light gray text
  borderRadius: "8px", // Rounded edges
  fontWeight: 600,
  textTransform: "none",
  padding: "6px 16px",
  border: "1px solid #ccc", // Light border for contrast
  boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.1)", // Soft white glow
  "&:hover": {
    backgroundColor: "#333", // Slightly lighter gray
    boxShadow: "0px 6px 12px rgba(255, 255, 255, 0.15)", // Brighter hover effect
  },
  "&:focus": {
    boxShadow: "0 0 0 3px rgba(204, 204, 204, 0.5)", // Subtle focus ring
  },
};

const GridToolbarQuickFilterRoot = styled(TextField)(({ theme }) => ({
  width: "150px",
  "& input": {
    padding: "5px",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    fontSize: "14px",
  },
}));

function CustomToolbar({
  quickFilterValue,
  setQuickFilterValue,

  handleReplace,
  results,
  currentIndex,
  setCurrentIndex,
}) {
  const [showReplace, setShowReplace] = useState(false); // Toggle Replace input
  const [replaceValue, setReplaceValue] = useState("");

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Section: Grid Toolbar Buttons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <GridToolbarColumnsButton
          slotProps={{
            button: {
              variant: "contained",
              size: "medium",
              color: "primary",
              sx: commonButtonStyles,
            },
          }}
        />
        <GridToolbarDensitySelector
          slotProps={{
            button: {
              variant: "contained",
              size: "medium",
              color: "primary",
              sx: commonButtonStyles,
            },
          }}
        />
        <GridToolbarFilterButton
          slotProps={{
            button: {
              variant: "contained",
              size: "medium",
              color: "primary",
              sx: commonButtonStyles,
            },
          }}
        />
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<UploadIcon />}
          sx={commonButtonStyles}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button>
        <GridToolbarExport
          slotProps={{
            tooltip: {
              title: "Export Data",
              placement: "bottom",
              arrow: true,
              componentsProps: {
                tooltip: {
                  sx: {
                    backgroundColor: "#2c3e50", // Dark background
                    color: "white", // White text
                    fontSize: "0.875rem", // Slightly smaller text
                    borderRadius: "6px", // Soft edges
                    padding: "8px 12px",
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.2)", // Soft shadow
                  },
                },
              },
            },
            button: {
              variant: "contained",
              size: "medium",
              color: "primary",
              sx: commonButtonStyles,
            },
          }}
        />
        <Button
          component="label"
          variant="outlined"
          tabIndex={-1}
          startIcon={<SmartToyIcon />}
          sx={commonButtonStyles}
        >
          Ai tools
        </Button>
      </Box>

      {/* Right Section: Find & Replace */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#222",
          color: "#fff",
          padding: "2px",
          borderLeft: "2px solid #fff", // Left gray border
        }}
      >
        {/* FIND BAR */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 40,
          }}
        >
          {/* Fixed-width IconButton */}
          <IconButton
            size="small"
            sx={{ width: "40px", minWidth: "40px" }}
            onClick={() => setShowReplace((prev) => !prev)}
          >
            {showReplace ? (
              <ExpandLessIcon sx={{ color: "#ccc", fontSize: "20px" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "#ccc", fontSize: "20px" }} />
            )}
          </IconButton>

          <GridToolbarQuickFilter
            variant="outlined"
            size="small"
            sx={{
              height: "32px",
              flex: 1,
              bgcolor: "#222",
              color: "#ccc",
              minWidth: "200px",
              input: {
                color: "#ccc",
                padding: "6px 8px",
                height: "32px",
                "&::placeholder": { color: "#999" },
              },
              "& .MuiOutlinedInput-root": {
                height: "28px",
                minHeight: "28px",
                width: "200px",
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#bbb",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#aaa",
                  boxShadow: "0 0 5px rgba(204, 204, 204, 0.5)",
                },
              },
            }}
          />
          <Typography variant="caption" color="#fff" p={1}>
            No results
          </Typography>

          <IconButton size="small">
            <SouthIcon sx={{ color: "#ccc", fontSize: "small" }} />
          </IconButton>
          <IconButton size="small">
            <NorthIcon sx={{ color: "#ccc", fontSize: "small" }} />
          </IconButton>
        </Box>

        {/* REPLACE BAR (Only visible when expanded) */}
        {showReplace && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginTop: "2px",
            }}
          >
            {/* Empty Box to match IconButton width */}
            <Box sx={{ width: "34px", minWidth: "34px" }} />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Replace"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FindReplaceIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              value={replaceValue}
              onChange={(e) => setReplaceValue(e.target.value)}
              sx={{
                // flex: 1,
                bgcolor: "#222",
                color: "#ccc",
                minWidth: "200px",
                // borderLeft: "2px solid #666", // Left gray border
                // paddingLeft: "8px",
                input: {
                  color: "#ccc",
                  padding: "6px 8px",
                  height: "32px",
                  "&::placeholder": { color: "#999" },
                },
                "& .MuiOutlinedInput-root": {
                  height: "28px",
                  minHeight: "28px",
                  width: "200px",
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#bbb",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#aaa",
                    boxShadow: "0 0 5px rgba(204, 204, 204, 0.5)",
                  },
                },
              }}
            />
            <IconButton
              sx={{
                bgcolor: "#ccc", // Primary color (changeable)
                // color: "#fff", // Icon color
                width: 24, // Size similar to Floating Action Button
                height: 24,
                borderRadius: "50%", // Ensures roundness
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#1565C0", // Slightly darker on hover
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                "&:active": {
                  transform: "scale(0.95)", // Shrinks slightly when clicked
                },
              }}
              size="small"
            >
              <StopRounded sx={{ color: "#222", fontSize: "22px" }} />
            </IconButton>
            <IconButton
              helperText="Please enter your name"
              onClick={handleReplace}
              size="small"
              sx={{
                bgcolor: "#ccc", // Primary color (changeable)
                // color: "#fff", // Icon color
                width: 24, // Size similar to Floating Action Button
                height: 24,
                borderRadius: "50%", // Ensures roundness
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#1565C0", // Slightly darker on hover
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                "&:active": {
                  transform: "scale(0.95)", // Shrinks slightly when clicked
                },
              }}
            >
              <AutoAwesomeMotion sx={{ color: "#222", fontSize: "16px" }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </GridToolbarContainer>
  );
}

const StyledDataGrid = styled(DataGrid)`
  border: 1px solid rgba(63, 81, 181, 0.3);
  /* ✅ Copied (Google Sheets Light Blue) */
  .copied {
    border: 1px dashed #4285f4 !important; /* Google Sheets blue border */
  }

  /* ✅ Selected (Google Sheets Light Blue) */
  .selected {
    background-color: #c2e7ff !important;
    border: 1px solid #4285f4 !important;
  }

  /* ✅ Hovered (Slightly lighter shade of blue) */
  .hovered {
    background-color: rgba(
      194,
      231,
      255,
      0.6
    ) !important; /* Transparent Light Blue */
  }
`;

function CustomUserItem(props) {
  const { myCustomHandler, myCustomValue, setOpen } = props;
  return (
    <MenuItem
      onClick={() => {
        setOpen(true); // Open the Find & Replace dialog
      }}
    >
      <ListItemIcon>
        <FindReplaceIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{myCustomValue}</ListItemText>
    </MenuItem>
  );
}

function CustomColumnMenu(props) {
  const { hideMenu, setOpen } = props;

  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Add new item
        columnMenuUserItem: CustomUserItem,
      }}
      slotProps={{
        columnMenuUserItem: {
          // set `displayOrder` for new item
          displayOrder: 15,
          // pass additional props
          myCustomValue: "find and replace",
          myCustomHandler: () => {
            setOpen(true);
            hideMenu(); // Close menu after clicking
          },
        },
      }}
    />
  );
}

export default function RobustCellSelectionExample() {
  const [selectedCells, setSelectedCells] = useState({});
  const [hoveredCells, setHoveredCells] = useState({});
  const [isSelecting, setIsSelecting] = useState(false);
  const [findValue, setFindValue] = useState("");
  const [replaceValue, setReplaceValue] = useState("");
  const [copiedCells, setCopiedCells] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quickFilterValue, setQuickFilterValue] = useState([]);

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John",
      age: 35,
      address: "New York",
      email: "john@example.com",
      phone: "123-456-7890",
      occupation: "Engineer",
      country: "USA",
    },
    {
      id: 2,
      name: "Alice",
      age: 42,
      address: "London",
      email: "alice@example.com",
      phone: "987-654-3210",
      occupation: "Doctor",
      country: "UK",
    },
    {
      id: 3,
      name: "Bob",
      age: 29,
      address: "Paris",
      email: "bob@example.com",
      phone: "456-789-0123",
      occupation: "Designer",
      country: "France",
    },
    {
      id: 4,
      name: "Sos",
      age: 36,
      address: "Tokyo",
      email: "sos@example.com",
      phone: "321-654-0987",
      occupation: "Architect",
      country: "Japan",
    },
    {
      id: 5,
      name: "Emma",
      age: 28,
      address: "Berlin",
      email: "emma@example.com",
      phone: "567-890-1234",
      occupation: "Photographer",
      country: "Germany",
    },
    {
      id: 6,
      name: "Liam",
      age: 31,
      address: "Sydney",
      email: "liam@example.com",
      phone: "678-901-2345",
      occupation: "Software Developer",
      country: "Australia",
    },
    {
      id: 7,
      name: "Olivia",
      age: 25,
      address: "Toronto",
      email: "olivia@example.com",
      phone: "789-012-3456",
      occupation: "Writer",
      country: "Canada",
    },
    {
      id: 8,
      name: "Noah",
      age: 33,
      address: "Dubai",
      email: "noah@example.com",
      phone: "890-123-4567",
      occupation: "Chef",
      country: "UAE",
    },
    {
      id: 9,
      name: "Sophia",
      age: 40,
      address: "Rome",
      email: "sophia@example.com",
      phone: "901-234-5678",
      occupation: "Teacher",
      country: "Italy",
    },
    {
      id: 10,
      name: "James",
      age: 38,
      address: "Barcelona",
      email: "james@example.com",
      phone: "012-345-6789",
      occupation: "Entrepreneur",
      country: "Spain",
    },
  ]);

  const [startCell, setStartCell] = useState(null);
  const { drawer, user } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const apiRef = useGridApiRef();

  const onFilterChange = useCallback((filterModel) => {
    setQuickFilterValue(filterModel.quickFilterValues || []); // Ensure it's always an array
  }, []);
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    {
      field: "occupation",
      headerName: "Occupation",
      width: 200,
    },
    { field: "country", headerName: "Country", width: 150 },
  ];
  const handleCopy = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "c") {
      event.preventDefault();

      console.log(selectedCells, "check line");

      const selectedRows = {};
      const copiedState = {}; // New object to track copied cells

      Object.keys(selectedCells).forEach((key) => {
        const [rowId, field] = key.split("-");
        if (!selectedRows[rowId]) selectedRows[rowId] = {};
        selectedRows[rowId][field] = rows.find(
          (r) => r.id.toString() === rowId
        )?.[field];

        copiedState[key] = true; // ✅ Mark cell as copied in state
      });

      setCopiedCells(copiedState); // ✅ Update state to trigger re-render

      console.log(copiedState, "hi i m the copied state");

      // Get global styles from MuiDataGrid-root
      const gridRoot = document.querySelector(".MuiDataGrid-root");
      let globalStyle = "";
      if (gridRoot) {
        const computedStyle = window.getComputedStyle(gridRoot);
        globalStyle = `
        font-family: ${computedStyle.fontFamily}; 
        font-size: ${computedStyle.fontSize}; 
        color: ${computedStyle.color}; 
        background-color: ${computedStyle.backgroundColor}; 
        border : ${computedStyle.border};
        border-collapse: collapse;
      `;
      }

      let htmlContent = `<table style="${globalStyle}">`;
      Object.entries(selectedRows).forEach(([rowId, row]) => {
        htmlContent += "<tr>";
        Object.entries(row).forEach(([field, value]) => {
          htmlContent += `<td>${value}</td>`;
        });
        htmlContent += "</tr>";
      });
      htmlContent += "</table>";

      const plainTextContent = Object.values(selectedRows)
        .map((row) => Object.values(row).join("\t"))
        .join("\n");

      const clipboardItem = new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
        "text/plain": new Blob([plainTextContent], { type: "text/plain" }),
      });

      navigator.clipboard.write([clipboardItem]).then(() => {
        console.log("Copied to clipboard:", htmlContent);
      });
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    if (Object.keys(selectedCells).length === 0) return;

    // Get pasted data
    const pastedData = event.clipboardData.getData("text/plain").trim();

    // Determine if a single cell is copied
    const isSingleValue =
      !pastedData.includes("\n") && !pastedData.includes("\t");

    let newRows = [...rows];

    if (isSingleValue) {
      // Paste single value into all selected cells
      Object.keys(selectedCells).forEach((cellKey) => {
        const [rowId, colField] = cellKey.split("-");
        const rowIndex = rows.findIndex(
          (row) => row.id === parseInt(rowId, 10)
        );

        if (rowIndex !== -1) {
          newRows[rowIndex] = { ...newRows[rowIndex], [colField]: pastedData };
        }
      });
    } else {
      // Multi-cell paste logic
      const firstSelectedKey = Object.keys(selectedCells)[0];
      const [startRowId, startColField] = firstSelectedKey.split("-");

      const startRowIndex = rows.findIndex(
        (row) => row.id === parseInt(startRowId, 10)
      );
      const startColIndex = columns.findIndex(
        (col) => col.field === startColField
      );

      if (startRowIndex === -1 || startColIndex === -1) return;

      const pastedRows = pastedData
        .split("\n")
        .map((row) => row.split("\t").map((cell) => cell.trim()));

      let lastRowId =
        rows.length > 0 ? Math.max(...rows.map((row) => row.id)) : 0;

      for (let rowOffset = 0; rowOffset < pastedRows.length; rowOffset++) {
        const rowValues = pastedRows[rowOffset];
        const targetRowIndex = startRowIndex + rowOffset;

        if (targetRowIndex >= newRows.length) {
          // Create a new row if it exceeds existing rows
          const newRow = { id: ++lastRowId };

          columns.forEach((col, index) => {
            newRow[col.field] = rowValues[index] || "";
          });

          newRows.push(newRow);
        } else {
          // Update existing row
          newRows[targetRowIndex] = { ...newRows[targetRowIndex] };

          for (let colOffset = 0; colOffset < rowValues.length; colOffset++) {
            const targetColIndex = startColIndex + colOffset;
            if (targetColIndex >= columns.length) break;

            const targetColField = columns[targetColIndex].field;
            newRows[targetRowIndex][targetColField] = rowValues[colOffset];
          }
        }
      }
    }

    setRows(newRows);
    console.log(newRows, "Updated rows after paste");
  };

  const quickFilterString = Array.isArray(quickFilterValue)
    ? quickFilterValue[0]
    : quickFilterValue;

  const results = rows
    .map((row, index) =>
      quickFilterString &&
      row.name.toLowerCase().includes(quickFilterString.toLowerCase())
        ? index
        : null
    )
    .filter((index) => index !== null);

  console.log("Quick Filter String:", quickFilterString);
  console.log("Results Array:", results);
  console.log(
    "Matching Row Names:",
    results.map((i) => rows[i]?.name)
  );

  console.log("Quick Filter Value:", quickFilterValue);
  console.log("Results Array:", results);
  console.log(
    "Matching Row Names:",
    results.map((i) => rows[i]?.name)
  );

  const handleReplace = () => {
    const quickFilterString = Array.isArray(quickFilterValue)
      ? quickFilterValue[0]
      : quickFilterValue;

    if (!quickFilterString || !replaceValue) {
      console.log(
        "No replacement: quickFilterValue or replaceValue is missing."
      );
      return;
    }

    // 🔥 Recalculate `results` inside the function
    const results = rows
      .map((row, index) =>
        quickFilterString && row.name.includes(quickFilterString) ? index : null
      )
      .filter((index) => index !== null);

    console.log("Replacing:", quickFilterString, "with:", replaceValue);
    console.log("Current Results:", results);

    const updatedRows = rows.map((row, index) => {
      if (results.includes(index)) {
        console.log(`Before Replacement: ${row.name}`);
        const newName = row.name.replace(
          new RegExp(quickFilterString, "gi"),
          replaceValue
        );
        console.log(`After Replacement: ${newName}`);
        return { ...row, name: newName };
      }
      return row;
    });

    console.log("Updated Rows Before SetState:", updatedRows);
    setRows([...updatedRows]); // ✅ This ensures state changes

    setTimeout(() => {
      console.log("State After Update:", rows); // ✅ Now it should be updated
    }, 100);
  };

  useEffect(() => {
    console.log("Updated rows state:", rows);
  }, [rows]);

  useEffect(() => {
    window.addEventListener("keydown", handleCopy);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keydown", handleCopy);
      window.removeEventListener("paste", handlePaste);
    };
  }, [selectedCells, rows]);
  const handleMouseDown = (params) => {
    const { id, field } = params;
    setStartCell({ id, field });
    setIsSelecting(true);
    setSelectedCells({ [`${id}-${field}`]: true });
    // console.log(params, 'this is all the params');
  };

  const handleMouseOver = (params) => {
    if (!isSelecting || !startCell) return;

    const { id, field } = params;
    console.log(id, field);
    const startRow = Math.min(startCell.id, id);
    const endRow = Math.max(startCell.id, id);
    const startColIndex = columns.findIndex(
      (col) => col.field === startCell.field
    );
    const endColIndex = columns.findIndex((col) => col.field === field);

    const updatedHoveredCells = {};
    for (let row = startRow; row <= endRow; row++) {
      for (
        let col = Math.min(startColIndex, endColIndex);
        col <= Math.max(startColIndex, endColIndex);
        col++
      ) {
        const cellField = columns[col].field;
        updatedHoveredCells[`${row}-${cellField}`] = true;
      }
    }

    setHoveredCells(updatedHoveredCells);
  };

  const handleMouseUp = (params) => {
    if (!startCell) return;

    const { id: endRow, field: endField } = params;
    const startRow = Math.min(startCell.id, endRow);
    const endRowMax = Math.max(startCell.id, endRow);
    const startColIndex = columns.findIndex(
      (col) => col.field === startCell.field
    );
    const endColIndex = columns.findIndex((col) => col.field === endField);

    const updatedSelectedCells = { ...selectedCells };
    for (let row = startRow; row <= endRowMax; row++) {
      for (
        let col = Math.min(startColIndex, endColIndex);
        col <= Math.max(startColIndex, endColIndex);
        col++
      ) {
        const cellField = columns[col].field;
        updatedSelectedCells[`${row}-${cellField}`] = true;
      }
    }

    setSelectedCells(updatedSelectedCells);
    setHoveredCells({});
    setStartCell(null);
    setIsSelecting(false);
  };

  const getCellClassName = (params) => {
    const { id, field } = params;
    const cellKey = `${id}-${field}`;

    if (copiedCells[cellKey]) return "copied"; // ✅ Apply copied class
    if (selectedCells[cellKey]) return "selected";
    if (hoveredCells[cellKey]) return "hovered";

    return "";
  };

  useEffect(() => {
    const handleMouseDownEvent = (params, event) =>
      handleMouseDown(params, event);
    const handleMouseOverEvent = (params) => handleMouseOver(params);
    const handleMouseUpEvent = (params) => handleMouseUp(params);

    if (apiRef.current) {
      console.log("apiRef.current.subscribeEvent:", apiRef);
    }

    const unsubscribeMouseDown = apiRef.current.subscribeEvent(
      "cellMouseDown",
      handleMouseDownEvent
    );
    const unsubscribeMouseMove = apiRef.current.subscribeEvent(
      "cellMouseOver",
      handleMouseOverEvent
    );
    const unsubscribeMouseUp = apiRef.current.subscribeEvent(
      "cellMouseUp",
      handleMouseUpEvent
    );

    return () => {
      unsubscribeMouseDown();
      unsubscribeMouseMove();
      unsubscribeMouseUp();
    };
  }, [apiRef, isSelecting, startCell, selectedCells, hoveredCells]);

  return (
    <MainContainer
      open={drawer}
      sx={{ backgroundColor: darkMode ? "auto" : "auto", userSelect: "none" }}
    >
      <div style={{ height: "auto", width: "auto", margin: 20 }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          apiRef={apiRef}
          getCellClassName={getCellClassName}
          disableRowSelectionOnClick
          onCellMouseOver={handleMouseOver}
          onPaste={handlePaste} // Use onPaste directly on the container that should handle pasting
          onFilterModelChange={onFilterChange}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterValues: quickFilterValue,
              },
            },
          }}
          slots={{
            columnMenu: CustomColumnMenu,
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          onCellEditStop={(params, event) => {
            // Stop editing when focus is lost or paste action happens
            if (
              params.reason === GridCellEditStopReasons.cellFocusOut ||
              params.reason === "paste"
            ) {
              event.defaultMuiPrevented = true;
            }
          }}
        />
      </div>
    </MainContainer>
  );
}
