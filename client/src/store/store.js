import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import chatReducer from "./reducers/chat";
import useReducer from "./reducers/user";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  chat: chatReducer,
  user: useReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
