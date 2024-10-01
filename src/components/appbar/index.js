import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { AppBarStyle } from '../../style/appbar';
import SideList from './SideList';
import { DrawerHeader } from '../../style/appbar/sideList';
import logo from '../../images/logo.png';
import { grey } from '@mui/material/colors';




const CrmAppbar = () => {
  const { drawer, user } = useSelector((state) => ({ ...state }));

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch({
      type: 'SET_OPEN',
      payload: true,
    });
  };

  const handleToggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <>
      {user && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBarStyle position="fixed" open={drawer} sx={{backgroundColor : darkMode ? "auto"  : 'white'}}> 
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 2,
                  ...(drawer && { display: 'none' }),
                }}
              >
                <MenuIcon sx={{color : darkMode ? "auto"  : grey[900]}} />
              </IconButton>
              <img src={logo} alt="Kompar logo" width="40" style={{ marginRight : "5px"}} />

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, ml : 1, color :  darkMode ? "auto"  : grey[900] }}
              >
                Kompar Dashboard
              </Typography>
              <IconButton onClick={handleToggleDarkMode}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Toolbar>
          </AppBarStyle>
          <SideList />
          <DrawerHeader />
        </Box>
      )}
    </>
  );
};

export default CrmAppbar;
