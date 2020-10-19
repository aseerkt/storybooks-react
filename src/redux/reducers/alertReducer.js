import { ALERT_ERROR, CLEAR_ALERTS } from '../actions/types';

const initialState = {
  severity: null,
  msg: null,
  label: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALERT_ERROR:
      return action.payload;
    case CLEAR_ALERTS:
      return initialState;
    default:
      return state;
  }
}
