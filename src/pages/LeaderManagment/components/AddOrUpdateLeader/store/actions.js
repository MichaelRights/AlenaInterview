import { CLEAR_STATE, SET_STATE, HANDLE_CHANGE } from "./types";

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function setState(state) {
  return {
    type: SET_STATE,
    payload: { state },
  };
}

export function handleChange(key, value) {
  return {
    type: HANDLE_CHANGE,
    payload: {
      key,
      value,
    },
  };
}
