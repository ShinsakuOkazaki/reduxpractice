import { ADD_ARTICLE, FOUND_BAD_WORD, DATA_LOADED, INPUT_FILE, EDIT_CELL } from "../constants/action-types";


const initialState = {
 	columns: [],
	rows: []
};

function rootReducer(state = initialState, action) {
	if (action.type === ADD_ARTICLE) {
		return Object.assign({}, state, {
			articles: state.articles.concat(action.payload)
		});
	}
	if (action.type === FOUND_BAD_WORD) {
		window.alert("Forbidden words have been input");
	}
	if (action.type === DATA_LOADED) {
		return Object.assign({}, state, {
			remoteArticles: state.remoteArticles.concat(action.payload)
		});
	}
	if (action.type === INPUT_FILE) {
		return Object.assign({}, state, {
			columns : state.columns.concat(action.payload.columns),
			rows: state.rows.concat(action.payload.rows)
		});
	}
	
	if (action.type === EDIT_CELL) {
		return Object.assign({}, state, {
			columns: state.columns,
			rows: action.payload
		})
	}
	
  	return state;
};
export default rootReducer;