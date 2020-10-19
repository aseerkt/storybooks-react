import {
  PUBLIC_STORIES_LOADED,
  PUBLIC_STORIES_LOADING,
  PUBLIC_STORIES_LOAD_FAIL,
  USER_STORIES_LOADED,
  USER_STORIES_LOADING,
  USER_STORIES_LOAD_FAIL,
} from '../actions/types';

const initialState = {
  publicStoriesAreLoading: true,
  userStoriesAreLoading: true,
  publicStories: [],
  userStories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PUBLIC_STORIES_LOADING:
      return { ...state, publicStoriesAreLoading: true };
    case PUBLIC_STORIES_LOADED:
      return {
        ...state,
        publicStories: action.payload,
        publicStoriesAreLoading: false,
      };
    case PUBLIC_STORIES_LOAD_FAIL:
      return { ...state, publicStoriesAreLoading: false };

    case USER_STORIES_LOADING:
      return { ...state, userStoriesAreLoading: true };
    case USER_STORIES_LOADED:
      return {
        ...state,
        userStories: action.payload,
        userStoriesAreLoading: false,
      };
    case USER_STORIES_LOAD_FAIL:
      return { ...state, userStoriesAreLoading: false };

    default:
      return state;
  }
}
