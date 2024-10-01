import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import { savCulumns } from '../../components/dataGrid/columns';
import { getSavRows } from '../../functions/contract';
import { grey } from '@mui/material/colors';

const Sav = () => {
  const { drawer, quickFilter } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const serverData = useSelector((state) => state.filters.serverData);

  const { paginationModel, sortOptions } = useSelector(
    (state) => state.paginationAndSortReducer
  );
  const { filters } = useSelector((state) => ({ ...state }));

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);

  const loadContract = () => {
    setLoading(true);
    if (serverData && serverData.data !== null) {
      // check if filters exist and are not empty
      const { data, total } = serverData;
      setRows(data);
      setTotalRowCount(total);
      setLoading(false);
    } else {
      getSavRows(paginationModel, sortOptions, quickFilter.text).then((c) => {
        const { data, total } = c.data;
        setRows(data);
        setTotalRowCount(total);
        //console.log(c.data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    console.log(filters, 'hey i m the filters');
    loadContract();
  }, [serverData, quickFilter, paginationModel, sortOptions]);

  return (
    <MainContainer
      open={drawer}
      sx={{ backgroundColor: darkMode ? 'auto' : grey[100] }}
    >
      <DataTable
        rows={rows}
        columns={savCulumns}
        loading={loading}
        setLoadng={setLoading}
        totalRowCount={totalRowCount}
        setToatalRowCont={setTotalRowCount}
      />
    </MainContainer>
  );
};

export default Sav;
