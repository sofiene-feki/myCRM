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
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  DataGrid,
  GridCellEditStopReasons,
  GridColumnMenu,
  gridRowCountSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MainContainer } from "../../style/mainContainer";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import * as XLSX from "xlsx";
import CustomToolbar from "../../components/dataGrid/toolbar";
import { tr } from "date-fns/locale";
import { useParams } from "react-router-dom";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { useGridSelector } from "@mui/x-data-grid";
import { CustomFooter } from "../../components/dataGrid/footer";
import { debounce } from "lodash";
import { GridVirtualScroller } from "@mui/x-data-grid/internals";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-scrollbarContent": {
    height: "var(--scroll-height)",
  },

  border: 0,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",

  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: "#1d1d1d",
    ...(theme.applyStyles &&
      theme.applyStyles("light", {
        backgroundColor: "#fafafa",
      })),
  },

  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-withBorderColor": {
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Floating effect
  },

  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    backgroundColor: theme.palette.mode === "dark" ? "auto" : "white",
    border: "1px solid #303030",

    ...(theme.applyStyles &&
      theme.applyStyles("light", {
        borderColor: "#f0f0f0",
      })),
  },

  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: "1px solid #303030",

    ...(theme.applyStyles &&
      theme.applyStyles("light", {
        borderBottomColor: "#f0f0f0",
      })),
  },

  "& .MuiDataGrid-cell": {
    color: "rgba(255,255,255,0.65)",

    ...(theme.applyStyles &&
      theme.applyStyles("light", {
        color: "rgba(0,0,0,.85)",
      })),
  },

  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },

  "& .hovered": {
    backgroundColor: "rgba(194, 231, 255, 0.6) !important", // Transparent Light Blue
  },
  "& .copied": {
    border: "1px dashed rgba(33, 150, 243, 0.6) !important",
  },
  "& .selected": {
    backgroundColor: "rgba(194, 231, 255, 0.6) !important",
    border: "1px solid rgba(33, 150, 243, 0.1) !important",
  },
  "& .copied.selected": {
    backgroundColor: "rgba(194, 231, 255, 0.6) !important",
    border:
      "1px dashed rgba(33, 150, 243, 0.6) !important" /* override the solid border */,
  },
  "& .highlight-cell": {
    color: "black !important",
    fontWeight: "bold",
  },

  "& .active-match": {
    backgroundColor: "yellow !important",
    fontWeight: "bold",
    color: "black",
  },
}));

let idCounter = 0;

const WINDOW_SIZE = 100;
const TOTAL_ROWS = 1000;
const ROW_HEIGHT = 52;
const MAX_SCROLL_HEIGHT = 224250; // fixed scroll range

// Function to generate a random row
const createRow = (index) => ({
  id: index,
});

export default function RobustCellSelectionExample() {
  const [selectedCells, setSelectedCells] = useState({});
  const [hoveredCells, setHoveredCells] = useState({});
  const [isSelecting, setIsSelecting] = useState(false);
  const [copiedCells, setCopiedCells] = useState({});
  const [editable, setEditable] = useState(false);
  const [loadedIndexes, setLoadedIndexes] = useState(new Set());
  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([[]]); // Initial empty history
  const [historyIndex, setHistoryIndex] = useState(0);
  const [startCell, setStartCell] = useState(null);
  const [columns, setColumns] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const historyRef = useRef([]);
  const historyIndexRef = useRef(0);

  const debouncedUpdateRows = useCallback(
    debounce((newRows) => {
      setHistory((prev) => {
        const newHistory = historyRef.current.slice(
          0,
          historyIndexRef.current + 1
        );
        newHistory.push(newRows);
        historyRef.current = newHistory;
        return newHistory;
      });
      setHistoryIndex((prev) => {
        historyIndexRef.current = prev + 1;
        return prev + 1;
      });
      setRows(newRows);
    }, 300),
    [historyIndex]
  );

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);

  useEffect(() => {
    return () => {
      debouncedUpdateRows.cancel();
    };
  }, [debouncedUpdateRows]);

  const { tableName } = useParams(); // Extract the dynamic table name from the URL
  const apiRef = useGridApiRef();
  const { drawer, user } = useSelector((state) => ({ ...state }));
  const { quickFilter } = useSelector((state) => state); // Assuming state.quickFilter exists

  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const tableRef = useRef(null);

  useEffect(() => {
    //console.log(tableName, "this is the table name");
    const handleClickOutside = (event) => {
      if (!tableRef.current) return;

      const gridRoot = tableRef.current;
      const clickedElement = event.target;

      // Check if the clicked element is inside a row
      const isRowClick = clickedElement.closest(".MuiDataGrid-row");

      if (!isRowClick) {
        setSelectedCells({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const dispatch = useDispatch();

  const onFilterChange = useCallback(
    (filterModel) => {
      // Here you save the data you need from the filter model
      const value = filterModel.quickFilterValues[0];
      //    console.log("Quick Filter from DataGrid ============>:", filterModel); // Add this log to inspect the value
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: value },
      });
    },
    [dispatch]
  );

  const visibleRows = rows.map((row, index) => ({
    ...row,
    rowIndex: index + 1, // Assigns row numbers from 1 to total rows
  }));

  const columnDefinitions = {
    clientsTable: [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 100,
        editable,
      },
      {
        field: "age",
        headerName: "Age",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "address",
        headerName: "Address",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "occupation",
        headerName: "Occupation",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "country",
        headerName: "Country",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
    ],
    ordersTable: [
      {
        field: "orderId",
        headerName: "Order ID",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "customer",
        headerName: "Customer",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "total",
        headerName: "Total",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
    ],
    NewWorkTable: [
      {
        field: "A",
        headerName: "A",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "B",
        headerName: "B",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "C",
        headerName: "C",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "D",
        headerName: "D",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "E",
        headerName: "E",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "F",
        headerName: "F",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },

      {
        field: "G",
        headerName: "G",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "H",
        headerName: "H",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "J",
        headerName: "J",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
      {
        field: "K",
        headerName: "K",
        flex: 1,
        minWidth: 100,
        editable: editable,
      },
    ],

    energyTable: [
      {
        field: "contratRef",
        headerName: "Contrat Ref",
        editable: editable,
      },
      {
        field: "clientRef",
        headerName: "Client Ref",
        editable: editable,
      },
      {
        field: "Civility",
        headerName: "Civility",
        editable: editable,
      },
      {
        field: "Prénom",
        headerName: "Prénom",
        editable: editable,
      },
      {
        field: "Nom",
        headerName: "Nom",
        editable: editable,
      },
      {
        field: "Tél",
        headerName: "Tél",
        editable: editable,
      },
      {
        field: "Email",
        headerName: "Email",
        editable: editable,
      },
      {
        field: "Adresse",
        headerName: "Adresse",
        editable: editable,
      },
      {
        field: "Code_postal",
        headerName: "Code postal",
        editable: editable,
      },
      {
        field: "Commune",
        headerName: "Commune",
        editable: editable,
      },
      {
        field: "energie",
        headerName: "Energie",
        editable: editable,
      },
      {
        field: "Point_de_livraison",
        headerName: "PDL",
        editable: editable,
      },
      {
        field: "Puissance",
        headerName: "Puissance",
        editable: editable,
      },
      {
        field: "Offre",
        headerName: "Offre",
        editable: editable,
      },
      {
        field: "Statut",
        headerName: "Statut",
        editable: editable,
      },
      {
        field: "Nom_du_partenaire",
        headerName: "Partenaire",
        editable: editable,
      },

      {
        field: "date_de_début",
        headerName: "Date début",
        editable: editable,
        type: "dateTime",
        // valueFormatter: ({ value }) =>
        //   moment(new Date(value)).format("DD/MM/YYYY "),
      },
      {
        field: "date_de_la_signature",
        headerName: "Date signature",
        editable: editable,
        type: "dateTime",
        // valueFormatter: ({ value }) =>
        //   moment(new Date(value)).format("DD/MM/YYYY "),
      },
      {
        field: "Type_de_contrat",
        headerName: "Type de contrat",
        editable: editable,
      },
      {
        field: "Mensualité",
        headerName: "Mensualité",
        editable: editable,
      },
      {
        field: "Fournisseur",
        headerName: "Fournisseur",
        editable: editable,
      },
      {
        field: "Mode_facturation",
        headerName: "Mode de facturation",
        editable: editable,
      },
      {
        field: "Option_tarifaire",
        headerName: "Option tarifaire",
        editable: editable,
      },
      {
        field: "Date_naissance",
        headerName: "Date de naissance",
        editable: editable,
        // valueFormatter: ({ value }) =>
        //   moment(new Date(value)).format("DD/MM/YYYY "),
      },
    ],
  };

  const containerRef = useRef(null);
  const scrollLockRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  const lastTimestampRef = useRef(performance.now());

  const fetchRows = (start, limit) => {
    return rows.slice(start, start + limit);
  };

  const loadRows = async (start) => {
    const end = Math.min(start + WINDOW_SIZE, TOTAL_ROWS);

    const newRows = [...rows];

    const indexesToLoad = [];
    for (let i = start; i < end; i++) {
      if (!loadedIndexes.has(i)) {
        indexesToLoad.push(i);
      }
    }

    if (indexesToLoad.length > 0) {
      const fetchedData = await fetchRows(
        indexesToLoad[0],
        indexesToLoad.length
      );

      indexesToLoad.forEach((idx, i) => {
        newRows[idx] = fetchedData[i];
      });

      const updatedIndexes = new Set(loadedIndexes);
      indexesToLoad.forEach((i) => updatedIndexes.add(i));

      setRows(newRows);
      setLoadedIndexes(updatedIndexes);
    }
  };

  const handleScroll = (e) => {
    const top = e.target.scrollTop;
    const now = performance.now();
    const deltaTop = top - lastScrollTopRef.current;
    const deltaTime = now - lastTimestampRef.current;
    const scrollSpeed = deltaTime > 0 ? deltaTop / deltaTime : 0;

    const predictionTime = 500;
    const predictedTop = top + scrollSpeed * predictionTime;
    const predictedIndex = Math.floor(predictedTop / ROW_HEIGHT);
    const clampedIndex = Math.max(
      0,
      Math.min(
        predictedIndex - Math.floor(WINDOW_SIZE / 2),
        TOTAL_ROWS - WINDOW_SIZE
      )
    );

    lastScrollTopRef.current = top;
    lastTimestampRef.current = now;

    // console.log({ top, predictedTop, predictedIndex, clampedIndex });

    if (!scrollLockRef.current) {
      scrollLockRef.current = true;

      loadRows(clampedIndex);

      setTimeout(() => {
        scrollLockRef.current = false;
      }, 100);
    }
  };

  useEffect(() => {
    const gridContainer = document.querySelector(
      ".MuiDataGrid-virtualScroller"
    );
    containerRef.current = gridContainer;

    if (gridContainer) {
      gridContainer.addEventListener("scroll", handleScroll);
    }

    // Load initial
    // loadRows(0);

    return () => {
      if (gridContainer) {
        gridContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const rowsWithStableId = rows.map((row, index) => ({
    ...row,
    id: index, // 👈 Stable ID
  }));

  const handleCopy = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "c") {
      setEditable(false);

      event.preventDefault();

      // console.log(selectedCells, "check line");

      const selectedRows = {};
      const copiedState = {}; // New object to track copied cells
      const rowsMap = new Map();
      for (const row of rowsWithStableId) {
        if (row && row.id !== undefined) {
          rowsMap.set(row.id.toString(), row);
        }
      }
      Object.keys(selectedCells).forEach((key) => {
        const [rowId, field] = key.split("-");
        if (!selectedRows[rowId]) selectedRows[rowId] = {};
        selectedRows[rowId][field] = rowsMap.get(rowId)?.[field]; // Faster lookup
        copiedState[key] = true;
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
        // console.log("Copied to clipboard:", htmlContent);
      });
    }
  };

  const handlePaste = (event) => {
    setEditable(false);
    event.preventDefault();
    console.log(selectedCells, "this is the selected cells");
    if (Object.keys(selectedCells).length === 0) return;

    // Get pasted data
    const pastedData = event.clipboardData.getData("text/plain").trim();

    // Determine if a single cell is copied
    const isSingleValue =
      !pastedData.includes("\n") && !pastedData.includes("\t");
    console.log(pastedData, "this is the pasted data");
    let newRows = [...rows];

    if (isSingleValue) {
      // Paste single value into all selected cells
      Object.keys(selectedCells).forEach((cellKey) => {
        const [rowId, colField] = cellKey.split("-");
        const rowIndex = rowsWithStableId.findIndex(
          (row) => row && row.id === parseInt(rowId, 10)
        );
        //console.log(rowIndex, "this is the row index");
        if (rowIndex !== -1) {
          newRows[rowIndex] = { ...newRows[rowIndex], [colField]: pastedData };
        }
      });
    } else {
      console.log(pastedData, "this is the pastedData ");

      // Multi-cell paste logic
      const firstSelectedKey = Object.keys(selectedCells)[0];
      const [startRowId, startColField] = firstSelectedKey.split("-");

      const startRowIndex = rowsWithStableId.findIndex(
        (row) => row && row.id === parseInt(startRowId, 10)
      );

      const startColIndex = columns.findIndex(
        (col) => col.field === startColField
      );

      if (startRowIndex === -1 || startColIndex === -1) return;

      const pastedRows = pastedData
        .split("\n")
        .map((row) => row.split("\t").map((cell) => cell.trim()));

      let lastRowId =
        rowsWithStableId.length > 0
          ? Math.max(...rowsWithStableId.map((row) => row.id))
          : 0;

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

    debouncedUpdateRows(newRows);
    // console.log(newRows, "Updated rows after paste");
  };

  const processRowUpdate = (newRow) => {
    if (!newRow || newRow.id == null) {
      console.warn("Invalid newRow passed to processRowUpdate:", newRow);
      return;
    }

    setRows((prevRows) => {
      const updatedRows = [...prevRows];

      if (!updatedRows[newRow.id]) {
        // Fetch missing data if needed
        updatedRows[newRow.id] = fetchRows(newRow.id, 1)[0];
      }

      updatedRows[newRow.id] = newRow;

      debouncedUpdateRows(updatedRows);
      return updatedRows;
    });

    return newRow;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCopy);
    if (Object.keys(selectedCells).length === 0) return;

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keydown", handleCopy);
      window.removeEventListener("paste", handlePaste);
    };
  }, [selectedCells, rows]);

  const handleMouseDown = (params) => {
    const { id, field } = params;
    setStartCell({ id, field });
    console.log(id, field, "this is the start cell");
    setIsSelecting(true);
    setSelectedCells({ [`${id}-${field}`]: true });
    // console.log(params, 'this is all the params');
  };

  const getCellClassName = (params) => {
    const { id, field, rowIndex } = params;
    const cellKey = `${id}-${field}`;
    const filterText = quickFilter?.text?.toLowerCase();

    let classNames = [];

    if (copiedCells?.[cellKey]) classNames.push("copied");
    if (selectedCells?.[cellKey]) classNames.push("selected");
    if (hoveredCells?.[cellKey]) classNames.push("hovered");

    if (
      filterText &&
      params.value?.toString().toLowerCase().includes(filterText)
    ) {
      classNames.push("highlight-cell");
    }

    if (
      matchIndex >= 0 &&
      matchingCellPositions?.[matchIndex]?.rowIndex === params.rowIndex &&
      matchingCellPositions?.[matchIndex]?.field === params.field
    ) {
      classNames.push("active-match");
    }

    return classNames.join(" ");
  };

  useEffect(() => {
    const handleMouseDownEvent = (params, event) =>
      handleMouseDown(params, event);
    const handleMouseOverEvent = (params) => handleMouseOver(params);
    const handleMouseUpEvent = (params) => handleMouseUp(params);

    // if (apiRef.current) {
    //   console.log("apiRef.current.subscribeEvent:", apiRef);
    // }

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
  const handleCellEditStop = (params, event) => {
    if (params.reason === "blur") {
      apiRef.current.stopCellEditMode({ id: params.id, field: params.field });
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setRows(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setRows(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }

      if (ctrlKey && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo, historyIndex, history]);

  useEffect(() => {
    // Set the columns based on the table name from the URL
    if (columnDefinitions[tableName]) {
      setColumns(columnDefinitions[tableName]);
    } else {
      setColumns([]);
    }
  }, [tableName, editable]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary", cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headers = excelData[0];
      const rows = excelData.slice(1).map((row) => {
        return headers.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {});
      });
      console.log(rows);
      debouncedUpdateRows(rows);
    };
    reader.readAsBinaryString(file);
  };

  const handleReset = () => {
    setRows([]);
    console.log(user);
  };
  const handleDeleteSelected = () => {
    console.log("Selected Row IDs to delete:", rowSelectionModel);

    const newFilteredRows = rows.filter((_, index) => {
      const isSelected = rowSelectionModel.includes(index);
      console.log(`Checking row index ${index} - selected? ${isSelected}`);
      return !isSelected;
    });

    console.log("Rows before deletion:", rows);
    console.log("Rows after deletion:", newFilteredRows);

    // Call the debounced history-aware updater
    debouncedUpdateRows(newFilteredRows);

    // Clear selection
    setRowSelectionModel([]);
  };

  // This should be done once, where you fetch/process data
  const processedRows = rows.map((row, index) => ({
    ...row,
    id: index, // ✅ stable id
    rowIndex: index + 1, // 1-based row index
  }));
  const rowIdToRowMap = useMemo(() => {
    const map = new Map();
    processedRows.forEach((row) => {
      map.set(row.id, row);
    });
    return map;
  }, [processedRows]);

  const handleMouseOver = (params) => {
    if (!isSelecting || !startCell) return;
    const { id, field } = params;

    const startRow = rowIdToRowMap.get(startCell.id)?.rowIndex;
    const endRow = rowIdToRowMap.get(id)?.rowIndex;

    if (startRow === undefined || endRow === undefined) return;

    const [minRow, maxRow] = [startRow, endRow].sort((a, b) => a - b);
    const startColIndex = columns.findIndex(
      (col) => col.field === startCell.field
    );
    const endColIndex = columns.findIndex((col) => col.field === field);

    const updatedHoveredCells = {};

    processedRows.forEach((row) => {
      if (row.rowIndex >= minRow && row.rowIndex <= maxRow) {
        for (
          let col = Math.min(startColIndex, endColIndex);
          col <= Math.max(startColIndex, endColIndex);
          col++
        ) {
          const cellField = columns[col].field;
          updatedHoveredCells[`${row.id}-${cellField}`] = true;
        }
      }
    });

    setEditable(false);
    setHoveredCells(updatedHoveredCells);
  };

  const handleMouseUp = (params) => {
    if (!startCell) return;
    const { id: endId, field: endField } = params;

    const startRow = rowIdToRowMap.get(startCell.id)?.rowIndex;
    const endRow = rowIdToRowMap.get(endId)?.rowIndex;

    if (startRow === undefined || endRow === undefined) return;

    const [minRow, maxRow] = [startRow, endRow].sort((a, b) => a - b);
    const startColIndex = columns.findIndex(
      (col) => col.field === startCell.field
    );
    const endColIndex = columns.findIndex((col) => col.field === endField);

    const updatedSelectedCells = { ...selectedCells };

    processedRows.forEach((row) => {
      if (row.rowIndex >= minRow && row.rowIndex <= maxRow) {
        for (
          let col = Math.min(startColIndex, endColIndex);
          col <= Math.max(startColIndex, endColIndex);
          col++
        ) {
          if (columns[col]) {
            const cellField = columns[col].field;
            updatedSelectedCells[`${row.id}-${cellField}`] = true;
          }
        }
      }
    });

    setSelectedCells(updatedSelectedCells);
    setHoveredCells({});
    setStartCell(null);
    setIsSelecting(false);
  };

  const totalHeight = rows.length * ROW_HEIGHT;

  const lowerFilter = quickFilter?.text?.toLowerCase() || "";

  const [matchIndex, setMatchIndex] = useState(0);

  const matchingCellPositions = useMemo(() => {
    if (!lowerFilter) return [];

    return rows.flatMap((row, rowIndex) => {
      if (!row || typeof row !== "object") return [];
      return Object.entries(row).flatMap(([field, val]) =>
        val?.toString().toLowerCase().includes(lowerFilter)
          ? [{ rowIndex, field }]
          : []
      );
    });
  }, [rows, lowerFilter]);

  return (
    <MainContainer
      open={drawer}
      sx={{
        backgroundColor: darkMode ? "auto" : grey[200],
      }}
    >
      <div
        style={{ width: "auto", height: "calc(100vh - 110px)", margin: 20 }}
        ref={tableRef}
      >
        <StyledDataGrid
          rowCount={rows.length}
          pageSize={WINDOW_SIZE}
          paginationMode="server"
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={rowsWithStableId}
          onCellDoubleClick={() => setEditable(true)}
          columns={columns}
          apiRef={apiRef}
          onCellEditStop={handleCellEditStop}
          processRowUpdate={processRowUpdate} // Ensures data is updated
          editMode="cell"
          getRowId={(row) => row.id}
          getCellClassName={getCellClassName}
          disableRowSelectionOnClick
          onCellMouseOver={handleMouseOver}
          onPaste={handlePaste} // Use onPaste directly on the container that should handle pasting
          onFilterModelChange={onFilterChange}
          sx={{
            m: 2,
            boxShadow: 3,
            border: 2,
            borderColor: grey[200],
            "--scroll-height": `${totalHeight}px`,
          }}
          style={{
            "--scroll-height": `${totalHeight}px`,
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilters: quickFilter,
              },
            },
          }}
          slots={{
            toolbar: CustomToolbar,
            footer: CustomFooter,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              rows,
              setRows,
              handleFileUpload,
              handleRedo,
              handleUndo,
              historyIndex,
              history,
              tableName,
              handleDeleteSelected,
              debouncedUpdateRows,
              rowSelectionModel,
              apiRef,
              matchIndex,
              setMatchIndex,
              matchingCellPositions,
            },
            footer: {
              apiRef,
              createRow,
              setRows,
              rows,
              debouncedUpdateRows,
              historyIndexRef,
              setHistoryIndex,
              historyRef,
              setHistory,
            },
          }}
        />
      </div>
    </MainContainer>
  );
}
