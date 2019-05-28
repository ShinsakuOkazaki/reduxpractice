import { INPUT_FILE, EDIT_CELL, EDIT_HEADER } from "../constants/action-types";


const initialState = {
 	columns: [],
	data: []
};

function rootReducer(state = initialState, action) {
	
	if (action.type === INPUT_FILE) {
		return Object.assign({}, state, {
			columns : state.columns.concat(action.payload.columns),
			data: state.data.concat(action.payload.data)
		});
	}
	
	if (action.type === EDIT_CELL) {
		return Object.assign({}, state, {
			columns: state.columns,
			data: action.payload
		})
	}
	if (action.type === EDIT_HEADER) {
		return Object.assign({}, state, {
			columns: action.payload,
			data : state.data
		})
	}
	
  	return state;
};
export default rootReducer;