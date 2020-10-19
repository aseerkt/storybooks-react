import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import UserStories from './stories/UserStories';

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <h3>Dashboard</h3>
      <h1>Welcome {user.displayName}</h1>
      <p>Here are your stories</p>
      <Link to='/stories' className='nav-link'>
        <button>See all public stories</button>
      </Link>
      <UserStories />
    </>
  );
}

export default Dashboard;
