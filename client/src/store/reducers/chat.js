import socketIO from 'socket.io-client';


// reducers.js
const initialState = {
   // messages: [],
    socket: socketIO.connect('http://localhost:8080'),
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case 'ADD_MESSAGE':
    //     return {
    //       ...state,
    //       messages: [...state.messages, action.payload],
    //     };
      case 'SET_SOCKET':
        return {
          ...state,
          socket: action.socket,
        };
      default:
        return state;
    }
  };
  
  export default chatReducer;  