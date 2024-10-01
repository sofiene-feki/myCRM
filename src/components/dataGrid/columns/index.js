import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Tooltip } from '@mui/material';

export const usersColumns = [
  {
    field: '_id',
    headerName: 'Id',
    flex: 1.4,
  },
  {
    field: 'displayName',
    headerName: 'displayName',
    flex: 1.4,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1.4,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Date de création',
    flex: 1,
  },
  {
    field: 'updatedAt',
    headerName: 'dernière connection',
    flex: 1.4,
  },

  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    flex: 1,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<VisibilityIcon />}
        label="open"
        //component={Link}
        //to={`/contract`}
        //onClick={() => console.log(params.row.clientRef)}
      />,
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        //component={Link}
        // to={`/contract-update`}
        showInMenu
      />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
    ],
  },
];

export const contractCreateColumns = [
  {
    field: 'contratRef',
    headerName: 'Contrat Ref',
    editable: true,
  },
  {
    field: 'clientRef',
    headerName: 'Client Ref',
    editable: true,
  },
  {
    field: 'Civility',
    headerName: 'Civility',
    editable: true,
  },
  {
    field: 'Prénom',
    headerName: 'Prénom',
    editable: true,
  },
  {
    field: 'Nom',
    headerName: 'Nom',
    editable: true,
  },
  {
    field: 'Tél',
    headerName: 'Tél',
    editable: true,
  },
  {
    field: 'Email',
    headerName: 'Email',
    editable: true,
  },
  {
    field: 'Adresse',
    headerName: 'Adresse',
    editable: true,
  },
  {
    field: 'Code_postal',
    headerName: 'Code postal',
    editable: true,
  },
  {
    field: 'Commune',
    headerName: 'Commune',
    editable: true,
  },
  {
    field: 'energie',
    headerName: 'Energie',
    editable: true,
  },
  {
    field: 'Point_de_livraison',
    headerName: 'PDL',
    editable: true,
  },
  {
    field: 'Puissance',
    headerName: 'Puissance',
    editable: true,
  },
  {
    field: 'Offre',
    headerName: 'Offre',
    editable: true,
  },
  {
    field: 'Statut',
    headerName: 'Statut',
    editable: true,
  },
  {
    field: 'Nom_du_partenaire',
    headerName: 'Partenaire',
    editable: true,
  },

  {
    field: 'date_de_début',
    headerName: 'Date début',
    editable: true,
    type: 'dateTime',
    valueFormatter: ({ value }) =>
      moment(new Date(value)).format('DD/MM/YYYY '),
  },
  {
    field: 'date_de_la_signature',
    headerName: 'Date signature',
    editable: true,
    type: 'dateTime',
    valueFormatter: ({ value }) =>
      moment(new Date(value)).format('DD/MM/YYYY '),
  },
  {
    field: 'Type_de_contrat',
    headerName: 'Type de contrat',
    editable: true,
  },
  {
    field: 'Mensualité',
    headerName: 'Mensualité',
    editable: true,
  },
  {
    field: 'Fournisseur',
    headerName: 'Fournisseur',
    editable: true,
  },
  {
    field: 'Mode_facturation',
    headerName: 'Mode de facturation',
    editable: true,
  },
  {
    field: 'Option_tarifaire',
    headerName: 'Option tarifaire',
    editable: true,
  },
  {
    field: 'Date_naissance',
    headerName: 'Date de naissance',
    editable: true,
    valueFormatter: ({ value }) =>
      moment(new Date(value)).format('DD/MM/YYYY '),
  },
];

export const adminColumns = [
  {
    field: 'clientRef',
    headerName: 'Ref client',
    flex: 0.4,
  },
  {
    field: 'energie',
    headerName: 'Energie',
    flex: 0.3,
  },
  {
    field: 'Fournisseur',
    headerName: 'Fournisseur',
    flex: 0.3,
  },
  {
    field: 'date_de_la_signature',
    headerName: 'Date de signature',
    flex: 0.4,
    valueFormatter: ({ value }) =>
      moment(new Date(value)).format('DD/MM/YYYY '),
  },
  {
    field: 'Tél',
    headerName: 'Tél',
    flex: 0.4,
  },

  {
    field: 'StatutQté',
    headerName: 'Statut Qté',
    flex: 0.3,
  },
  {
    field: 'StatutWc',
    headerName: 'Statut Wc',
    flex: 0.3,
  },
  {
    field: 'Nom_du_partenaire',
    headerName: 'Partenaire',
    flex: 0.4,
  },

  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    flex: 0.3,
    getActions: (params) => [
      <Tooltip title="voir" arrow>
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="open"
          component={Link}
          to={`/contract-details/${params.row.clientRef}/${params.row.energie}`} //onClick={() => console.log(params.row.clientRef)}
        />
      </Tooltip>,

      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        component={Link}
        to={`/contract-update/${params.row.clientRef}/${params.row.energie}`}
        showInMenu
      />,

      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
    ],
  },
];

export const qualityCulumns = [
  {
    field: 'clientRef',
    headerName: 'Ref client',
    flex: 1.4,
  },
  {
    field: 'date_signature',
    headerName: 'Date de signature',
    flex: 1.4,
  },
  {
    field: 'Contact',
    headerName: 'Contact',
    flex: 1.4,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'statut',
    headerName: 'Statut',
    flex: 1,
  },
  {
    field: 'energie',
    headerName: 'Energie',
    flex: 1,
  },
  {
    field: 'partenaire',
    headerName: 'Partenaire',
    flex: 1.4,
  },

  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    flex: 1,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<VisibilityIcon />}
        label="open"
        component={Link}
        to={`/contract-details`}
        //onClick={() => console.log(params.row.clientRef)}
      />,

      <GridActionsCellItem
        icon={<TouchAppIcon />}
        label="Reserver"
        //component={Link}
        // to={`/contract-update`}
        showInMenu
      />,
    ],
  },
];

export const savCulumns = [
  {
    field: 'clientRef',
    headerName: 'Ref client',
    flex: 0.4,
  },
  {
    field: 'date_de_la_signature',
    headerName: 'Date de signature',
    flex: 0.4,
    valueFormatter: ({ value }) =>
      moment(new Date(value)).format('DD/MM/YYYY '),
  },
  {
    field: 'Contact',
    headerName: 'Contact',
    flex: 0.4,
    valueGetter: (params) =>
      `${params.row.Civility || ''} ${params.row.Prénom || ''} ${
        params.row.Nom || ''
      }`,
  },
  {
    field: 'Fournisseur',
    headerName: 'Fournisseur',
    flex: 0.3,
  },
  {
    field: 'energie',
    headerName: 'Energie',
    flex: 0.3,
  },
  {
    field: 'Nom_du_partenaire',
    headerName: 'Partenaire',
    flex: 0.4,
  },
  {
    field: 'Tél',
    headerName: 'Tél',
    flex: 0.4,
  },

  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    flex: 0.2,
    getActions: (params) => [
      <Tooltip title="voir" arrow>
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="open"
          component={Link}
          to={`/contract-details/${params.row.clientRef}/${params.row.energie}`}
        />
      </Tooltip>,
    ],
  },
];

export const wcCulumns = [
  {
    field: 'clientRef',
    headerName: 'Ref client',
    flex: 0.4,
  },
  {
    field: 'date_de_la_signature',
    headerName: 'Date de signature',
    flex: 0.4,
    valueFormatter: ({ value }) =>
      moment(new Date(value)).format('DD/MM/YYYY '),
  },
  {
    field: 'Contact',
    headerName: 'Contact',
    flex: 0.4,
    valueGetter: (params) =>
      `${params.row.Civility || ''} ${params.row.Prénom || ''} ${
        params.row.Nom || ''
      }`,
  },
  {
    field: 'Fournisseur',
    headerName: 'Fournisseur',
    flex: 0.3,
  },
  {
    field: 'energie',
    headerName: 'Energie',
    flex: 0.3,
  },
  {
    field: 'Nom_du_partenaire',
    headerName: 'Partenaire',
    flex: 0.4,
  },
  {
    field: 'Tél',
    headerName: 'Tél',
    flex: 0.4,
  },

  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    flex: 0.2,
    getActions: (params) => [
      <Tooltip title="voir" arrow>
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="open"
          component={Link}
          to={`/contract-details/${params.row.clientRef}/${params.row.energie}`}
        />
      </Tooltip>,
    ],
  },
];
