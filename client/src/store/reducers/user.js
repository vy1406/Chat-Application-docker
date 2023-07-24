

// reducers.js
const initialState = {
    messages: [],
    users: [],
    user:{}
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case 'ADD_MESSAGE':
    //     return {
    //       ...state,
    //       messages: [...state.messages, action.payload],
    //     };
      case 'SET_USERS':
        return {
          ...state,
          users: action.users,
        };
        case 'SET_USER':
          return {
            ...state,
            users: action.user,
          };
      default:
        return state;
    }
  };
  
  export default userReducer;  