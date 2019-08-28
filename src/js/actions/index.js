import {
  INPUT_FILE,
  EDIT_CELL,
  EDIT_HEADER,
  DATA_LOADED,
  LOAD_STARTED,
  SLIDE_INDEX,
  CHANGE_CHOICE,
  STRATEGY_VISIBLE,
  UPLOAD_VISIBLE,
  SET_STRATEGY_PAGE,
  EDIT_SUBMIT,
  SET_PAGE,
  GO_TO_PAGE,
  SET_SEARCH,
  GET_CLASS_NAME,
  PREPARE_NEXT,
  ADD_ASSOCIATE, 
  GET_ONTOLOGY_NAME, 
  GET_ONTOLOGY_ID
        } from "../constants/action-types";

const axios = require('axios');

export function inputFile(payload) {
  return { type: INPUT_FILE, payload } 
}

export function editCell(payload){
  return { type: EDIT_CELL, payload }
}

export function editHeader(payload) {
  return { type: EDIT_HEADER, payload }
}

export function dataLoaded() {
  return { type: DATA_LOADED}
}

export function loadStarted() {
  return { type: LOAD_STARTED}
}

export function slideIndex(payload) {
  return { type: SLIDE_INDEX, payload }
}


export function changeChoice(payload) {
  return { type: CHANGE_CHOICE, payload }
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

export function editSubmit(payload) {
  return {type: EDIT_SUBMIT, payload}
}

export function setPage(payload) {
  return {type: SET_PAGE, payload}
}
export function goToPage() {
  return {type: GO_TO_PAGE}
}

export function setSearch(payload) {
  return {type: SET_SEARCH, payload}
}

export function getClassName(payload) {
  return {type: GET_CLASS_NAME, payload}
}
export function getOntologyName(payload) {
  return {type: GET_ONTOLOGY_NAME, payload}
}
export function prepareNext() {
  return {type: PREPARE_NEXT}
}
export function addAssociate(payload) {
  return {type: ADD_ASSOCIATE, payload}
}

export function getOntologyId(payload) {
  return {type: GET_ONTOLOGY_ID, payload}
}

// function to get ontology api
// api is nested so that we have to call multiple api at the same time
export function getData(search) {
  return function(dispatch) {
    dispatch(loadStarted())
    const url = "http://data.bioontology.org/search?q=" + search + "&ontology&suggest=true&roots_only=true";
      axios.get( url, 
      {
        headers: {'Authorization': 'apikey token=67b7e570-22e9-4759-b747-da6cb8703580'}
      })
      .then(
        function (response) {
          
          const classes = response["data"]
          let ontology_ids = classes["collection"].map(x => x["links"]["ontology"]);
          //dispatch(getOntologyId({ontology_ids: ontology_ids}))
          const class_names = classes["collection"].map(x => x["prefLabel"])
          const class_ids = classes["collection"].map(x => x["@id"])
          const class_definitions = classes["collection"].map(x => x["definition"])
          dispatch(getClassName({class_names, ontology_ids, class_ids, class_definitions}))
          ontology_ids = ontology_ids.map(x => axios.get(x, {
            headers: {'Authorization': 'apikey token=67b7e570-22e9-4759-b747-da6cb8703580'}
          }))
          console.log("ontolgy_ids: ",ontology_ids)
          axios.all(ontology_ids, 
          ).then(function (response) {
              const ontologies = response.map(x => x["data"])
              const ontology_names = ontologies.map(x=>x["name"])
              dispatch(getOntologyName({ontology_names: ontology_names}))
            }
          ).then(function (error) {
            console.log(error)
          })
      }      
      ).then(
        function (error) {
          console.log(error)
      }
      )
      dispatch(dataLoaded())
    }
  }

