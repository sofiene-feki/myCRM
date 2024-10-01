import React from 'react';

import { Link } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import logo from '../../images/logo.png';
import { useSelector } from 'react-redux';

const Auth = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        
        <img src={logo} alt="Kompar logo" />
      
        {user && user.token 
        ?  <Box sx={{ m: 2 }}>
        <Typography variant="body1">
          Welcome to KomparCRM <br /> you are alredy connected navigate to work space
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} component={Link} to={`${user.role}`}>
        work space
      </Button>
      </Box>
        :  <Box sx={{ m: 2 }}>
          <Typography variant="body1">
            Welcome to KomparCRM <br /> Log in with your kompar account to
            continue
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} component={Link} to="/login">
          Log in
        </Button>
        </Box> }
       
      </Box>
    </div>
  );
};

export default Auth;
