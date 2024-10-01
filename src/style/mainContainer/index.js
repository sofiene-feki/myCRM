import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  marginLeft: drawerWidth,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const MainContainer = styled(Box)(({ theme, open }) => ({
  marginLeft: drawerWidth,
  whiteSpace: 'nowrap',
  ...(open && {
    ...openedMixin(theme),
    '&. MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '&. MuiDrawer-paper': closedMixin(theme),
  }),
}));
