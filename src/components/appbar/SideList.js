import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Headphones,
  Logout,
  ManageAccounts,
  PostAdd,
  SupervisorAccount,
  SupportAgent,
  Feed,
  Troubleshoot,
} from '@mui/icons-material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, DrawerHeader } from '../../style/appbar/sideList';
import { auth } from '../../services/firebase';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { signOut } from 'firebase/auth';
import { grey } from '@mui/material/colors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SideList = () => {
  const { user, drawer } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const list = useMemo(
    () => [
      {
        title: 'SAV',
        icon: <SupervisorAccount />,
        link: '/sav',
      },
      {
        title: 'Quality',
        icon: <Headphones />,
        link: '/quality',
      },

      {
        title: 'welcome call',
        icon: <SupportAgent />,
        link: '/wc',
      },
    ],
    []
  );

  async function logout() {
    await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history('/login');
  }

  const handleClose = () => {
    dispatch({
      type: 'SET_OPEN',
      payload: false,
    });
  };

  const [openItem, setOpenItem] = useState(true);

  const handleItemClick = () => {
    setOpenItem(!openItem);
  };

  const filteredList = useMemo(() => {
    if ((user && user.role === 'admin') || 'superviseur') {
      return list;
    } else if (user && user.role === 'sav') {
      return list.filter((item) => item.title === 'SAV');
    } else if (user && user.role === 'wc') {
      return list.filter((item) => item.title === 'welcome call');
    } else if (user && user.role === 'quality') {
      return list.filter((item) => item.title === 'Quality');
    } else {
      return [];
    }
  }, [user, list]);

  return (
    <div>
      <Drawer variant="permanent" open={drawer}>
        <DrawerHeader>
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {user && user.role === 'admin' ? (
            <>
              <ListItemButton onClick={handleItemClick}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Admin" />
                {openItem ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItem} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{
                      pl: 5.5,
                      minHeight: 48,
                      justifyContent: drawer ? 'initial' : 'center',
                      '&.Mui-selected': {
                        backgroundColor: grey[200],
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: grey[200],
                      },
                    }}
                    onClick={() => history('/admin')}
                    selected={location.pathname === '/admin'}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === '/admin' ? 'black' : 'auto',
                      }}
                    >
                      <Feed />
                    </ListItemIcon>
                    <ListItemText
                      primary="Suivi des ventes"
                      sx={{
                        opacity: drawer ? 1 : 0,
                        color:
                          location.pathname === '/admin' ? 'black' : 'auto',
                      }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => history('dataFactory')}
                    selected={location.pathname === 'dataFactory'}
                    sx={{
                      pl: 5.5,
                      minHeight: 48,
                      justifyContent: drawer ? 'initial' : 'center',
                      '&.Mui-selected': {
                        backgroundColor: grey[200],
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: grey[200],
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === 'dataFactory'
                            ? 'black'
                            : 'auto',
                      }}
                    >
                      <PostAdd />
                    </ListItemIcon>
                    <ListItemText
                      primary="Nouveaux contrats"
                      sx={{
                        opacity: drawer ? 1 : 0,
                        color:
                          location.pathname === 'dataFactory'
                            ? 'black'
                            : 'auto',
                      }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    sx={{
                      pl: 5.5,
                      minHeight: 48,
                      justifyContent: drawer ? 'initial' : 'center',
                      '&.Mui-selected': {
                        backgroundColor: grey[200],
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: grey[200],
                      },
                    }}
                    onClick={() => history('/admin/stats')}
                    selected={location.pathname === '/admin/stats'}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === '/stats' ? 'black' : 'auto',
                      }}
                    >
                      <Troubleshoot />
                    </ListItemIcon>
                    <ListItemText
                      primary="Statistique"
                      sx={{
                        opacity: drawer ? 1 : 0,
                        color:
                          location.pathname === '/stats' ? 'black' : 'auto',
                      }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    sx={{
                      pl: 5.5,
                      minHeight: 48,
                      justifyContent: drawer ? 'initial' : 'center',
                      '&.Mui-selected': {
                        backgroundColor: grey[200],
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: grey[200],
                      },
                    }}
                    onClick={() => history('/admin/users')}
                    selected={location.pathname === '/admin/users'}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === '/admin/users'
                            ? 'black'
                            : 'auto',
                      }}
                    >
                      <ManageAccounts />
                    </ListItemIcon>
                    <ListItemText
                      primary="Users"
                      sx={{
                        opacity: drawer ? 1 : 0,
                        color:
                          location.pathname === '/admin/users'
                            ? 'black'
                            : 'auto',
                      }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ) : null}

          {user && user.role === 'superviseur' ? (
            <>
              <ListItemButton onClick={handleItemClick}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Admin" />
                {openItem ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItem} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{
                      pl: 5.5,
                      minHeight: 48,
                      justifyContent: drawer ? 'initial' : 'center',
                      '&.Mui-selected': {
                        backgroundColor: grey[200],
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: grey[200],
                      },
                    }}
                    onClick={() => history('/admin')}
                    selected={location.pathname === '/admin'}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === '/admin' ? 'black' : 'auto',
                      }}
                    >
                      <Feed />
                    </ListItemIcon>
                    <ListItemText
                      primary="Suivi des ventes"
                      sx={{
                        opacity: drawer ? 1 : 0,
                        color:
                          location.pathname === '/admin' ? 'black' : 'auto',
                      }}
                    />
                  </ListItemButton>

                  <ListItemButton
                    sx={{
                      pl: 5.5,
                      minHeight: 48,
                      justifyContent: drawer ? 'initial' : 'center',
                      '&.Mui-selected': {
                        backgroundColor: grey[200],
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: grey[200],
                      },
                    }}
                    onClick={() => history('/stats')}
                    selected={location.pathname === '/stats'}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === '/stats' ? 'black' : 'auto',
                      }}
                    >
                      <Troubleshoot />
                    </ListItemIcon>
                    <ListItemText
                      primary="Statistique"
                      sx={{
                        opacity: drawer ? 1 : 0,
                        color:
                          location.pathname === '/stats' ? 'black' : 'auto',
                      }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ) : null}

          {filteredList.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawer ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: grey[200],
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: grey[200],
                  },
                }}
                onClick={() => history(item.link)}
                selected={location.pathname === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawer ? 3 : 'auto',
                    justifyContent: 'center',
                    color: location.pathname === item.link ? 'black' : 'auto',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    opacity: drawer ? 1 : 0,
                    color: location.pathname === item.link ? 'black' : 'auto',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title={user?.name || 'name'}>
            <Avatar
              src={user?.photoURL || ''}
              {...(drawer && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {drawer && <Typography>{user?.displayName || 'name'}</Typography>}
          <Typography variant="body2">{user?.role || 'role'}</Typography>
          {drawer && (
            <Typography variant="body2">{user?.email || 'email'}</Typography>
          )}
          <Tooltip title="LOGOUT" sx={{ mt: 1 }}>
            <IconButton onClick={logout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
    </div>
  );
};

export default SideList;
