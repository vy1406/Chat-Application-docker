import socketIO from 'socket.io-client';
import * as actionTypes from "../actions/actionTypes";


// reducers.js
const initialState = {
    socket: socketIO.connect('http://localhost:8080'),
    messages:[]
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case actionTypes.SET_SOCKET:
        return {
          ...state,
          socket: action.socket,
        };
        case actionTypes.SET_MESSAGES:
          return {
            ...state,
            messages: action.messages,
          };
      default:
        return state;
    }
  };
  
  export default chatReducer;  