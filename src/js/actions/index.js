import { INPUT_FILE , EDIT_CELL, EDIT_HEADER, DATA_LOADED,  LOAD_STARTED} from "../constants/action-types";


export function inputFile(payload) {
  return { type: INPUT_FILE, payload } 
}

export function editCell(payload){
  return { type: EDIT_CELL, payload }
}

export function editHeader(payload) {
  return { type: EDIT_HEADER, payload }
}

export function loadStarted() {
  return { type: LOAD_STARTED }
}

export function dataLoaded(payload) {
  return { type: DATA_LOADED, payload }
}

export function getData() {
  return function(dispatch) {
    dispatch(loadStarted())
    return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => {
      dispatch(dataLoaded(json));
    });
  }
}