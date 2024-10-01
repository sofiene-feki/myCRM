import React, { useEffect, useState } from 'react';
import DraggableDialog from '../dialog';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { SupportAgent } from '@mui/icons-material';
import { updateContractWc } from '../../functions/contract';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const initialQualification = [
  'aucun(e)',
  'Validé',
  'Répondeur',
  'Appel raccrocher',
  'A suivre',
  'Refus de répondre',
  'Rappel',
  'Fiche blanche',
  'Stop télémarketing',
  'SAV',
  'Faux numéro',
  'Client toujours injoignable suite à un rappel planifié',
  'annulation',
  'fiche déjà qualifiee par SAV / Qualité',
  'fiche dépasse les 14 jours',
  'le client a +75 ans',
];

const initialAnnuleQualification = [
  "Annulation n'est pas faite par le client ( mail d'annulation envoyé au client )",
  "Client n'a pas donné son aval pour valider le contrat",
  "Client n'est pas d'accord pour la date du prélèvement ( 5 de chaque mois )",
  "Client n'est pas informé par la date d'activation ( après 9 mois)",
  "Client n'est pas informé par le changement de fournisseur",
  'Client ne souhaite pas activer son contrat après trois mois',
  'Client souhaite garder son fournisseur',
  'Contrat en double',
  'Information erronée et ou manquante',
  'Mauvaise image de fournisseur',
  'Offre plus compétitive',
  "Pb Etat d'esprit ou de santé du clt lors de la validation",
  'PDL et ou PCE erroné',
  'Problème de mensualité',
  "Problème de prélèvement : client ne souhaite pas être prélevé à l'avance",
  'Refus client de communiquer le motif de la résiliation',
  'SC indisponible par tél',
  'Forcing',
  'Hors cible',
  'Déménagement',
  'Iban frauduleux',
  'fiche annulé par le systéme',
];

const QualificationWc = ({ data }) => {
  const { slug, energie } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  const [qualificationsWc, setQualificaionsWc] = useState({
    comment: data.comment ?? '',
    qualification: data.qualification ?? '',
    AnnuleRaison: data.AnnuleRaison ?? '',
    user: user.displayName,
  });

  const [open, setOpen] = useState(false);

  const handleQualificationChange = (event) => {
    setQualificaionsWc({
      ...qualificationsWc,
      [event.target.name]: event.target.value,
    });
  };

  const handleCommentChange = (event) => {
    setQualificaionsWc({
      ...qualificationsWc,
      comment: event.target.value,
    });
  };

  useEffect(() => {
    console.log(data);
    setQualificaionsWc((prevState) => ({
      ...prevState,
      comment: data.comment ?? '',
      qualification: data.qualification ?? '',
      AnnuleRaison: data.subQualification ?? '',
    }));
  }, [data]);

  const handleApply = (e) => {
    e.preventDefault();
    toast
      .promise(updateContractWc(slug, energie, qualificationsWc, user.token), {
        pending: {
          render() {
            return 'Updating Contract...';
          },
          icon: '🔄',
          // You can also set the autoClose option to false to keep the toast open
          // while the Promise is pending.
        },
        success: {
          render() {
            return 'Contract Updated Successfully!';
          },
          // other options
          icon: '👍',
        },
        error: {
          render({ data }) {
            // When the Promise rejects, data will contain the error
            return `Error: ${data.message}`;
          },
          // other options
          icon: '❌',
        },
      })
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const content = (
    <Stack spacing={2} width={400} mt={1}>
      <TextField
        fullWidth
        label="Commentaire"
        id="Commentaire"
        multiline
        onChange={handleCommentChange}
        value={qualificationsWc.comment}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Qualificaion"
          value={qualificationsWc.qualification}
          onChange={handleQualificationChange}
          name="qualification"
        >
          {initialQualification.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {qualificationsWc && qualificationsWc.qualification === 'annulation' && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Raison d'annulation
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Raison d'annulation"
            value={qualificationsWc.AnnuleRaison}
            onChange={handleQualificationChange}
            name="AnnuleRaison"
          >
            {initialAnnuleQualification.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Stack>
  );
  return (
    <>
      {user && (user.role === 'admin' || user.role === 'wc') ? (
        <DraggableDialog
          variant="contained"
          startIcon=""
          chipIcon={<SupportAgent />}
          buttonText="welcome call"
          title="welcome call"
          text={content}
          handleApply={handleApply}
          setOpen={setOpen}
          open={open}
        />
      ) : null}
    </>
  );
};

export default QualificationWc;
