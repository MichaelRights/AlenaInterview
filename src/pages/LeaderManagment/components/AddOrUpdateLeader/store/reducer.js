import { CLEAR_STATE, SET_STATE, HANDLE_CHANGE } from ".";
export const initialState = {
  id: 0,
  firstName: "",
  lastName: "",
  organization: "",
  email: "",
  phone: "",
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_CHANGE:
      return { ...state, [action.payload.key]: action.payload.value };
    case SET_STATE:
      return action.payload.state;
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
