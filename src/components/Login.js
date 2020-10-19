import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
} from '@material-ui/core';

function Login() {
  return (
    <Container className='login-container'>
      <Card>
        <CardContent>
          <h3 className='login-heading'>
            <i className='fas fa-book-reader'></i> StoryBooks
          </h3>
          <div>
            <small>Create public and private stories from your life</small>
          </div>
          <Divider />
          <div>
            <a
              style={{ textDecoration: 'none' }}
              href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
              className='btn red darken-1'
            >
              <Button
                variant='contained'
                color='secondary'
                style={{ margin: '10px' }}
              >
                <i className='fab fa-google left'></i>{' '}
                <span style={{ marginLeft: '10px' }}>Log In With Google</span>
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
