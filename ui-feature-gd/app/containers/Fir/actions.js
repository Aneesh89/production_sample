/*
 *
 * Fir actions
 *
 */

import { 
  DEFAULT_ACTION,
  AGE_UP,
  AGE_DOWN,
  FETCH_TAB
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function ageUp() {
  return {
    type: AGE_UP,
  };
}

export function ageDown() {
  return {
    type: AGE_DOWN,
  };
}

export function fetchTab() {
  return {
    type: FETCH_TAB,
  };
}

