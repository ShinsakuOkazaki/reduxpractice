import { INPUT_FILE, EDIT_CELL, EDIT_HEADER, DATA_LOADED, MATCHED } from "../constants/action-types";


const initialState = {
 	columns: [],
	data: [],
	old_columns: [],
	key_col: [],
	match: []
};

function rootReducer(state = initialState, action) {
	
	if (action.type === INPUT_FILE) {
		return Object.assign({}, state, {
			columns : state.columns.concat(action.payload.columns),
			data: state.data.concat(action.payload.data),
			old_columns: state.old_columns.concat(action.payload.old_columns),
			key_col: state.key_col,
			match: state.match
		});
	}
	
	if (action.type === EDIT_CELL) {
		return Object.assign({}, state, {
			columns: state.columns,
			data: action.payload,
			old_columns: state.old_columns,
			key_col: state.key_col,
			match: state.match
		})
	}
	if (action.type === EDIT_HEADER) {
		return Object.assign({}, state, {
			columns: action.payload,
			data : state.data,
			old_columns: state.old_columns,
			key_col: state.key_col,
			match: state.match
		})
	}
	if (action.type == DATA_LOADED) {
		return Object.assign({}, state, {
			columns: state.columns,
			data : state.data,
			old_columns: state.old_columns,
			key_col: state.key_col.concat(action.payload),
			match: state.match
		})
	}
	if (action.type == MATCHED) {
		return Object.assign({}, state, {
			columns: state.columns,
			data : state.data,
			old_columns: state.old_columns,
			key_col: state.key_col.concat(action.payload),
			match: action.payload
		})
	}
  	return state;
};
export default rootReducer;