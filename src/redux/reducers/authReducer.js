import { USER_LOADED, USER_LOADING, USER_LOAD_FAIL } from '../actions/types';

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOADED:
      return { isLoading: false, isAuthenticated: true, user: action.payload };
    case USER_LOAD_FAIL:
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}
