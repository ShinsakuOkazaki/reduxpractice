import { INPUT_FILE,
		 EDIT_CELL,
		 EDIT_HEADER,
		 DATA_LOADED,
		 MATCHED,
		 LOAD_STARTED,
		 SLIDE_INDEX,
		 COLUMN_MATCHING,
		 UPDATE_CURRENT
		} from "../constants/action-types";


const initialState = {
 	columns: [],
	data: [],
	current: 0,
	spine_variable: [
		{
			column_name: "Subject_ID", 
			description:"This variable represents subjects",
			variable_type: "number",
			statistical_type: "discrete",
			sop: "brabra",
			multiple: [],
			visit_time: [],
			location: [] 
		},
		{
			column_name: "Opening_Date", 
			description:"This variable represents subjects",
			variable_type: "number",
			statistical_type: "continuos",
			sop: "brabra",
			multiple: [],
			visit_time: [],
			location: [] 
		}
	],
	variable_types: [
			{label: "Number", value: "number"},
			{label: "Multiple Choice", value: "multiple"},
			{label: "Date", value: "date"},
			{label: "Text", value: "text"}
		], 
	current_variable: {
		column_name: "", 
		description: "",
		variable_type: "",
		statistical_type: "",
		sop: "",
		multiple: [],
		visit_time: [],
		location: [] 
		}, 
	submit_variable: [],
	matching: false, 
	key_col: [],
	match: [],
	loading: false
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
	if(action.type == SLIDE_INDEX) {
		return Object.assign({}, state, {
			current: action.payload
		})
	}
	if(action.type == COLUMN_MATCHING) {
		return Object.assign({}, state, {
			matching: action.payload
		})
	}
	if(action.type == UPDATE_CURRENT) {
		return Object.assign({}, state, {
			current_variable: action.payload
		})
	}
	
  	return state;
};
export default rootReducer;