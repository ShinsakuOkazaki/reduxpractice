import {GO_TO_PAGE} from "../constants/action-types";
import {getData } from "../actions/index.js"

export function checkMatchMiddleware({ dispatch, getState }) {
  return function(next){
    return function(action){
      const {page_type, columns, current_idx} = getState();
      if (action.type === GO_TO_PAGE && page_type === "ontology") {
        const column = columns[current_idx]
        console.log("in medleware:", column)
        dispatch(getData(column))
      }
      return next(action);
    }
  }
}

