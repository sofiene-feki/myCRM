import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import { adminColumns } from '../../components/dataGrid/columns';
import { getAdminRows } from '../../functions/contract';
import { grey } from '@mui/material/colors';



const Admin = () => {
  const { drawer, quickFilter , user } = useSelector((state) => ({ ...state }));
  const serverData = useSelector(state => state.filters.serverData);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);

  const { paginationModel, sortOptions } = useSelector(
    (state) => state.paginationAndSortReducer
  );

 
  const loadContract = () => {
    setLoading(true);
  
    if (serverData && serverData.data !== null) { // check if filters exist and are not empty
  
        const { data, total } = serverData;
        setRows(data);
        setTotalRowCount(total);
        setLoading(false);
    
     
    } else {
      getAdminRows(paginationModel, sortOptions, quickFilter.text).then((response) => {
        const { data, total } = response.data;
        setRows(data);
        console.log("after set",rows)
        setTotalRowCount(total);
        setLoading(false);
      });
    }
  };
  
  



  useEffect(() => {
    loadContract();
    console.log("user -----",user)
  }, [serverData, paginationModel, sortOptions, quickFilter.text ]);

  

  return (
    <MainContainer open={drawer} sx={{backgroundColor : darkMode ? "auto"  : grey[100] }}>
      <DataTable rows={rows} columns={adminColumns}  
     
      loading={loading} setLoadng={setLoading} 
      totalRowCount={totalRowCount} setToatalRowCont={setTotalRowCount} 
         />
    </MainContainer>
  );
};

export default Admin;
