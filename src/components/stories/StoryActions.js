import { IconButton } from '@material-ui/core';
import { Delete, Edit, MenuBook } from '@material-ui/icons';
import Axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { alertErrors } from '../../redux/actions/alertActions';
import { loadUserStories } from '../../redux/actions/storyActions';

function StoryActions({ storyId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await Axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/stories/${storyId}`,
        { withCredentials: true }
      );
      console.log('Delete Success');
      dispatch(loadUserStories(user._id));
      history.push('/');
    } catch (err) {
      console.error(err);
      dispatch(alertErrors(err.response?.data.error, 'DELETE_STORY_FAIL'));
    }
  };
  return (
    <div>
      <Link to={`/stories/edit/${storyId}`}>
        <IconButton>
          <Edit fontSize='small' />
        </IconButton>
      </Link>
      <form style={{ display: 'inline' }} onSubmit={handleDelete}>
        <IconButton type='submit'>
          <Delete fontSize='small' />
        </IconButton>
      </form>
    </div>
  );
}

export default StoryActions;
