import {SET_SEARCH} from "../constants/action-types";
import {getData } from "../actions/index.js"

export function checkMatchMiddleware({ dispatch, getState }) {
  return function(next){
    return function(action){
      if (action.type === SET_SEARCH) {
        const {search} = getState();
        dispatch(getData(search))
      }
      return next(action);
    }
  }
}

