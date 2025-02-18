import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainContainer } from '../../style/mainContainer';
import { grey } from '@mui/material/colors';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

import axios from 'axios';
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Collapse,
  Fade,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Popper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { EditCalendar } from '@mui/icons-material';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import DraggableDialog from '../../components/dialog';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FunctionsIcon from '@mui/icons-material/Functions';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HistoryIcon from '@mui/icons-material/History';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TodayIcon from '@mui/icons-material/Today';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import moment, { locales } from 'moment';
import 'moment/locale/fr';
import { DateRangePicker } from 'react-date-range';
// import { DateRangePicker } from 'react-date-range';

const staticRangesLabels = {
  Today: `Aujourd'hui`,
  Yesterday: 'J -1',
  'This Week': 'Cette semaine',
  'Last Week': 'La semaine dernière',
  'This Month': 'Ce mois-ci',
  'Last Month': 'Le mois dernier',
};

const inputRangesLabels = {
  'days up to today': `jours jusqu'à aujourd'hui`,
  'days starting today': `jours après aujourd'hui`,
  partenaire: `partenaire`,
};

// function translateRange(dictionary) {
//   return (item) =>
//     dictionary[item.label] ? { ...item, label: dictionary[item.label] } : item;
// }

// const ruStaticRanges = defaultStaticRanges.map(
//   translateRange(staticRangesLabels)
// );
// const ruInputRanges = defaultInputRanges.map(translateRange(inputRangesLabels));

const Stat = () => {
  const { drawer, user } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  });
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openNotification, setNotificationOpen] = useState(true);
  const [selectedRange, setSelectedRange] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const [sum, setSum] = useState(0);
  const [partenaire, setPartenaire] = useState(8);

  const content = (
    <Stack spacing={2} mt={1}>
      <DateRangePicker
        onChange={(item) => setState({ ...state, ...item })}
        months={1}
        // minDate={addDays(new Date(), -300)}
        // maxDate={addDays(new Date(), 900)}
        // staticRanges={ruStaticRanges}
        // inputRanges={ruInputRanges}
        direction="vertical"
        ranges={[state.selection]}
        locale={locales['fr']}
      />
    </Stack>
  );

  const { startDate, endDate } = state.selection;
  moment.locale('fr');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mycrm-server.onrender.com/api/contracts/line-chart-data',
          {
            params: {
              startDate: state.selection.startDate.toISOString(),
              endDate: state.selection.endDate.toISOString(),
            },
          }
        );

        const data = response.data;

        // Check if data exists and has correct structure
        if (data && Array.isArray(data)) {
          const transformedData = [
            {
              id: 'primeo',
              color: 'hsl(109, 70%, 50%)',
              data: data.map((item) => ({
                x: item.date || '', // Provide fallback for missing date
                y: item.primeo || 0, // Provide fallback for missing primeo count
              })),
            },
            {
              id: 'ohm',
              color: 'hsl(45, 70%, 50%)',
              data: data.map((item) => ({
                x: item.date || '', // Provide fallback for missing date
                y: item.ohm || 0, // Provide fallback for missing ohm count
              })),
            },
          ];

          setLineData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching chart data', error);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Make sure dependencies are properly tracked

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(
          `https://mycrm-server.onrender.com/api/contracts/bar-chart-data`,
          {
            params: {
              startDate: state.selection.startDate.toISOString(),
              endDate: state.selection.endDate.toISOString(),
            },
          }
        );
        let komparData = { partenaire: 'Kompar', primeo: 0, ohm: 0 };
        let prolineData = { partenaire: 'Proline', primeo: 0, ohm: 0 };
        let innovaData = { partenaire: 'INNOVA', primeo: 0, ohm: 0 };
        let zccallData = { partenaire: 'ZCCALL', primeo: 0, ohm: 0 };
        let ramooConsultingData = {
          partenaire: 'RAMOO CONSULTING',
          primeo: 0,
          ohm: 0,
        };
        let SimpleshoreData = { partenaire: 'Simple Shore', primeo: 0, ohm: 0 };
        let BeyondCall = { partenaire: 'Beyond Call', primeo: 0, ohm: 0 };
        let BusinessFamily = {
          partenaire: 'Business Family',
          primeo: 0,
          ohm: 0,
        };
        let oms = { partenaire: 'OMS', primeo: 0, ohm: 0 };
        let UMANLINKSénégal = {
          partenaire: 'UMANLINK Sénégal',
          primeo: 0,
          ohm: 0,
        };
        let UMANLINKTunis = { partenaire: 'UMANLINK Tunis', primeo: 0, ohm: 0 };
        let GoCall = { partenaire: 'GO Call', primeo: 0, ohm: 0 };
        let A4Call = { partenaire: '4A CALL', primeo: 0, ohm: 0 };
        // Iterate over the response and merge the data
        response.data.forEach((item) => {
          if (
            item.partenaire === 'Samira MOSBEH' ||
            item.partenaire === 'Kompar Energie 00'
          ) {
            // Sum the values for 'primeo' and 'ohm'
            komparData.primeo += item.primeo;
            komparData.ohm += item.ohm;
          } else if (
            item.partenaire === 'Kompar Energie 01' ||
            item.partenaire === 'Hejer Soula' ||
            item.partenaire === 'Afef Gharbi' ||
            item.partenaire === 'IBRAHIM KANSOU' ||
            item.partenaire === 'Hejer Jomni'
          ) {
            // Sum the values for 'Proline'
            prolineData.primeo += item.primeo;
            prolineData.ohm += item.ohm;
          } else if (
            item.partenaire === 'Salah SALAH EDDINE' ||
            item.partenaire === 'Ezeddine KARMAWI' ||
            item.partenaire === 'Salah Eddine KARMAOUI' ||
            item.partenaire === 'Kompar_TV_KE48' ||
            item.partenaire === 'Kompar_TV_KE18' ||
            item.partenaire === 'Kompar_TV_KE31'
          ) {
            // Sum the values for 'INNOVA'
            innovaData.primeo += item.primeo;
            innovaData.ohm += item.ohm;
          } else if (
            item.partenaire === 'Zied MOUHAMED' ||
            item.partenaire === 'Kompar_TV_KE23'
          ) {
            // Sum the values for 'ramooConsulting'
            zccallData.primeo += item.primeo;
            zccallData.ohm += item.ohm;
          } else if (
            item.partenaire === 'Omar Messour' ||
            item.partenaire === 'Kompar_TV_KE33'
          ) {
            // Sum the values for 'ramooConsulting'
            ramooConsultingData.primeo += item.primeo;
            ramooConsultingData.ohm += item.ohm;
          } else if (
            item.partenaire === 'Saad SLAOUI' ||
            item.partenaire === 'Kompar_TV_KE46' ||
            item.partenaire === 'Kompar_TV_KE34'
          ) {
            // Sum the values for 'ramooConsulting'
            SimpleshoreData.primeo += item.primeo;
            SimpleshoreData.ohm += item.ohm;
          } else if (
            item.partenaire === 'Reda BOUAZIZ' ||
            item.partenaire === 'Kompar_TV_KE37'
          ) {
            // Sum the values for 'ramooConsulting'
            BeyondCall.primeo += item.primeo;
            BeyondCall.ohm += item.ohm;
          } else if (
            item.partenaire === 'Reda BOUAZIZ' ||
            item.partenaire === 'Kompar_TV_KE37'
          ) {
            // Sum the values for 'ramooConsulting'
            BeyondCall.primeo += item.primeo;
            BeyondCall.ohm += item.ohm;
          } else if (
            item.partenaire === 'Reda BOUAZIZ' ||
            item.partenaire === 'Kompar_TV_KE37'
          ) {
            // Sum the values for 'ramooConsulting'
            BeyondCall.primeo += item.primeo;
            BeyondCall.ohm += item.ohm;
          } else if (
            item.partenaire === 'Lamia LAMIA' ||
            item.partenaire === 'Kompar_TV_KE54'
          ) {
            // Sum the values for 'BusinessFamily'
            BusinessFamily.primeo += item.primeo;
            BusinessFamily.ohm += item.ohm;
          } else if (
            item.partenaire === 'Mostafa CHAHIR ' ||
            item.partenaire === 'Kompar_TV_KE49'
          ) {
            // Sum the values for 'oms'
            oms.primeo += item.primeo;
            oms.ohm += item.ohm;
          } else if (
            item.partenaire === 'Salah BEN JAAFAR' ||
            item.partenaire === 'Kompar_TV_KE44'
          ) {
            // Sum the values for 'UMANLINKSénégal'
            UMANLINKSénégal.primeo += item.primeo;
            UMANLINKSénégal.ohm += item.ohm;
          } else if (
            item.partenaire === 'Ahmed BEN AMMAR' ||
            item.partenaire === 'Kompar_TV_KE45'
          ) {
            // Sum the values for 'UMANLINKTunis'
            UMANLINKTunis.primeo += item.primeo;
            UMANLINKTunis.ohm += item.ohm;
          } else if (
            item.partenaire === 'Yassine MANSOUH' ||
            item.partenaire === 'Kompar_TV_KE20'
          ) {
            // Sum the values for 'UMANLINKTunis'
            GoCall.primeo += item.primeo;
            GoCall.ohm += item.ohm;
          } else if (
            item.partenaire === 'Ezeddine  KARMAWI' ||
            item.partenaire === 'Kompar_TV_KE39' ||
            item.partenaire === 'Kompar_TV_KE50'
          ) {
            // Sum the values for '4aCall'
            A4Call.primeo += item.primeo;
            A4Call.ohm += item.ohm;
          }
        });

        // Now set the transformed data
        setBarData([
          komparData,
          prolineData,
          innovaData,
          zccallData,
          ramooConsultingData,
          SimpleshoreData,
          BeyondCall,
          BusinessFamily,
          oms,
          UMANLINKSénégal,
          UMANLINKTunis,
          GoCall,
          A4Call,
        ]);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(
          `https://mycrm-server.onrender.com/api/contracts/pie-chart-data`,
          {
            params: {
              startDate: state.selection.startDate.toISOString(),
              endDate: state.selection.endDate.toISOString(),
            },
          }
        );
        setPieData(response.data);
        const primeoValue =
          response.data.find((item) => item.id === 'primeo')?.value || 0;
        const ohmValue =
          response.data.find((item) => item.id === 'ohm')?.value || 0;
        setSum(primeoValue + ohmValue); // Set the sum in the state
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchPieChartData();
  }, [startDate, endDate]);

  const [typedText, setTypedText] = useState('');
  const fullText = `Dans la date ${startDate.toISOString()} le total des ventes d'énergie est ${sum}, effectué par 8 nombre de partenaires, et le meilleur vendeur est Proline.`;

  useEffect(() => {
    setTypedText('');

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypedText((prevText) => prevText + fullText[currentIndex]);
      currentIndex += 1;
      if (currentIndex === fullText.length) clearInterval(typingInterval);
    }, 100); // Adjust typing speed here (100ms per character)
    return () => clearInterval(typingInterval);
  }, [startDate]);

  // Yesterday
  const handleYesterday = () => {
    const yesterdayStart = moment().subtract(1, 'days').startOf('day').toDate(); // Start of yesterday
    const yesterdayEnd = moment().subtract(1, 'days').endOf('day').toDate(); // End of yesterday

    setState({
      selection: {
        startDate: yesterdayStart, // 00:00 of yesterday
        endDate: yesterdayEnd, // 23:59:59 of yesterday
        key: 'selection',
      },
    });

    setSelectedRange('Hier'); // Mark "Yesterday" as selected
  };

  // This Week (Start of the week to now)
  const handleThisWeek = () => {
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();
    setState({
      selection: {
        startDate: startOfWeek,
        endDate: endOfWeek,
        key: 'selection',
      },
    });
    setSelectedRange('Cette semaine'); // Mark "This Week" as selected
  };

  // Last Week (Previous week range)
  const handleLastWeek = () => {
    const startOfLastWeek = moment()
      .subtract(1, 'weeks')
      .startOf('week')
      .toDate();
    const endOfLastWeek = moment().subtract(1, 'weeks').endOf('week').toDate();
    setState({
      selection: {
        startDate: startOfLastWeek,
        endDate: endOfLastWeek,
        key: 'selection',
      },
    });
    setSelectedRange('la semaine derniére'); // Mark "This Week" as selected
  };

  // This Month (Start of the month to now)
  const handleThisMonth = () => {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    setState([
      {
        startDate: startOfMonth,
        endDate: endOfMonth,
        key: 'selection',
      },
    ]);
  };

  // Last Month (Previous month range)
  const handleLastMonth = () => {
    const startOfLastMonth = moment()
      .subtract(1, 'months')
      .startOf('month')
      .toDate();
    const endOfLastMonth = moment()
      .subtract(1, 'months')
      .endOf('month')
      .toDate();
    setState([
      {
        startDate: startOfLastMonth,
        endDate: endOfLastMonth,
        key: 'selection',
      },
    ]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the Chip element as the anchor
    setOpen((prevOpen) => !prevOpen); // Toggle Popper open state
  };

  const getChipStyle = (rangeName) => {
    return {
      color: selectedRange === rangeName ? '#3d91ff' : 'black', // Blue text for selected, black for non-selected
      cursor: 'pointer',
      font: 'bold',
    };
  };

  return (
    <MainContainer
      open={drawer}
      sx={{ backgroundColor: darkMode ? 'auto' : grey[100] }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          m: 2,
          width: 'auto',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Tableau de bord des statistiques{' '}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Chip
            onClick={handleYesterday}
            style={getChipStyle('Hier')}
            label="Hier"
            icon={<HistoryIcon />}
          />
          <Chip
            onClick={handleThisWeek}
            label="Cette semaine"
            icon={<TodayIcon />}
            style={getChipStyle('Cette semaine')}
          />
          <Chip
            onClick={handleLastWeek}
            label="la semaine derniére"
            icon={<DateRangeIcon />}
            style={getChipStyle('la semaine derniére')}
          />

          <Box>
            <Chip
              onClick={handleClick}
              label="Costum date"
              icon={<EditCalendar />}
            />
            <Popper
              // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
              sx={{ zIndex: 1200 }}
              open={open}
              anchorEl={anchorEl} // This positions the Popper relative to the Chip
              placement="bottom" // Place the Popper below the Chip
              transition
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [0, 10], // Adjusts the vertical offset of the Popper
                  },
                },
              ]}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>{content} </Paper>
                </Fade>
              )}
            </Popper>
          </Box>

          <Collapse in={open}> </Collapse>
        </Stack>
      </Box>
      <Grid
        container
        spacing={1}
        sx={{
          height: 'auto',
          overflow: 'hidden',
          margin: 1,
          width: 'auto',
        }}
      >
        <Grid item xs={12} sm={4} sx={{ height: '500px' }}>
          <Box
            sx={{
              width: 'auto',
              height: '100%',
              boxShadow:
                '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              border: 2,
              borderColor: grey[200],
              backgroundColor: darkMode ? 'auto' : 'white',
            }}
          >
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    whiteSpace: 'pre-wrap', // Keep the text formatting and line breaks
                  }}
                  primary="Date"
                  secondary={
                    endDate
                      ? `du ${moment(startDate).format(
                          'DD MMMM YYYY'
                        )} AU ${moment(endDate).format('DD MMMM YYYY')}`
                      : moment(startDate).format('DD MMMM YYYY')
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FunctionsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Total Energie" secondary={sum} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Diversity3Icon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontWeight: 'bold' }}
                  primary={` ${partenaire}/13 partenaires`}
                  secondary={
                    <>
                      ~M/j 100 ,{' '}
                      <TrendingUpIcon fontSize="small" color="success" />
                      19 septembre,
                      <TrendingDownIcon fontSize="small" color="error" />
                      17 septembre
                    </>
                  }
                />
              </ListItem>
              {/* <ListItem>
                <ListItemAvatar
                  disabled={openNotification}
                  onClick={() => {
                    setNotificationOpen(!openNotification);
                  }}
                >
                  <Badge color="error" overlap="circular" badgeContent={3}>
                    <Avatar>
                      <NotificationsIcon />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText>
                  <Fade in={openNotification}>
                    <Alert
                      severity="warning"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setNotificationOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      Click the close icon to
                    </Alert>
                  </Fade>
                </ListItemText>
              </ListItem> */}
              <Box sx={{ px: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Prompt</Typography>

                  <FormControl sx={{ minWidth: 120 }} size="small">
                    {/* <InputLabel id="demo-select-small-label" sx={{ mb: 2 }}>
                      Data source
                    </InputLabel> */}
                    <Select
                      //labelId="helperText"
                      id="filled-helperText"
                      value=""
                      label="Age"
                      variant="filled"
                      sx={{ height: 25 }}

                      //onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Select Data source</FormHelperText>
                  </FormControl>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="caption"
                  sx={{ textWrap: 'wrap' }}
                >
                  Describe a chart or insight you want from the data. Including
                  fields in the prompt will help generate more relevant charts.
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter a prompt"
                />
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  sx={{ mt: 1 }}
                  onClick={() => window.confirm('')}
                >
                  Generate Chart
                </Button>
              </Box>
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} sx={{ height: '500px' }}>
          <Box
            sx={{
              height: '100%',
              boxShadow:
                '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              border: 2,
              borderColor: grey[200],
              backgroundColor: darkMode ? 'auto' : 'white',
            }}
          >
            <ResponsiveBar
              data={barData}
              enableTotals={true}
              tickRotation={-90}
              keys={['primeo', 'ohm']}
              indexBy="partenaire"
              margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={['#0abaf0', '#30ad71']}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisBottom={{
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 45,
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              // legends={[
              //   {
              //     dataFrom: 'keys',
              //     anchor: 'bottom-right',
              //     direction: 'column',
              //     justify: false,
              //     translateX: 120,
              //     translateY: 0,
              //     itemsSpacing: 2,
              //     itemWidth: 100,
              //     itemHeight: 20,
              //     itemDirection: 'left-to-right',
              //     itemOpacity: 0.85,
              //     symbolSize: 20,
              //     effects: [
              //       {
              //         on: 'hover',
              //         style: { itemOpacity: 1 },
              //       },
              //     ],
              //   },
              // ]}
              role="application"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={(e) =>
                `${e.id}: ${e.formattedValue} in Partenaire: ${e.indexValue}`
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} sx={{ height: '500px' }}>
          <Box
            sx={{
              height: '100%',
              boxShadow:
                '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              border: 2,
              borderColor: grey[200],
              backgroundColor: darkMode ? 'auto' : 'white',
            }}
          >
            <ResponsivePie
              data={pieData}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              colors={['#30ad71', '#0abaf0']}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
              // legends={[
              //   {
              //     anchor: 'bottom-right',
              //     direction: 'column',
              //     justify: false,
              //     translateX: 0,
              //     translateY: 56,
              //     itemsSpacing: 0,
              //     itemWidth: 70,
              //     itemHeight: 18,
              //     itemTextColor: '#999',
              //     itemDirection: 'left-to-right',
              //     itemOpacity: 1,
              //     symbolSize: 18,
              //     symbolShape: 'circle',
              //     effects: [
              //       {
              //         on: 'hover',
              //         style: { itemTextColor: '#000' },
              //       },
              //     ],
              //   },
              // ]}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} sx={{ height: '500px' }}>
          <Box
            sx={{
              height: '100%',
              boxShadow:
                '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              border: 2,
              borderColor: grey[200],
              backgroundColor: darkMode ? 'auto' : 'white',
            }}
          >
            <ResponsiveLine
              data={lineData}
              keys={['primeo', 'ohm']}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              xScale={{ type: 'point' }}
              colors={['#0abaf0', '#30ad71']}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false,
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 45,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              // legends={[
              //   {
              //     anchor: 'bottom-right',
              //     direction: 'column',
              //     justify: false,
              //     translateX: 100,
              //     translateY: 0,
              //     itemsSpacing: 0,
              //     itemDirection: 'left-to-right',
              //     itemWidth: 80,
              //     itemHeight: 20,
              //     itemOpacity: 0.75,
              //     symbolSize: 12,
              //     symbolShape: 'circle',
              //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
              //     effects: [
              //       {
              //         on: 'hover',
              //         style: {
              //           itemBackground: 'rgba(0, 0, 0, .03)',
              //           itemOpacity: 1,
              //         },
              //       },
              //     ],
              //   },
              // ]}
            />
          </Box>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Stat;
