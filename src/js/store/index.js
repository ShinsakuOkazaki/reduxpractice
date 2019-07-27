import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { checkMatchMiddleware } from "../middleware";
import thunk from "redux-thunk";
//import createSagaMiddleware from "redux-saga";
//import apiSaga from "../sagas/api-saga";
//const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
   storeEnhancers(
     applyMiddleware(checkMatchMiddleware, thunk)
  )
);
//initialiseSagaMiddleware.run(apiSaga);
export default store;