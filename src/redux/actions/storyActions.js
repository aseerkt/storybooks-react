import axios from 'axios';
import { alertErrors } from './alertActions';
import {
  PUBLIC_STORIES_LOADED,
  PUBLIC_STORIES_LOADING,
  PUBLIC_STORIES_LOAD_FAIL,
  USER_STORIES_LOADED,
  USER_STORIES_LOADING,
  USER_STORIES_LOAD_FAIL,
} from './types';

export const loadPublicStories = () => async (dispatch) => {
  dispatch({ type: PUBLIC_STORIES_LOADING });
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/stories`,
      { withCredentials: true }
    );
    dispatch({
      type: PUBLIC_STORIES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: PUBLIC_STORIES_LOAD_FAIL });
    dispatch(alertErrors(err.response?.data.error, 'PUBLI_POSTS_LOAD_FAIL'));
  }
};

export const loadUserStories = (userId) => async (dispatch) => {
  dispatch({ type: USER_STORIES_LOADING });
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/stories/user/${userId}`,
      { withCredentials: true }
    );
    dispatch({
      type: USER_STORIES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: USER_STORIES_LOAD_FAIL });
    dispatch(alertErrors(err.response?.data.error, 'PUBLI_POSTS_LOAD_FAIL'));
  }
};
