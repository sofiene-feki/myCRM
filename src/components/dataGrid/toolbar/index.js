import React, { useState } from "react";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import UploadIcon from "@mui/icons-material/Upload";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Tools Icon (replace as needed)
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useSelector, useDispatch } from "react-redux";

import { AutoAwesomeMotion, StopRounded } from "@mui/icons-material";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import NewLabelIcon from "@mui/icons-material/Label";
import {
  setReplaceValue,
  toggleReplace,
} from "../../../reducers/replaceReducer";
import { grey } from "@mui/material/colors";

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
  backgroundColor: grey[300], // Dark background
  color: "#000000", // White text
  borderRadius: "8px", // Rounded edges
  fontWeight: 600,
  fontSize: "0.775rem", // Slightly smaller text
  textTransform: "none",
  padding: "6px 16px",
  border: "1px solid #ccc", // Light border for contrast
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
  },
  "&:active": {
    transform: "scale(0.95)", // Shrinks slightly when clicked
  },
};

function CustomToolbar({
  rows,
  setRows,
  handleFileUpload,
  handleRedo,
  handleUndo,
  historyIndex,
  history,
  disabled,
  tableName,
}) {
  const dispatch = useDispatch();
  const { showReplace, replaceValue } = useSelector((state) => state.replace);
  const { quickFilter } = useSelector((state) => ({ ...state }));

  const handleReplace = () => {
    const quickFilterString = Array.isArray(quickFilter?.text)
      ? quickFilter.text[0]
      : quickFilter?.text;

    if (!quickFilterString || !replaceValue) {
      console.warn(
        "⚠️ No replacement: quickFilterString or replaceValue is missing."
      );
      return;
    }

    console.log(
      `🔄 Replacing '${quickFilterString}' with '${replaceValue}' across all fields.`
    );

    const updatedRows = rows.map((row) => {
      let updatedRow = { ...row };

      Object.keys(row).forEach((key) => {
        if (
          typeof row[key] === "string" &&
          row[key].includes(quickFilterString)
        ) {
          updatedRow[key] = row[key].replace(
            new RegExp(quickFilterString, "gi"),
            replaceValue
          );
        }
      });

      return updatedRow;
    });

    console.log("✅ Updated Rows:", updatedRows);
    setRows(updatedRows); // Update the state with modified rows
  };

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: "column", // Stack children vertically
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
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
              onChange={handleFileUpload}
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
            background: grey[300], // Dark background
            padding: "2px",
            borderLeft: "2px solid #fff", // Left gray border
            borderRadius: "8px", // Rounded edges
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
              sx={{
                m: 0.5,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                "&:active": {
                  transform: "scale(0.95)", // Shrinks slightly when clicked
                },
              }} // Dark background
              onClick={() => dispatch(toggleReplace())}
            >
              {showReplace ? (
                <ExpandLessIcon sx={{ fontSize: "small" }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: "small" }} />
              )}
            </IconButton>

            <GridToolbarQuickFilter
              variant="outlined"
              size="small"
              sx={{
                height: "32px",
                flex: 1,
                minWidth: "200px",
                input: {
                  padding: "6px 8px",
                  height: "32px",
                  "&::placeholder": { color: "#999" },
                },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff", // Dark background

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
            <Typography variant="caption" m={1}>
              No results
            </Typography>

            <IconButton
              size="small"
              sx={{
                mr: 1,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                "&:active": {
                  transform: "scale(0.95)", // Shrinks slightly when clicked
                },
              }}
            >
              <SouthIcon sx={{ fontSize: "small" }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
                "&:active": {
                  transform: "scale(0.95)", // Shrinks slightly when clicked
                },
              }}
            >
              <NorthIcon sx={{ fontSize: "small" }} />
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
              <Box sx={{ width: "24px", minWidth: "24px" }} />
              <TextField
                type="search"
                variant="outlined"
                size="small"
                placeholder="Replace"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FindReplaceIcon
                          fontSize="small"
                          sx={{ color: "black" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                value={replaceValue}
                onChange={(e) => dispatch(setReplaceValue(e.target.value))}
                sx={{
                  // flex: 1,
                  minWidth: "200px",
                  // borderLeft: "2px solid #666", // Left gray border
                  // paddingLeft: "8px",
                  input: {
                    padding: "6px 8px",
                    height: "32px",
                    "&::placeholder": { color: "#999" },
                  },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#fff",

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
                  // color: "#fff", // Icon color
                  width: 24, // Size similar to Floating Action Button
                  height: 24,
                  borderRadius: "50%", // Ensures roundness
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
                  transition: "all 0.3s ease",
                  "&:hover": {
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
                onClick={handleReplace}
                size="small"
                sx={{
                  // color: "#fff", // Icon color
                  width: 24, // Size similar to Floating Action Button
                  height: 24,
                  borderRadius: "50%", // Ensures roundness
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
                  transition: "all 0.3s ease",
                  "&:hover": {
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
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip label={tableName} size="small" variant="outlined" />

          <IconButton
            size="small"
            aria-label="delete"
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            <UndoIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            aria-label="delete"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
          >
            <RedoIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={1}>
          <IconButton disabled={disabled} aria-label="delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton disabled={disabled} size="small" aria-label="delete">
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton disabled={disabled} size="small" aria-label="delete">
            <NewLabelIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
