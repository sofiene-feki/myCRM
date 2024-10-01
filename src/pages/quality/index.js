import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "../../components/dataGrid";
import { MainContainer } from "../../style/mainContainer";
import { GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { Link, useNavigate } from "react-router-dom";
import { getQtéRows, getReservation } from "../../functions/contract";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Tooltip } from "@mui/material";

const Quality = () => {
  const { drawer, quickFilter, user } = useSelector((state) => ({ ...state }));
  const history = useNavigate();
  const serverData = useSelector((state) => state.filters.serverData);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);

  const { paginationModel, sortOptions } = useSelector(
    (state) => state.paginationAndSortReducer
  );

  const loadContract = () => {
    setLoading(true);

    if (serverData && serverData.data !== null) {
      // check if filters exist and are not empty
      const { data, total } = serverData;
      setRows(data);
      setTotalRowCount(total);
      setLoading(false);
    } else {
      getQtéRows(paginationModel, sortOptions, quickFilter.text).then(
        (response) => {
          const { data, total } = response.data;
          setRows(data);
          console.log("after set", rows);
          setTotalRowCount(total);
          setLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    loadContract();
  }, [serverData, paginationModel, sortOptions, quickFilter.text]);

  const qualityCulumns = useMemo(
    () => [
      {
        field: "clientRef",
        headerName: "Ref client",
        flex: 0.4,
      },
      {
        field: "date_de_la_signature",
        headerName: "Date de signature",
        flex: 0.4,
        valueFormatter: ({ value }) =>
          moment(new Date(value)).format("DD/MM/YYYY "),
      },
      {
        field: "Contact",
        headerName: "Contact",
        flex: 0.4,
        valueGetter: (params) =>
          `${params.row.Civility || ""} ${params.row.Prénom || ""} ${
            params.row.Nom || ""
          }`,
      },
      {
        field: "Fournisseur",
        headerName: "Fournisseur",
        flex: 0.3,
      },
      {
        field: "energie",
        headerName: "Energie",
        flex: 0.3,
      },
      {
        field: "Tél",
        headerName: "Tél",
        flex: 0.4,
      },
      {
        field: "Nom_du_partenaire",
        headerName: "Partenaire",
        flex: 0.4,
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 0.2,
        getActions: (params) => [
          //   <GridActionsCellItem
          //   icon={params.row.reservedBy ? <VisibilityOffIcon /> : <VisibilityIcon />}
          //   label="open"
          //   component={Link}
          //   to={`/contract-details/${params.row.clientRef}/${params.row.energie}`}
          //   disabled={params.row.reservedBy !== null }
          // />,
          <Tooltip title="Reserver" arrow>
            <GridActionsCellItem
              icon={<TouchAppIcon />}
              label="Reserver"
              onClick={() => handleReserve(params.row)}
              disabled={params.row.reservedBy !== null}
            />
          </Tooltip>,
        ],
      },
    ],
    []
  );

  // const handleReserve = async (_id) => {
  //   try {
  //     const result = await toast.promise(
  //       getReservation(_id, user._id),
  //       {
  //         loading: 'Reserving Contract...',
  //         success: (response) => {
  //           return response.message;
  //         },
  //         error: (error) => {
  //           if (error.response && error.response.status === 403) {
  //             return 'Contract already reserved';
  //           } else {
  //             return `Error: ${error.message}`;
  //           }
  //         },
  //       }
  //     );

  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleReserve = async (row) => {
    try {
      const response = await toast.promise(getReservation(row._id, user._id), {
        pending: "Reserving Contract...",
        success: {
          render() {
            history(`/contract-details/${row.clientRef}/${row.energie}`);
            return "Contract reserved Successfully";
          },
        },
        error: {
          render() {
            return "Contract already reserved";
          },
          // other options
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const handleReserve = async (_id) => {
  //   if (!_id) {
  //     return;
  //   }

  //   try {
  //     const { data, status } = await getReservation(_id, user._id);

  //     toast.promise(
  //       Promise.resolve({
  //         data,
  //         status,
  //       }),
  //       {
  //         loading: 'Reserving Contract...',
  //         success: (result) => `Contract reserved successfully`,
  //         error: (result) => {
  //           if (result.status === 403) {
  //             return 'Contract already reserved';
  //           } else {
  //             return `Error: ${result.data.error}`;
  //           }
  //         },
  //       }
  //     );

  //   } catch (err) {
  //     console.error(err); // Handle error
  //   }
  // };

  return (
    <MainContainer
      open={drawer}
      sx={{ backgroundColor: darkMode ? "auto" : grey[100] }}
    >
      <DataTable
        rows={rows}
        columns={qualityCulumns}
        loading={loading}
        setLoadng={setLoading}
        totalRowCount={totalRowCount}
        setToatalRowCont={setTotalRowCount}
      />
    </MainContainer>
  );
};

export default Quality;
