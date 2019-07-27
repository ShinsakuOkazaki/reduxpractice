import { INPUT_FILE,
         EDIT_CELL, 
         EDIT_HEADER, 
         DATA_LOADED,  
         LOAD_STARTED, 
         SLIDE_INDEX, 
         COLUMN_MATCHING,
         UPDATE_CURRENT,
         STORE_SUBMIT,
         EDIT_DATATYPE,
         EDIT_NAME
        } from "../constants/action-types";


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

export function slideIndex(payload) {
  return { type: SLIDE_INDEX, payload }
}

export function columnMatching(payload) {
  return { type: COLUMN_MATCHING, payload }
}

export function updateCurrent(payload) {
  return { type: UPDATE_CURRENT, payload }
}

export function storeSubmit(payload) {
  return { type: STORE_SUBMIT, payload }
}
export function editDatatype(payload) {
  return { type: EDIT_DATATYPE, payload }
}

export function editName(payload) {
  return { type: EDIT_NAME, payload }
}

export function getData() {
  return function(dispatch) {
    dispatch(loadStarted())
    return fetch("https://virtserver.swaggerhub.com/gregblt/SPINE_clinical_variable/1.0.0/clinical-variable")
    .then(response => response.json())
    .then(json => {
      dispatch(dataLoaded(json));
    });
  }
}

// "https://jsonplaceholder.typicode.com/posts"