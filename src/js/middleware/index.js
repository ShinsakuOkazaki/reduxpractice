 import { EDIT_HEADER, CHECK_MATCH,} from "../constants/action-types";

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      // do your stuff
      if (action.type === EDIT_HEADER) {

      	const foundWord = forbiddenWords.filter(word =>
      		action.payload.includes(word)
      		);

      	if (foundWord.length) {
      		return dispatch({ type: CHECK_MATCH});
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