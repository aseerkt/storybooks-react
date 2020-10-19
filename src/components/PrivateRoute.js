import { CircularProgress, Container } from '@material-ui/core';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { loadUser } from '../redux/actions/authActions';
import Header from './layouts/Header';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            <>
              <Header />
              <Container className='body-container'>
                <Component />
              </Container>
            </>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
