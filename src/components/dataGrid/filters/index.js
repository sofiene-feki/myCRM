import React, { useEffect, useState } from 'react';
import DraggableDialog from '../../dialog';
import { FilterAlt, FilterAltOff } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
// import { DateRange } from 'react-date-range';
// import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { getFilters } from '../../../functions/contract';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

const intialState = {
  partenaires: [
    'Kompar_TV_KE40',
    'Kompar_TV_KE24',
    'Kompar_TV_KE27',
    'Kompar_TV_KE42',
    'Kompar_TV_KE31',
    'Kompar_TV_KE41',
    'Kompar Energie 21',
    'Kompar_TV_KE39',
    'Kompar_TV_KE30',
    'Kompar_TV_KE34',
    'Kompar Energie 00',
    'Kompar Energie 01',
    'Kompar_TV_KE20',
    'Kompar_TV_KE35',
    'Kompar_TV_KE33',
    'Kompar_TV_KE23',
    'Kompar energie 26',
    'Kompar_TV_KE14',
    'Kompar_TV_KE32',
    'Kompar_TV_KE37',
    'kompar energie 29',
    'Kompar_TV_KE38',
    'kompar energie 28',
    'Kompar_TV_KE36',
  ],
  qualificationsQté: [
    'conforme',
    'non conforme',
    'annulation',
    'SAV',
    'aucun(e)',
    "pas d'enregistrement",
  ],
  qualificationsWc: [
    'Validé',
    'A suivre',
    'annulation',
    'SAV',
    'faux numéro',
    'aucun(e)',
    'Répondeur',
  ],
  fournisseurs: ['ohm', 'primeo'],
};
export const Filters = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { filters, user } = useSelector((state) => ({ ...state }));

  const { paginationModel, sortOptions } = useSelector(
    (state) => state.paginationAndSortReducer
  );

  const [filterCount, setFilterCount] = useState(0);

  const handleApply = () => {
    getFilters(filters, paginationModel, sortOptions).then((c) => {
      //console.log("filters", c.data);
      dispatch({ type: 'SET_FILTERS', payload: filters });
      dispatch({ type: 'SET_SERVER_DATA', payload: c.data });
      setOpen(false);
    });
  };

  useEffect(() => {
    if (filters.serverData && filters.serverData.data !== null) {
      handleApply();
    }
  }, [paginationModel, sortOptions]);

  useEffect(() => {
    // handleApply()
    let count = 0;
    for (const key in filters) {
      if (key === 'date') {
        if (
          filters.date[0].startDate !== null &&
          filters.date[0].endDate !== null
        ) {
          count++;
        }
      } else if (
        key !== 'serverData' &&
        key !== 'serverFilters' &&
        filters[key] !== '' &&
        filters[key] !== null
      ) {
        count++;
      }
    }
    setFilterCount(count);
    //console.log("lalalalalala", filters );
  }, [filters, paginationModel, sortOptions]);

  const handleChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { [e.target.name]: e.target.value },
    });
    //console.log(filters)
  };

  const handleDateChange = (item) => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const startDate = moment(item.selection.startDate).utcOffset(
      timezoneOffset,
      true
    );
    const endDate = item.selection.endDate
      ? moment(item.selection.endDate).utcOffset(timezoneOffset, true)
      : null;

    dispatch({
      type: 'SET_FILTERS',
      payload: {
        date: [
          {
            startDate: startDate.toDate(),
            endDate: endDate?.toDate(),
            key: 'selection',
          },
        ],
      },
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  // use filters, handleChange, handleDateChange, and handleReset here

  const content = (
    <Stack spacing={2} mt={1}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="fournisseur"
          onChange={handleChange}
          value={filters?.fournisseur || ''}
          name="fournisseur"
        >
          {intialState.fournisseurs.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Partenaire</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Partenaire"
          value={filters?.partenaire || ''}
          name="partenaire"
          onChange={handleChange}
        >
          {intialState.partenaires.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Qualification Qté</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Qualification Qté"
          value={filters?.qualificationQté || ''}
          name="qualificationQté"
          onChange={handleChange}
        >
          {intialState.qualificationsQté.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Qualification Wc</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Qualification Wc"
          value={filters?.qualificationWc || ''}
          name="qualificationWc"
          onChange={handleChange}
        >
          {intialState.qualificationsWc.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <DateRange
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={
          filters?.date || [
            {
              startDate: new Date(),
              endDate: null,
              key: 'selection',
            },
          ]
        }
        showSelectionPreview={true}
        locale={locales['fr']}
      /> */}
    </Stack>
  );
  return (
    <>
      {user &&
      (user.role === 'admin' ||
        user.role === 'quality' ||
        user.role === 'sav' ||
        user.role === 'superviseur') ? (
        <DraggableDialog
          badgeContent={filterCount}
          startIcon={<FilterAlt />}
          chipIcon={filterCount > 0 ? <FilterAltOff /> : <FilterAlt />}
          buttonText="Filtres"
          title={filterCount > 0 ? 'Effacer' : 'Filtres'}
          text={content}
          handleReset={handleReset}
          handleApply={handleApply}
          open={open}
          setOpen={setOpen}
          utcOffset={120}
        />
      ) : null}
    </>
  );
};

export default Filters;
