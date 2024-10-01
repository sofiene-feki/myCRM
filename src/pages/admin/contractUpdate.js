import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../style/mainContainer';
import { grey } from '@mui/material/colors';
import { getContract, updateContract } from '../../functions/contract';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { Android12Switch } from '../../style/switch';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';

const intialState = {
  contratRef: '',
  clientRef: '',
  Civility: '',
  Prénom: '',
  Nom: '',
  Tél: '',
  Email: '',
  Adresse: '',
  Commune: '',
  energie: '',
  Point_de_livraison: '',
  Puissance: '',
  Offre: '',
  Statut: '',
  Mensualité: '',
  reservedBy: null,
  Code_postal: '',
  Type_de_contrat: '',
  Nom_du_partenaire: '',
  Fournisseur: '',
};

const ContractUpdate = () => {
  const { drawer, user } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate();

  const { slug, energie } = useParams();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState(intialState);
  const {
    contratRef,
    clientRef,
    Civility,
    Prénom,
    Nom,
    Tél,
    Email,
    Adresse,
    Code_postal,
    Commune,
    Type_de_contrat,
    Point_de_livraison,
    Puissance,
    Offre,
    Statut,
    Nom_du_partenaire,
    Mensualité,
    date_de_la_signature,
    date_de_début,
    reservedBy,
    Fournisseur,
  } = values;

  const loadContract = () => {
    setLoading(true);
    getContract(slug, energie).then((p) => {
      const { contract } = p.data;
      setValues({ ...values, ...contract });
      setLoading(false);
    });
  };
  useEffect(() => {
    loadContract();
  }, [slug, energie]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'reservedBy') {
      // If the value is "true" (contract is reserved), set reservedBy to the user's ID
      // Otherwise, set it to null
      const newValue = values.reservedBy !== null ? null : value;
      setValues({ ...values, reservedBy: newValue });
    } else {
      // For other fields, update the value normally
      setValues({ ...values, [name]: value });
    }
    setDisabled(false);
  };

  const handleApply = (e) => {
    e.preventDefault();
    toast
      .promise(updateContract(slug, energie, values, user.token), {
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
        //setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainContainer
      open={drawer}
      sx={{
        backgroundColor: darkMode ? grey[800] : grey[100],
      }}
    >
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Détail de la souscription
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/admin')}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleApply}
              startIcon={<SaveIcon />}
              disabled={disabled}
            >
              Enregistrer
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader>Détail contrat</ListSubheader>}
              >
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="contratRef"
                  />
                  {!loading ? (
                    <Typography>{contratRef}</Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="clientRef"
                  />

                  {!loading ? (
                    <Typography>{clientRef}</Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="energie" />
                  {!loading ? (
                    <Typography>{energie}</Typography>
                  ) : (
                    <Skeleton width={80} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Point de livraison"
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Point_de_livraison"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Point_de_livraison}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={150} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Type de contrat"
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Type_de_contrat"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Type_de_contrat}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={150} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Partenaire"
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Nom_du_partenaire"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Nom_du_partenaire}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={150} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Date début"
                  />
                  {!loading ? (
                    <Typography>
                      {moment(date_de_début).format('DD/MM/YYYY')}
                    </Typography>
                  ) : (
                    <Skeleton width={130} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Date de signature"
                  />
                  {!loading ? (
                    <Typography>
                      {moment(date_de_la_signature).format('DD/MM/YYYY')}
                    </Typography>
                  ) : (
                    <Skeleton width={130} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Mensualité "
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Mensualité"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Mensualité}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={40} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Statut" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Statut"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Statut}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={80} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem sx={{ fontWeight: 700 }}>
                  <ListItemText
                    sx={{ fontWeight: 700 }}
                    id="switch-list-label-wifi"
                    primary="Puissance"
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Puissance"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Puissance}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={40} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Offre" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Offre"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Offre}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={70} animation="wave" height={60} />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Fournisseur"
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Fournisseur"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Fournisseur}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={70} animation="wave" height={60} />
                  )}
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ mb: 1 }}>
              <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader>Reservation</ListSubheader>}
              >
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="reservedBy"
                  />
                  {!loading ? (
                    <FormControlLabel
                      control={
                        <Android12Switch
                          checked={reservedBy !== null}
                          name="reservedBy"
                          onChange={handleChange}
                        />
                      }
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
              </List>
            </Paper>
            <Paper elevation={3}>
              <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader>Détail client</ListSubheader>}
              >
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Civility"
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Civility"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Civility}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Prénom" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Prénom"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Prénom}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Nom" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Nom"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Nom}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Tel" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Tél"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Tél}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Email" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Email"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Email}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Adresse" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Adresse"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Adresse}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Commune" />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Commune"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Commune}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Code postal"
                  />
                  {!loading ? (
                    <TextField
                      type={'text'}
                      name="Code_postal"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      value={Code_postal}
                      onChange={handleChange}
                    />
                  ) : (
                    <Skeleton width={210} animation="wave" height={60} />
                  )}
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainContainer>
  );
};

export default ContractUpdate;
