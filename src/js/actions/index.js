import { INPUT_FILE,
         EDIT_CELL, 
         EDIT_HEADER, 
         DATA_LOADED,  
         LOAD_STARTED, 
         SLIDE_INDEX, 
         CHANGE_CHOICE,
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
         ONTOLOGY_LOADED,
         SET_SEARCH,
         GET_CLASS_NAME,
         PREPARE_NEXT,
         ADD_ASSOCIATE
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
export function setSearch(payload) {
  return {type: SET_SEARCH, payload}
}

export function getClassName(payload) {
  return {type: GET_CLASS_NAME, payload}
}
export function prepareNext() {
  return {type: PREPARE_NEXT}
}
export function addAssociate(payload) {
  return {type: ADD_ASSOCIATE, payload}
}


export function getData(column) {
  return function(dispatch) {
    dispatch(loadStarted({ontology:[]}))
    const url = "http://data.bioontology.org/search?q=" + column + "&ontology&suggest=true&roots_only=true";
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
        const class_name = json["collection"].map(x => x["prefLabel"])
        const ontologies = []
        for (let i = 0; i < ontology_ids.length; i++) {
          ontologies.push(getOntology(ontology_ids[i]))
        }
        dispatch(getClassName({class_name: class_name}))
      }
    )
    .then(
      dispatch(dataLoaded())
    )
  }
}

export function getOntology(ontology_id) {
  const response = fetch( ontology_id, 
    {
      headers: {'Authorization': 'apikey token=67b7e570-22e9-4759-b747-da6cb8703580'}
    })
  const ontology = response.json()
  return (ontology["name"])
}




// export function getData(column) {
//   return function(dispatch) {
//     dispatch(loadStarted({ontology:[]}))
//     const url = "http://data.bioontology.org/search?q=" + column + "&ontology&suggest=true&roots_only=true";
//     return fetch( url, 
//                 {
//                   headers: {'Authorization': 'apikey token=67b7e570-22e9-4759-b747-da6cb8703580'}
//                 })
//     .then(
//       response => response.json(), 
//       error => console.log("An error occired.", error)
//     )
//     .then(
//       function(json) {
//         const ontology_ids = json["collection"].map(x => x["links"]["ontology"]);
//         const class_name = json["collection"].map(x => x["prefLabel"])
//         dispatch(getClassName({class_name: class_name}))
//         for (let i = 0; i < ontology_ids.length; i++) {
//           dispatch(getOntology(ontology_ids[i]))
//         }
//       }
//     )
//     .then(
//       dispatch(dataLoaded())
//     )
//   }
// }

// export function getOntology(ontology_id) {
//   return function(dispatch) {
//     console.log(ontology_id)
//     return fetch( ontology_id, 
//                 {
//                   headers: {'Authorization': 'apikey token=67b7e570-22e9-4759-b747-da6cb8703580'}
//                 })
//     .then(
//       response => response.json(), 
//       error => console.log("An error occired.", error)
//     )
//     .then((json) => {
//       dispatch(ontologyLoaded({ontology:json["name"]}));
//     });
//   }
// }
