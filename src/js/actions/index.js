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
         GOTO_INDEX,
         CHANGE_CHOICE,
         EDIT_STATTYPE,
         EDIT_DESCRIPTION,
         EDIT_SOP,
         ADD_VISIT,
         ADD_LOCATION,
         EDIT_UNIT,
         EDIT_SEARCH,
         STRATEGY_VISIBLE,
         SET_STRATEGY_PAGE,
         UPLOAD_VISIBLE,
         UPLOAD_DATA,
         LOAD_ONTOLOGY,
         EDIT_SUBMIT,
         SET_PAGE,
         GO_TO_PAGE,
         ONTOLOGY_STARTED,
         ONTOLOGY_LOADED
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
export function gotoIndex(payload) {
  return { type: GOTO_INDEX, payload }
}
export function changeChoice(payload) {
  return { type: CHANGE_CHOICE, payload }
}
export function editStatType(payload) {
  return { type: EDIT_STATTYPE, payload }
}
export function editDescription(payload) {
  return { type: EDIT_DESCRIPTION, payload}
}
export function editSOP(payload) {
  return { type: EDIT_SOP, payload}
}
export function addVisit(payload) {
  return { type: ADD_VISIT, payload}
}
export function addLocation(payload) {
  return { type: ADD_LOCATION, payload}
}

export function editUnit(payload) {
  return { type: EDIT_UNIT, payload }
}

export function editSearch(payload) {
  return { type: EDIT_SEARCH, payload }
}

export function strategyVisible(payload) {
  return { type: STRATEGY_VISIBLE, payload }
}
export function setStrategyPage() {
  return { type: SET_STRATEGY_PAGE}
}

export function uploadVisible(payload) {
  return { type: UPLOAD_VISIBLE, payload }
}

export function loadStarted(payload) {
  return { type: LOAD_STARTED, payload }
}

export function dataLoaded(payload) {
  return { type: DATA_LOADED, payload }
}

export function uploadData() {
  return { type: UPLOAD_DATA}
}

export function loadOntology() {
  return {type: LOAD_ONTOLOGY}
}

export function editSubmit(payload) {
  return {type: EDIT_SUBMIT, payload}
}

export function setPage(payload) {
  return {type: SET_PAGE, payload}
}
export function goToPage() {
  return {type: GO_TO_PAGE}
}
export function ontologyStarted() {
  return {type: ONTOLOGY_STARTED}
}
export function ontologyLoaded(payload) {
  return {type: ONTOLOGY_LOADED, payload}
}




export function getData(column) {
  return function(dispatch) {
    dispatch(loadStarted({ontology:[]}))
    const url = "http://data.bioontology.org/search?q=" + column + "&suggest=true";
    return fetch( url, 
                {
                  headers: {'Authorization': 'apikey token=67b7e570-22e9-4759-b747-da6cb8703580'}
                })
    .then(
      response => response.json(), 
      error => console.log("An error occired.", error)
    )
    .then(
      function(json) {
        const ontology_ids = json["collection"].map(x => x["links"]["ontology"]);
        for (let i = 0; i < ontology_ids.length; i++) {
          dispatch(getOntology(ontology_ids[i]))
        }
      }
    )
  }
}

export function getOntology(ontology_id) {
  return function(dispatch) {
    dispatch(ontologyStarted())
    console.log(ontology_id)
    return fetch( ontology_id, 
                {
                  headers: {'Authorization': 'apikey token=67b7e570-22e9-4759-b747-da6cb8703580'}
                })
    .then(
      response => response.json(), 
      error => console.log("An error occired.", error)
    )
    .then((json) => {
      dispatch(ontologyLoaded({ontology:json["name"]}));
    });
  }
}
