import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainContainer } from '../../style/mainContainer';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, gridClasses } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomNoRowsOverlay } from '../../style/dataGrid';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { contractCreateColumns } from '../../components/dataGrid/columns';
import * as XLSX from 'xlsx';
import { createContract } from '../../functions/contract';





const ContractCreate = () => {
  const { drawer, user } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  let idCounter = 0;
  const createRandomRow = () => {
    idCounter += 1;
    const newRow = {
       
      contratRef: idCounter,
      ClientRef: '',
      Civility: '',
      Prénom: '',
      Nom: '',
      Tél: '',
      Email: '',
      Adresse: '',
      CodePotal: '',
      Commune: '',
      Energie: '',
      PDL: '',
      Puissance: '',
      Offre: '',
      Statut: '',
      Partenaire: '',
      DateDébut: new Date(),
      DateSignature: new Date(),
      Mensualité: '',
      isNew: true,
    };
    return newRow;
  };

  function CustomToolbar() {
    const handleAddRow = () => {
      const newRow = createRandomRow();
      setRows((prevRows) => [...prevRows, newRow]);
    };

    return (
      <GridToolbarContainer>
        <Button size="small" startIcon={<AddIcon />} onClick={handleAddRow}>
          Add a row
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary', cellDates: true });
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
      console.log(rows)
      setRows(rows);
    };
    reader.readAsBinaryString(file);
  };
  
  
  
  const handleReset = () => {
    setRows([]);
    console.log(user)
  };

  
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    createContract(rows, user.token)
      .then((res) => {
        setLoading(false);
        window.alert('Add New Data To db');
        setLoading(false);
        //window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainContainer open={drawer} sx={{backgroundColor : darkMode ? "auto"  : grey[100] }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          m: 2,
          width: 'auto',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Inserer un fichier
        </Typography>
        <Stack direction="row" spacing={2}>
          {rows && rows.length ? (
            <Button
              variant="outlined"
              component="label"
              startIcon={<CancelIcon />}
              onClick={handleReset}
            >
              Reset
            </Button>
          ) : (
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              disabled={uploadLoading}
            >
              importer
              <input hidden type="file" onChange={handleFileUpload} />
            </Button>
          )}

          <LoadingButton
            variant="contained"
            type="submit"
            startIcon={<SaveIcon />}
             onClick={handleSubmit}
            loading={loading}
            loadingPosition="start"
            disabled={!rows.length}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 150px)',
          width: '100%',
        }}
      >
        <DataGrid
          rows={rows}
          columns={contractCreateColumns}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            toolbar: CustomToolbar,
          }}
          getRowSpacing={getRowSpacing}
          disableRowSelectionOnClick
          getRowId={(row) => row.contratRef}
          sx={{
            m: 2,
            boxShadow: 3,
            border: 2,
            borderColor: grey[200],
           backgroundColor : darkMode ? "auto"  : "white"
          }}
        />
      </Box>
    </MainContainer>
  );
};

export default ContractCreate;
