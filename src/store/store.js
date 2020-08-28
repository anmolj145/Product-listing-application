import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import mainreducer from "./reducer/mainreducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  app: mainreducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(
  rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;