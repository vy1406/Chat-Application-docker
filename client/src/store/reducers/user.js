import * as actionTypes from "../actions/actionTypes";

// reducers.js
const initialState = {
  messages: [],
  users: [],
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
