import { ADD_ARTICLE, FOUND_BAD_WORD, DATA_LOADED, INPUT_FILE , EDIT_CELL} from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

export function foundBadWord(payload) {
	return {type: FOUND_BAD_WORD, payload }
};

export function inputFile(payload) {
  return { type: INPUT_FILE, payload } 
}

export function editCell(payload){
  return { type: EDIT_CELL, payload }
}


export function getData() {
  return function (dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => {
      dispatch ({type: DATA_LOADED, payload: json });
    });
  };
}