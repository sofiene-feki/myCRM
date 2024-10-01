import { useState } from 'react';
import moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector } from 'react-redux';
import { getContractsExport } from '../../../functions/contract';

const Export = () => {

  const {filters, user} = useSelector((state) => ({...state}))

  const [loading, setLoading] = useState(false);
  const handleDownloadClick = () => {
    setLoading(true);
    getContractsExport(filters)
      .then((response) => {
        const data = response.data;
        // Create a new array with correct headers
        const newData = data.map((contract) => ({
          QualificationQalité: contract.quality?.qualification || '',
          QualificationSav: contract.sav?.qualification || '',
          QualificationWc: contract.wc?.qualification || '',
          contratRef: contract.contratRef,
          clientRef: contract.clientRef,
          Civility: contract.Civility,
          Prénom: contract.Prénom,
          Nom: contract.Nom,
          Email: contract.Email,
          Tél: contract.Tél,
           Date_naissance:
            contract.Date_naissance &&
            moment(contract.Date_naissance).format("YYYY"),
          mensualité: contract.Mensualité,
          Adresse: contract.Adresse,
          CodePostal: contract.Code_postal,
          Commune: contract.Commune,
          Énergie: contract.energie,
          PDL: contract.Point_de_livraison,
          Puissance: contract.Puissance,
          offre: contract.Offre,
          statut: contract.Statut,
          partenaire: contract.Nom_du_partenaire,
          Type_de_contrat:contract.Type_de_contrat,
          date_début: moment(contract.date_de_début).format('DD/MM/YYYY'),
          date_signature:moment(contract.date_de_la_signature).format('DD/MM/YYYY'),
          date_de_creation: moment(contract.createdAt).format('DD/MM/YYYY HH:mm:ss'),
          dateMAJ: moment(contract.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
        
        }));

        const jsonSheet = XLSX.utils.json_to_sheet(newData, {
          dateNF: 'yyyy-mm-dd',
          cellDates: true,
          strip: false,
          blankrows: true,
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, jsonSheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    {user && (user.role === 'admin') ? (

      <LoadingButton
        loading={loading}
        loadingPosition="start"
        size="small"
        startIcon={<FileDownloadIcon />}
        onClick={handleDownloadClick}
      >
        Exporter
      </LoadingButton>
          ) : null}
    </>
  );
};

export default Export;
