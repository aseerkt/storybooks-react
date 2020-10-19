import { USER_LOADED, USER_LOADING, USER_LOAD_FAIL } from './types';
import axios from 'axios';
import { alertErrors } from './alertActions';

export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/auth/user`,
      { withCredentials: true }
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(alertErrors(err.response?.data.error, USER_LOAD_FAIL));
    dispatch({
      type: USER_LOAD_FAIL,
    });
  }
};
