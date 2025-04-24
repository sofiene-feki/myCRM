import { Box, Button, Typography } from "@mui/material";
import { gridRowCountSelector, useGridSelector } from "@mui/x-data-grid";
import { useState } from "react";

export function CustomFooter({ apiRef, createRandomRow, setRows }) {
  //const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const [rowCount, setRowCount] = useState(100); // Default to 1

  const handleAddRows = () => {
    const newRows = Array.from({ length: rowCount }, createRandomRow);
    setRows((prevRows) => [...prevRows, ...newRows]);
  };
  // Function to add user-defined count of rows

  const totalRowCount = useGridSelector(apiRef, gridRowCountSelector);

  return (
    <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
      <Box>
        <input
          type="number"
          min="1"
          value={rowCount}
          onChange={(e) => console.log(e.target.value)}
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
