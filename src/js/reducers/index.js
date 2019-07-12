import { INPUT_FILE, EDIT_CELL, EDIT_HEADER, DATA_LOADED, MATCHED, LOAD_STARTED} from "../constants/action-types";


const initialState = {
 	columns: [],
	data: [],
	old_columns: [],
	key_col: [],
	match: [],
	loading: false
};

function rootReducer(state = initialState, action) {
	
	if (action.type === INPUT_FILE) {
		return Object.assign({}, state, {
			columns : state.columns.concat(action.payload.columns),
			data: state.data.concat(action.payload.data),
			old_columns: state.old_columns.concat(action.payload.old_columns)
		});
	}
	
	if (action.type === EDIT_CELL) {
		return Object.assign({}, state, {
			data: action.payload
		})
	}
	if (action.type === EDIT_HEADER) {
		return Object.assign({}, state, {
			columns: action.payload
		})
	}
	if (action.type == DATA_LOADED) {
		return Object.assign({}, state, {
			key_col: state.key_col.concat(action.payload),
			loading: !state.loading
		})
	}
	if (action.type == MATCHED) {
		return Object.assign({}, state, {
			match: action.payload
		})
	}
	if(action.type == LOAD_STARTED) {
		return Object.assign({}, state, {
			loading: !state.loading
		})
	}
  	return state;
};
export default rootReducer;