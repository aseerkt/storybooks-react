import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CircularProgress, Container, Fab } from '@material-ui/core';
import { loadUser } from './redux/actions/authActions';
import PublicStories from './components/stories/PublicStories';
import AddStory from './components/stories/AddStory';
import UserStories from './components/stories/UserStories';
import SingleStory from './components/stories/SingleStory';
import Header from './components/layouts/Header';
import { Add } from '@material-ui/icons';
import PrivateRoute from './components/PrivateRoute';
import EditStory from './components/stories/EditStory';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/login' component={Login} />
        <>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/stories' component={PublicStories} />
          <PrivateRoute
            exact
            path='/stories/s/:storyId'
            component={SingleStory}
          />
          <PrivateRoute
            exact
            path='/stories/user/userId'
            component={UserStories}
          />
          <PrivateRoute exact path='/stories/add' component={AddStory} />
          <PrivateRoute
            exact
            path='/stories/edit/:storyId'
            component={EditStory}
          />
        </>
        <Link className='add-icon-button' to='/stories/add'>
          <Fab color='secondary' aria-label='edit'>
            <Add />
          </Fab>
        </Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
