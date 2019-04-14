import { ADD_ARTICLE, FOUND_BAD_WORD/*, DATA_LOADED*/ } from "../constants/action-types";

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      // do your stuff
      if (action.type === ADD_ARTICLE) {

      	const foundWord = forbiddenWords.filter(word =>
      		action.payload.title.includes(word)
      		);

      	if (foundWord.length) {
      		return dispatch({ type: FOUND_BAD_WORD});
      	}
      }
      return next(action);
    }
  }
}

/*
export function getData() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED, payload: json });
      });
  };
}
*/