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
import { SupervisorAccount } from '@mui/icons-material';
import { updateContractSav } from '../../functions/contract';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const initialQualification = [
  'aucun(e)',
  'validé',
  'annulation',
  'A relancer',
  'délais dépassé',
];

const QualificationSav = ({ data }) => {
  const { slug, energie } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [open, setOpen] = useState(false);

  const [qualificationsSav, setQualificaionsSav] = useState({
    comment: data.comment ?? '',
    qualification: data.qualification ?? '',
    user: user.displayName,
  });

  const handleQualificationChange = (event) => {
    setQualificaionsSav({
      ...qualificationsSav,
      qualification: event.target.value,
    });
  };

  const handleCommentChange = (event) => {
    setQualificaionsSav({
      ...qualificationsSav,
      comment: event.target.value,
    });
  };

  useEffect(() => {
    setQualificaionsSav((prevState) => ({
      ...prevState,
      comment: data.comment ?? '',
      qualification: data.qualification ?? '',
    }));
  }, [data]);

  const handleApply = (e) => {
    e.preventDefault();
    console.log('User:', user); // Debugging line to check user object
    console.log('QualificationsSav:', qualificationsSav); // Debugging line to check qualificationsSav object

    toast
      .promise(
        updateContractSav(slug, energie, qualificationsSav, user.token),
        {
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
        }
      )
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
        value={qualificationsSav.comment}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Qualificaion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Qualificaion"
          value={qualificationsSav.qualification}
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
    </Stack>
  );
  return (
    <>
      {user && (user.role === 'admin' || user.role === 'sav') ? (
        <DraggableDialog
          variant="contained"
          startIcon=""
          chipIcon={<SupervisorAccount />}
          buttonText="SAV"
          title="SAV"
          text={content}
          handleApply={handleApply}
          setOpen={setOpen}
          open={open}
        />
      ) : null}
    </>
  );
};

export default QualificationSav;
