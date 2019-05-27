import { INPUT_FILE, EDIT_CELL, EDIT_HEADER } from "../constants/action-types";


const initialState = {
 	columns: [],
	rows: []
};

function rootReducer(state = initialState, action) {
	
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
	if (action.type === EDIT_HEADER) {
		return Object.assign({}, state, {
			columns: action.payload,
			rows : state.rows
		})
	}
	
  	return state;
};
export default rootReducer;