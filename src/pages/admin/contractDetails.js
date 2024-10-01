import React, { useEffect, useState } from 'react';
import { MainContainer } from '../../style/mainContainer';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import QualificationWc from '../../components/qalification/QualificationWc';
import QualificationQualité from '../../components/qalification/QualificationQualité';
import QualificationSav from '../../components/qalification/QualificationSav';
import { grey } from '@mui/material/colors';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getContract } from '../../functions/contract';
import moment from 'moment';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ScriptWc from '../../components/qalification/ScriptWc';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const pricesData = {
  'Classique - Base - Vert': {
    3: { kwhPrice: 18.87, abonnementPrice: 7.19 },
    4: { kwhPrice: 18.87, abonnementPrice: 8.58 },
    5: { kwhPrice: 18.87, abonnementPrice: 8.85 },
    6: { kwhPrice: 18.87, abonnementPrice: 9.28 },
    7: { kwhPrice: 18.87, abonnementPrice: 10.82 },
    8: { kwhPrice: 18.87, abonnementPrice: 11.09 },
    9: { kwhPrice: 18.87, abonnementPrice: 11.56 },
    10: { kwhPrice: 18.87, abonnementPrice: 13.13 },
    11: { kwhPrice: 18.87, abonnementPrice: 13.42 },
    12: { kwhPrice: 18.87, abonnementPrice: 13.89 },
    15: { kwhPrice: 18.87, abonnementPrice: 16.03 },
    18: { kwhPrice: 18.87, abonnementPrice: 18.15 },
    24: { kwhPrice: 18.87, abonnementPrice: 22.96 },
    30: { kwhPrice: 18.87, abonnementPrice: 26.92 },
    36: { kwhPrice: 18.87, abonnementPrice: 31.75 },
  },
  'Classique - HPHC - Vert': {
    3: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 8.93 },
    4: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 8.93 },
    5: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 9.2 },
    6: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 9.63 },
    7: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 11.37 },
    8: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 11.64 },
    9: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 12.11 },
    10: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 13.75 },
    11: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 14.04 },
    12: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 14.51 },
    15: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 16.78 },
    18: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 19.02 },
    24: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 23.78 },
    30: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 28.02 },
    36: { kwhHpPrice: 20.4, kwhHcPrice: 15.13, abonnementPrice: 32.3 },
  },

  'Ohm Fixe 1 an BASE': {
    3: { kwhPrice: 19.92, abonnementPrice: 8.17 },
    4: { kwhPrice: 19.92, abonnementPrice: 9.78 },
    5: { kwhPrice: 19.92, abonnementPrice: 10.08 },
    6: { kwhPrice: 19.92, abonnementPrice: 10.58 },
    7: { kwhPrice: 20.23, abonnementPrice: 12.37 },
    8: { kwhPrice: 20.23, abonnementPrice: 12.68 },
    9: { kwhPrice: 20.23, abonnementPrice: 13.22 },
    10: { kwhPrice: 20.23, abonnementPrice: 15.04 },
    11: { kwhPrice: 20.23, abonnementPrice: 15.38 },
    12: { kwhPrice: 20.23, abonnementPrice: 15.92 },
    15: { kwhPrice: 20.23, abonnementPrice: 18.39 },
    18: { kwhPrice: 20.23, abonnementPrice: 20.84 },
    24: { kwhPrice: 20.23, abonnementPrice: 26.42 },
    30: { kwhPrice: 20.23, abonnementPrice: 31.0 },
    36: { kwhPrice: 20.23, abonnementPrice: 36.59 },
  },
  'Ohm Fixe 2 ans BASE': {
    3: { kwhPrice: 16.98, abonnementPrice: 8.2 },
    4: { kwhPrice: 16.98, abonnementPrice: 9.78 },
    5: { kwhPrice: 16.98, abonnementPrice: 10.09 },
    6: { kwhPrice: 16.98, abonnementPrice: 10.58 },
    7: { kwhPrice: 16.98, abonnementPrice: 12.33 },
    8: { kwhPrice: 16.98, abonnementPrice: 12.65 },
    9: { kwhPrice: 16.98, abonnementPrice: 13.17 },
    10: { kwhPrice: 16.98, abonnementPrice: 14.97 },
    11: { kwhPrice: 16.98, abonnementPrice: 15.3 },
    12: { kwhPrice: 16.98, abonnementPrice: 15.83 },
    15: { kwhPrice: 16.98, abonnementPrice: 18.27 },
    18: { kwhPrice: 16.98, abonnementPrice: 20.69 },
    24: { kwhPrice: 16.98, abonnementPrice: 26.17 },
    30: { kwhPrice: 16.98, abonnementPrice: 30.69 },
    36: { kwhPrice: 16.98, abonnementPrice: 36.2 },
  },
  'Ohm Soir & WE FIXE': {
    3: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 8.27 },
    4: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 10.27 },
    5: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 10.58 },
    6: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 11.07 },
    7: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 13.07 },
    8: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 13.39 },
    9: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 13.92 },
    10: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 15.82 },
    11: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 16.15 },
    12: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 16.68 },
    15: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 19.29 },
    18: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 21.87 },
    24: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 27.34 },
    30: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 32.22 },
    36: { kwhHpPrice: 20.64, kwhHcPrice: 12.39, abonnementPrice: 37.15 },
  },

  'Ohm Fixe 1 an HPHC': {
    3: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 10.18 },
    4: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 10.18 },
    5: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 10.49 },
    6: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 10.99 },
    7: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 13.0 },
    8: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 13.32 },
    9: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 13.85 },
    10: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 15.76 },
    11: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 16.09 },
    12: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 16.63 },
    15: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 19.26 },
    18: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 21.85 },
    24: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 27.36 },
    30: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 32.26 },
    36: { kwhHpPrice: 24.96, kwhHcPrice: 15.04, abonnementPrice: 37.23 },
  },

  'Ohm Fixe 2 ans HPHC': {
    3: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 9.73 },
    4: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 9.73 },
    5: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 10.02 },
    6: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 10.49 },
    7: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 12.38 },
    8: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 12.68 },
    9: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 13.18 },
    10: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 14.98 },
    11: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 15.29 },
    12: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 15.8 },
    15: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 18.25 },
    18: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 20.71 },
    24: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 25.89 },
    30: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 30.51 },
    36: { kwhHpPrice: 18.36, kwhHcPrice: 13.62, abonnementPrice: 35.17 },
  },

  'Classique Gaz': {
    'GN.B1': { kwhPrice: 8.94, abonnementPrice: 20.23 },
    'GN.B0': { kwhPrice: 11.05, abonnementPrice: 8.07 },
    'GN.BASE': { kwhPrice: 10.94, abonnementPrice: 8.07 },
    'GN.B2I': { kwhPrice: 8.94, abonnementPrice: 20.23 },
  },
  'Gaz Fixe 1 an': {
    'GN.B1': { kwhPrice: 8.01, abonnementPrice: 21.51 },
    'GN.B0': { kwhPrice: 11.41, abonnementPrice: 8.48 },
    'GN.BASE': { kwhPrice: 11.14, abonnementPrice: 8.48 },
    'GN.B2I': { kwhPrice: 8.01, abonnementPrice: 21.51 },
  },
};

const ContractDetails = () => {
  const { drawer, user } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { quality, sav, wc } = data;

  const { Offre, Puissance } = data;

  const [loading, setLoading] = useState(false);

  const [otherContractLink, setOtherContractLink] = useState('');
  const history = useNavigate();

  const { slug, energie } = useParams();

  const loadContract = () => {
    setLoading(true);
    getContract(slug, energie).then((c) => {
      const { contract, otherContractLink } = c.data;
      setData(contract);
      setOtherContractLink(otherContractLink);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadContract();
  }, [slug, energie]);

  const handleOtherContractClick = (event) => {
    event.preventDefault();
    history(otherContractLink);
  };

  const handleBackClick = () => {
    if (user.role === 'admin') {
      navigate('/admin');
    }
    if (user.role === 'superviseur') {
      navigate('/admin');
    }
    if (user.role === 'sav') {
      navigate('/sav');
    }
    if (user.role === 'quality') {
      navigate('/quality');
    }
    if (user.role === 'wc') {
      navigate('/wc');
    }
  };
  const { kwhPrice, abonnementPrice, kwhHpPrice, kwhHcPrice } =
    pricesData[Offre]?.[Puissance] || {};

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
            {otherContractLink && (
              <Chip
                onClick={handleOtherContractClick}
                label=" switch contrat"
                icon={<ChangeCircleIcon />}
              />
            )}
          </Stack>

          <Stack direction="row" spacing={2}>
            {quality ? <QualificationQualité data={quality} /> : null}
            {wc ? <QualificationWc data={wc} /> : null}
            {sav ? <QualificationSav data={sav} /> : null}
            <ScriptWc data={data} />
            <Button variant="outlined" onClick={handleBackClick} size="small">
              retour
            </Button>
          </Stack>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={6}>
            <Paper elevation={3}>
              <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader>Détail contrat</ListSubheader>}
              >
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Ref contrat"
                  />
                  {!loading ? (
                    <Typography>{data.contratRef}</Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Ref client"
                  />
                  {!loading ? (
                    <Typography>{data.clientRef}</Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Énergie" />
                  {!loading ? (
                    <Typography>{data.energie}</Typography>
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
                    <Typography>{data.Point_de_livraison}</Typography>
                  ) : (
                    <Skeleton width={150} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                {data && data.Type_de_contrat && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Type de contrat"
                    />
                    {!loading ? (
                      <Typography>{data.Type_de_contrat}</Typography>
                    ) : (
                      <Skeleton width={150} animation="wave" />
                    )}
                  </ListItem>
                )}

                <Divider />
                {data && data.Mode_facturation && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Mode de facturation"
                    />
                    {!loading ? (
                      <Typography>{data.Mode_facturation}</Typography>
                    ) : (
                      <Skeleton width={150} animation="wave" />
                    )}
                  </ListItem>
                )}

                <Divider />
                {data && data.Option_tarifaire && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Option tarifaire"
                    />
                    {!loading ? (
                      <Typography>{data.Option_tarifaire}</Typography>
                    ) : (
                      <Skeleton width={150} animation="wave" />
                    )}
                  </ListItem>
                )}

                <Divider />
                <ListItem>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Partenaire"
                  />
                  {!loading ? (
                    <Typography>{data.Nom_du_partenaire}</Typography>
                  ) : (
                    <Skeleton width={150} animation="wave" />
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
                      {moment(data.date_de_début).format('DD/MM/YYYY')}
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
                      {moment(data.date_de_la_signature).format('DD/MM/YYYY')}
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
                    <Typography>{data.Mensualité} € </Typography>
                  ) : (
                    <Skeleton width={40} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Statut" />
                  {!loading ? (
                    <Typography>{data.Statut} </Typography>
                  ) : (
                    <Skeleton width={80} animation="wave" />
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
                    <Typography>{data.Puissance}</Typography>
                  ) : (
                    <Skeleton width={40} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Offre" />
                  {!loading ? (
                    <Typography>{data.Offre}</Typography>
                  ) : (
                    <Skeleton width={70} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                {!loading && kwhPrice && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Prix kWh HTT"
                    />
                    <Typography>{kwhPrice} €</Typography>
                  </ListItem>
                )}
                <Divider />

                {!loading && kwhHpPrice && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Prix kWh HP HTT"
                    />
                    <Typography>{kwhHpPrice} €</Typography>
                  </ListItem>
                )}
                <Divider />

                {!loading && kwhHcPrice && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Prix kWh HC HTT"
                    />
                    <Typography>{kwhHcPrice} €</Typography>
                  </ListItem>
                )}
                {!loading && abonnementPrice && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Abonnement €/mois HTT"
                    />
                    <Typography>{abonnementPrice} €</Typography>
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper elevation={3}>
              <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader>Détail client</ListSubheader>}
              >
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Contact" />
                  {!loading ? (
                    <Typography>
                      {data.Civility} {data.Prénom} {data.Nom}
                    </Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Tel" />
                  {!loading ? (
                    <Typography>{data.Tél}</Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Email" />
                  {!loading ? (
                    <Typography>{data.Email}</Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
                <Divider />
                {data && data.Date_naissance && (
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary="Date de naissance"
                    />
                    {!loading ? (
                      <Typography>
                        {' '}
                        {moment(data.Date_naissance).format('DD/MM/YYYY')}
                      </Typography>
                    ) : (
                      <Skeleton width={150} animation="wave" />
                    )}
                  </ListItem>
                )}

                <Divider />
                <ListItem>
                  <ListItemText id="switch-list-label-wifi" primary="Adresse" />
                  {!loading ? (
                    <Typography>
                      {data.Adresse} {data.Code_postal} {data.Commune}
                    </Typography>
                  ) : (
                    <Skeleton width={210} animation="wave" />
                  )}
                </ListItem>
              </List>
            </Paper>

            {user && (user.role === 'admin' || user.role === 'superviseur') && (
              <>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={<ListSubheader>Détail qualité </ListSubheader>}
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <>
                          {quality && quality.qualifiedBy && (
                            <Chip label={quality.qualifiedBy} />
                          )}

                          <Chip label={quality && quality.qualification} />
                        </>
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {quality && quality.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={
                      <ListSubheader>Détail welcome call </ListSubheader>
                    }
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <>
                          {wc && wc.qualifiedBy && (
                            <Chip label={wc.qualifiedBy} />
                          )}
                          <Chip label={wc && wc.qualification} />
                        </>
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {wc && wc.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={<ListSubheader>Détail sav</ListSubheader>}
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <>
                          {sav && sav.qualifiedBy && (
                            <Chip label={sav.qualifiedBy} />
                          )}
                          <Chip label={sav && sav.qualification} />
                        </>
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {sav && sav.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
              </>
            )}

            {user && user.role === 'quality' && (
              <>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={
                      <ListSubheader>Détail welcome call </ListSubheader>
                    }
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <Chip label={wc && wc.qualification} />
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {wc && wc.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
              </>
            )}

            {user && user.role === 'wc' && (
              <>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={<ListSubheader>Détail qualité </ListSubheader>}
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <Chip label={quality && quality.qualification} />
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {quality && quality.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={<ListSubheader>Détail sav</ListSubheader>}
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <Chip label={sav && sav.qualification} />
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {sav && sav.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
              </>
            )}

            {user && user.role === 'sav' && (
              <>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={<ListSubheader>Détail qualité </ListSubheader>}
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <Chip label={quality && quality.qualification} />
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {quality && quality.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
                <Paper elevation={3} sx={{ mt: 1 }}>
                  <List
                    sx={{ width: '100%', paddingBottom: 0 }}
                    subheader={
                      <ListSubheader>Détail welcome call </ListSubheader>
                    }
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Qualification "
                      />
                      {!loading ? (
                        <Chip label={wc && wc.qualification} />
                      ) : (
                        <Skeleton width={210} animation="wave" />
                      )}
                    </ListItem>
                    <Divider />

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comentaire</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!loading ? (
                          <Typography
                            sx={{
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {wc && wc.comment}
                          </Typography>
                        ) : (
                          <Skeleton width={210} animation="wave" />
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </List>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </MainContainer>
  );
};

export default ContractDetails;
