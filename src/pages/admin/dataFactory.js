import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { MainContainer } from '../../style/mainContainer';
import { useSelector } from 'react-redux';
import DataFactoryImg from '../../images/dataFactoryImg.PNG';
import TableViewIcon from '@mui/icons-material/TableView';
import { Link } from 'react-router-dom';

const DataFactory = () => {
  const { drawer } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <MainContainer
      open={drawer}
      sx={{
        backgroundColor: darkMode ? 'auto' : 'auto',
        //userSelect: "none",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper elevation={3} sx={{}}>
            <Card sx={{ maxWidth: 600 }}>
              <CardActionArea component={Link} to="NewWorkTable">
                <CardMedia
                  component="img"
                  image={DataFactoryImg}
                  height="100%"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    New work Table
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    feel free to add new work table edit clean and lookup
                    anything you want
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Need help ?
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
          >
            <List
              sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Select Data Table
                </ListSubheader>
              }
            >
              <ListItemButton component={Link} to="clientsTable">
                <ListItemIcon>
                  <TableViewIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Client Table"
                  secondary="last update 20, 2014"
                />
              </ListItemButton>
              <ListItemButton component={Link} to="energyTable">
                <ListItemIcon>
                  <TableViewIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Energy Contract Table"
                  secondary="last update 20, 2014"
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <TableViewIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Commande Table"
                  secondary="last update 20, 2014"
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <TableViewIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Payment Table"
                  secondary="last update 20, 2014"
                />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default DataFactory;
