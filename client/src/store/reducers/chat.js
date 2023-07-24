import socketIO from 'socket.io-client';
import * as actionTypes from "../actions/actionTypes";


// reducers.js
const initialState = {
    socket: socketIO.connect('http://localhost:8080'),
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case actionTypes.SET_SOCKET:
        return {
          ...state,
          socket: action.socket,
        };
      default:
        return state;
    }
  };
  
  export default chatReducer;  