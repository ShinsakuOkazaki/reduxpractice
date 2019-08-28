import {SET_SEARCH} from "../constants/action-types";
import {getData } from "../actions/index.js"
import stringSimilarity from "string-similarity";

// middleware for pull api
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

// function used in getSuggestedVariable
function compareRating(a, b){
	return b.rating - a.rating
}
// function to get suggested variable from spine based on variable name of users
export function getSuggestedVariable(column, spine_variables) {
	const spine_columns = spine_variables.map(x => x["column_name"])
	const suggested_variables = stringSimilarity.findBestMatch(column, spine_columns)["ratings"].sort(compareRating).map(x => x["target"]);
	return suggested_variables
}

// function used in getMultipleChoice
const unique = (value, index, self) => {
	return self.indexOf(value) === index;
}

// function to get elements of multiple choice
// create array of matched multiple choice
// create array of variables left in spine 
// create array of variables left in user's
// concatenate these arrays
export function getMultipleChoice(spine_variables, column, data) {
	spine_variables = Array.from(spine_variables)
	console.log("spine_variables", spine_variables)
	let spine_multiple = Object.assign({}, spine_variables.find(x => x.column_name === column))["multiple"];
	let values = data.map(x => x[column]);
	let submit_multiple = values.filter(unique);
	let matched_multiple = submit_multiple.filter(x => spine_multiple.includes(x));
	let diff_spine = spine_multiple.filter(x => !submit_multiple.includes(x));
	let diff_submit = submit_multiple.filter(x => !spine_multiple.includes(x));
	let empty_spine = new Array(diff_submit.length).fill("");
	let empty_submit = new Array(diff_spine.length).fill("");
	diff_spine = diff_spine.concat(empty_spine)
	diff_submit = empty_submit.concat(diff_submit)
	let temp_spine_multiple = matched_multiple.concat(diff_spine);
	let temp_submit_multiple  = matched_multiple.concat(diff_submit);
	let multiple = temp_spine_multiple.map((value, index) => ({spine: value, submit: temp_submit_multiple[index]}))
	console.log("mutltiple:",multiple)
	return multiple;
}


