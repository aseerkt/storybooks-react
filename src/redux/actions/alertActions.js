import { ALERT_ERROR, CLEAR_ALERTS } from './types';

export const alertErrors = (msg, label = null) => {
  return {
    type: ALERT_ERROR,
    payload: {
      severity: 'ERROR',
      msg,
      label,
    },
  };
};

export const clearAlerts = () => ({ type: CLEAR_ALERTS });
