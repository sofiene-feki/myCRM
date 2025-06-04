import { Box, Button, Typography } from "@mui/material";
import {
  gridFilteredSortedRowIdsSelector,
  gridRowCountSelector,
  useGridSelector,
} from "@mui/x-data-grid";
import { useState } from "react";

export function CustomFooter({
  apiRef,
  createRow,
  setRows,
  rows,
  debouncedUpdateRows,
  historyIndexRef,
  setHistoryIndex,
  historyRef,
  setHistory,
}) {
  //const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const [rowCount, setRowCount] = useState(1); // Default to 1

  const handleAddRows = () => {
    const newRows = Array.from({ length: rowCount }, createRow);

    setRows((prevRows) => {
      const updatedRows = [...prevRows, ...newRows];

      // Update history synchronously with rows
      setHistory((prevHistory) => {
        // Cut off future redo history if any
        const newHistory = historyRef.current.slice(
          0,
          historyIndexRef.current + 1
        );
        newHistory.push(updatedRows);

        // Update ref for consistency
        historyRef.current = newHistory;

        // Update historyIndex state and ref
        setHistoryIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          historyIndexRef.current = newIndex;
          return newIndex;
        });

        return newHistory;
      });

      return updatedRows;
    });
  };

  // Function to add user-defined count of rows

  const totalRowCount =
    useGridSelector(apiRef, gridFilteredSortedRowIdsSelector)?.length || 0;

  return (
    <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
      <Box>
        <input
          type="number"
          min="1"
          max="1000"
          value={rowCount}
          onChange={(e) =>
            setRowCount(Math.max(1, parseInt(e.target.value) || 1))
          }
          style={{ marginBottom: 10, padding: 5 }}
        />
        <Button onClick={handleAddRows} style={{ marginLeft: 10, padding: 5 }}>
          Add Rows
        </Button>
      </Box>

      <Typography variant="subtitle2" sx={{ pt: 1 }}>
        <strong>{totalRowCount} </strong> résultats
      </Typography>
    </Box>
  );
}
