import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { Dashboard, ExitToApp, LocalLibrary, Menu } from '@material-ui/icons';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { alertErrors } from '../../redux/actions/alertActions';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    // console.log(open);
    setOpen(!open);
  };

  const logoutUser = async (e) => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      history.push('/login');
    } catch (err) {
      console.error(err);
      dispatch(alertErrors('Couldnt logout', 'LOGOUT_FAIL'));
    }
  };

  const listItems = [
    { text: 'Public Stories', href: '/stories', icon: <LocalLibrary /> },
    { text: 'Dashboard', href: '/', icon: <Dashboard /> },
    { text: 'Logout', href: '#', icon: <ExitToApp /> },
  ];
  const list = () => (
    <div
      className={clsx(classes.list, classes.fullList)}
      role='presentation'
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {listItems.map((item, index) => (
          <Link
            to={item.href}
            key={index}
            onClick={item.text === 'Logout' ? logoutUser : () => false}
            className='nav-link'
          >
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <AppBar position='sticky' className='header'>
      <Toolbar>
        <Container className='header-container'>
          <React.Fragment key='left'>
            <IconButton onClick={toggleDrawer}>
              <Menu className='menu-icon' />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer}>
              {list()}
            </Drawer>
          </React.Fragment>
          <Link to='/' className='brand-logo center'>
            StoryBooks
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
