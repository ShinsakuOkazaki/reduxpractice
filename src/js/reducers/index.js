import { INPUT_FILE,
		 EDIT_CELL,
		 EDIT_HEADER,
		 DATA_LOADED,
		 MATCHED,
		 LOAD_STARTED,
		 SLIDE_INDEX,
		 COLUMN_MATCHING,
		 UPDATE_CURRENT,
		 STORE_SUBMIT,
		 EDIT_DATATYPE,
		 EDIT_NAME,
		 GOTO_INDEX,
		 CHANGE_CHOICE,
		 EDIT_STATTYPE,
		 EDIT_DESCRIPTION,
		 EDIT_SOP,
		 ADD_VISIT,
		 ADD_LOCATION
		} from "../constants/action-types";


const initialState = {
 	columns: [],
	data: [],
	current_idx: 0,
	spine_variables: [
		{
			column_name: "Subject", 
			description:"This variable represents subjects",
			variable_type: "number",
			statistical_type: "discrete",
			sop: "brabra",
			multiple: [],
			visit_time: [],
			location: [] 
		},
		{
			column_name: "VisitLabel", 
			description:"This variable represents subjects",
			variable_type: "multiple",
			statistical_type: "continuos",
			sop: "brabra",
			multiple: ["baseline", "2yr", "extra", "extr2"],
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
	statistical_types: [
		{label: "Continuous", value: "continuous"},
		{label: "Discrete", value: "discrete"}
	],
	submit_variables: [
		{
			column_name: "", 
			description:"",
			variable_type: "",
			statistical_type: "",
			sop: "",
			multiple: [],
			visit_time: [],
			location: [] 
		}
	],
	matching: false, 
	key_col: [],
	match: [],
	loading: false
};

function rootReducer(state = initialState, action) {
	
	if (action.type === INPUT_FILE) {
		const {columns, data} = action.payload;
		const spine_variables = state.spine_variables;
		const spine_columns = spine_variables.map(x => x['column_name']);
		let submit_variables = new Array(columns.length);
		const unique = (value, index, self) => {
			return self.indexOf(value) === index;
		}
		for (let i = 0; i < columns.length; i++) {
			if (spine_columns.includes(columns[i])) {
				let idx_variable = spine_columns.indexOf(columns[i]);
				submit_variables[i] = Object.assign({}, spine_variables[idx_variable]);
				if (submit_variables[i]["variable_type"] === "multiple"){
					const values = data.map(x => x[columns[i]]);
					const multiple = values.filter(unique);
					submit_variables[i]["multiple"] = multiple;
				
				}
			} else {
				submit_variables[i] = {
					column_name: columns[i], 
					description: "",
					variable_type: "",
					statistical_type: "",
					sop: "",
					multiple: [],
					visit_time: [],
					location: [] 
					};
			}
		}
		return Object.assign({}, state, {
			columns : columns,
			data: data,
			submit_variables: submit_variables
		});
	}
	
	if (action.type === EDIT_CELL) {
		return Object.assign({}, state, {
			data: action.payload
		})
	}
	if (action.type === EDIT_HEADER) {
		const {column} = action.payload;
		let {submit_variables, current_idx, columns} = state;
		submit_variables[current_idx]['column_name'] = column;
		columns[current_idx] = column;
		return Object.assign({}, state, {
			columns: columns,
			submit_variables: submit_variables
		})
	}
	if (action.type === EDIT_NAME) {
		const {column} = action.payload;
		let {submit_variables, current_idx, columns} = state;
		submit_variables[current_idx]['column_name'] = column;
		columns[current_idx] = column;
		return Object.assign({}, state, {
			columns: columns,
			submit_variables: submit_variables
		})
	}
	if (action.type === DATA_LOADED) {
		return Object.assign({}, state, {
			key_col: state.key_col.concat(action.payload),
			loading: !state.loading
		})
	}
	if(action.type === SLIDE_INDEX) {
		return Object.assign({}, state, {
			current_idx: action.payload
		})
	}
	if(action.type === COLUMN_MATCHING) {
		const {column, current_idx} = action.payload
		const spine_columns = state.spine_variables.map(x => x["column_name"]);
		const matching = spine_columns.includes(column)
		return Object.assign({}, state, {
			matching: matching
		})
	}
	if(action.type === EDIT_DATATYPE) {
		const {variable_type} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["variable_type"] = variable_type;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === EDIT_STATTYPE) {
		const {statistical_type} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["statistical_type"] = statistical_type;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === ADD_VISIT) {
		const {visit_time} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["visit_time"] = visit_time;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === ADD_LOCATION) {
		const {location} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["location"] = location;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === EDIT_DESCRIPTION) {
		const {description} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["description"] = description;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === EDIT_SOP) {
		const {sop} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["sop"] = sop;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === STORE_SUBMIT) {
		return Object.assign({}, state, {
			submit_variables: action.payload
		})
	}
	if(action.type === GOTO_INDEX) {
		return Object.assign({}, state, {
			current_idx: action.payload
		})
	}
	if(action.type === CHANGE_CHOICE) {
		const {current_idx, submit_variables} = state;
		const {new_multiple} = action.payload;
		console.log(new_multiple)
		let multiple = []
		for (let i = 0; i < new_multiple.length; i++) {
			if (new_multiple[i] !== "") {
				multiple.push(new_multiple[i])
			}
		}
		submit_variables[current_idx]["multiple"] = multiple
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	

	
  	return state;
};
export default rootReducer;