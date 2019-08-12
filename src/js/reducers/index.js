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
		 ADD_LOCATION,
		 EDIT_UNIT,
		 EDIT_SEARCH,
		 STRATEGY_VISIBLE,
		 UPLOAD_VISIBLE
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
			location: [],
			format: "unit" 
		},
		{
			column_name: "VisitLabel", 
			description:"This variable represents subjects",
			variable_type: "multiple",
			statistical_type: "continuos",
			sop: "brabra",
			multiple: ["baseline", "2yr", "extra", "extr2"],
			visit_time: [],
			location: [],
			format:"cm" 
		},

	],
	ontologies : [
		{
			column_name: "CLINICAL_DIASTOLIC_BLOOD_PRESSURE", 
			description:"This variable represents subjects",
			variable_type: "number",
			statistical_type: "continuous",
			sop: "brabra",
			multiple: [],
			visit_time: [],
			location: [],
			format: "mm" 
		},
		{
			column_name: "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_AWAKE", 
			description:"This variable represents subjects",
			variable_type: "number",
			statistical_type: "continuous",
			sop: "brabra",
			multiple: [],
			visit_time: [],
			location: [],
			format: "cm" 
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
			location: [], 
			variable_class: "",
			format:"",
			search_by: "other"
		}
	],
	search_option: [
		{label: "Variable", value: "variable"},
		{label: "Ontology", value: "ontology"},
		{label: "Other", value: "other"}
	],
	formats: [
		{label: "MM/DD/YY", value: "mm/dd/yy"},
		{label: "cm", value: "cm"}, 
		{label: "mm", value: "mm"},
		{label:  "unit", value:  "unit"}
	],
	variable_option: [],
	ontology_option: [],
	strategy_page: false,
	upload_page: true,
	matching: false, 
	key_col: [],
	match: [],
	loading: false
};

function rootReducer(state = initialState, action) {
	
	if (action.type === INPUT_FILE) {
		const {columns, data} = action.payload;
		const {spine_variables, ontologies} = state;
		const spine_columns = spine_variables.map(x => x['column_name']);
		const ontology_names = ontologies.map(x =>  x['column_name']);
		let variable_option = spine_columns.map(x => ({label: x, value: x}));
		variable_option.push({label: "Cannot find suitable variable", value: ""})
		let ontology_option = ontology_names.map(x => ({label: x, value: x}));
		ontology_option.push({label: "Cannot find suitable ontology", value: ""})
		let submit_variables = new Array(columns.length);
		const unique = (value, index, self) => {
			return self.indexOf(value) === index;
		}
		for (let i = 0; i < columns.length; i++) {
			if (spine_columns.includes(columns[i])) {
				let idx_variable = spine_columns.indexOf(columns[i]);
				submit_variables[i] = Object.assign({}, spine_variables[idx_variable]);
				if (submit_variables[i]["variable_type"] === "multiple"){
					let spine_multiple = spine_variables[idx_variable]["multiple"];
					let values = data.map(x => x[columns[i]]);
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
					console.log(multiple)
					submit_variables[i]["multiple"] = multiple;
				}
				submit_variables[i]["search_by"] = "variable";
			} 
			else if (ontology_names.includes(columns[i])) {
				let idx_ontology = ontology_names.indexOf(columns[i]);
				submit_variables[i] = Object.assign({}, ontologies[idx_ontology]);
				submit_variables[i]["search_by"] = "ontology";
			}
			else {
				submit_variables[i] = {
					column_name: columns[i], 
					description: "",
					variable_type: "",
					statistical_type: "",
					sop: "",
					multiple: [],
					visit_time: [],
					location: [],
					format: "",
					search_by: "other"
					};
			}
		}
		return Object.assign({}, state, {
			columns : columns,
			data: data,
			submit_variables: submit_variables,
			variable_option: variable_option,
			ontology_option: ontology_option
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
	if(action.type === EDIT_UNIT) {
		const {format} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["format"] = format;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === EDIT_SEARCH) {
		const {search_by} = action.payload;
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["search_by"] = search_by;
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
		console.log(description)
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx]["description"] = description;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}
	if(action.type === EDIT_SOP) {
		const {sop} = action.payload;
		console.log(sop)
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
		console.log("Change in action")
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
	if(action.type === STRATEGY_VISIBLE) {
		return Object.assign({}, state, {
			strategy_page: action.payload
		})
	}
	if(action.type === UPLOAD_VISIBLE) {
		return Object.assign({}, state, {
			upload_page: action.payload
		})
	}
	

	
  	return state;
};
export default rootReducer;