import { INPUT_FILE,
		 EDIT_CELL,
		 EDIT_HEADER,
		 DATA_LOADED,
		 LOAD_STARTED,
		 SLIDE_INDEX,
		 CHANGE_CHOICE,
		 STRATEGY_VISIBLE,
		 UPLOAD_VISIBLE,
		 SET_STRATEGY_PAGE,
		 EDIT_SUBMIT,
		 SET_PAGE,
		 GO_TO_PAGE,
		 SET_SEARCH,
		 GET_CLASS_NAME,
		 PREPARE_NEXT,
		 ADD_ASSOCIATE, 
		 GET_ONTOLOGY_NAME,
		 GET_ONTOLOGY_ID
		} from "../constants/action-types";
import {getSuggestedVariable, getMultipleChoice} from "../middleware/index.js"

// initialState 
const initialState = {
 	columns: [], // columns; an array of column names user's uploaded file
	data: [], // data: an array of object. Each object corresponding to each row of user's file
	current_idx: 0, // current index of variable dealt with currently
	spine_variables: [ // spline_variables: array of object of variable in spine
		{				// currently we have example of variables inside
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
			description:"This variable represents visit",
			variable_type: "multiple",
			statistical_type: "continuos",
			sop: "brabra",
			multiple: ["baseline", "2yr", "extra", "extr2"],
			visit_time: [],
			location: [],
			format:"cm" 
		},

	],
	submit_variables: [ // submit_variables: array of object of variable to submit
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
			format:""
		}
	],
	variable_types: [ // variable_types: array of object of variable_type used for dropdown
						// this can be moved to local state of DataType depending on api
		{label: "Number", value: "number"},
		{label: "Multiple Choice", value: "multiple"},
		{label: "Date", value: "date"},
		{label: "Text", value: "text"}
	], 
	statistical_types: [ // statistical_types: array of object of statistical_type used for dropdown 
						// this can be moved to local state of StatUnit depending on api
		{label: "Continuous", value: "continuous"},
		{label: "Discrete", value: "discrete"}
	],
	formats: [ // formats: array of objects of format of choice
				// this can be moved to local state of UnitDropdown depending on api
		{label: "MM/DD/YY", value: "mm/dd/yy"},
		{label: "cm", value: "cm"}, 
		{label: "mm", value: "mm"},
		{label:  "unit", value:  "unit"}
	],
	variable_option:[ // variable_option: array of objects of variable option used for VariableDropdown
		{label: "", value:""}
	],
	ontology_names :[], // ontology_names: list of ontology names gotten from api

	class_names: [], // class_names: list of ontology names gotten from api

	ontology_ids: [], 

	class_ids: [],

	class_definitions: [],

	strategy_page: false, // strategy_page: flag for display strategy page

	upload_page: true, // upload_page: flag for display upload page

	page_type: "variable", // page_type: flag for display page for edit

	search: "", // search term for OntologySearch

	loading: false // loading: flag for loading
};



// reducer
function rootReducer(state = initialState, action) {
	//First action called when uploading data file.
	//This action adds columns, data, and submit_varianles,
	//which is a list of empty object.
	if (action.type === INPUT_FILE) {
		const {columns, data} = action.payload;
		let submit_variables = new Array(columns.length);
		for (let i = 0; i < columns.length; i++) {
			submit_variables[i] = {}; 
		}
		return Object.assign({}, state, {
			columns : columns,
			data: data,
			submit_variables: submit_variables
		});
	}

	// action to set visibility of strategy page
	if(action.type === STRATEGY_VISIBLE) {
		return Object.assign({}, state, {
			strategy_page: action.payload
		})
	}

	// action to set variable option useing variable name in user's data file (column) 
	if(action.type === SET_STRATEGY_PAGE) {
		const {columns, current_idx, spine_variables} = state;
		const suggested_variables = getSuggestedVariable(columns[current_idx], spine_variables)
		let variable_option = suggested_variables.map(x => ({label:x, value:x}));
		variable_option.push({label:"Cannot Find", value: ""});
		return Object.assign({}, state, {
			variable_option: variable_option
		})
	}

	// action to set visibiligy of upload page
	if(action.type === UPLOAD_VISIBLE) {
		console.log("uploadVisible is called:", action.payload)
		return Object.assign({}, state, {
			upload_page: action.payload
		})
	}

	// action to edit data correspoding to cell of table
	if (action.type === EDIT_CELL) {
		return Object.assign({}, state, {
			data: action.payload
		})
	}
	// action to edit header of table
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

	// action to edit submit_variables
	// action.payload will be an object, 
	//for example {column_name: column_name}, or {variable_type: variable_type}
	if (action.type === EDIT_SUBMIT) {
		console.log("submit payload:", action.payload)
		let {submit_variables, current_idx} = state
		submit_variables[current_idx] = Object.assign({}, submit_variables[current_idx], action.payload)
		return Object.assign({}, state, {
			submit_variables: [...submit_variables]
		})
	}

	// action
	if (action.type === SET_PAGE) {
		return Object.assign({}, state, {
			page_type: action.payload.page_type
		})
	}
	//action to move from strategy page to either variable, ontology, or other page
	if (action.type === GO_TO_PAGE) {
		let {spine_variables, page_type, submit_variables, current_idx, data} = state;
		//get column name of current index of submit_variable 
		const submit_column = submit_variables[current_idx]["column_name"]
		//if page_type is "variable", copy the spine_variable to submit_variable
		let submit_variable = {}
		if (page_type === "variable") {
			submit_variable = Object.assign({}, spine_variables.find(x => x.column_name === submit_column))
			console.log("submit_variable:", submit_variable)
			//if multiple, create multiple field
			if (submit_variable['multiple'].length !== 0) {
				const multiple = getMultipleChoice(spine_variables, submit_column, data)
				submit_variable['multiple'] = multiple
			} 
		}
		//if page_type is "other", create empty field other than column_name
		else if (page_type === "other") {
			submit_variable = {
				column_name: submit_column, 
				description:"",
				variable_type: "",
				statistical_type: "",
				sop: "",
				multiple: [],
				visit_time: [],
				location: [], 
				variable_class: "",
				format:""
			} ;
		// if page_type is "ontology"
		} else if (page_type === "ontology") {
			submit_variable = {
				column_name: submit_column, 
				ontology_name: "",
				ontology_id: "",
				description:""
			}
		}
		submit_variables[current_idx] = submit_variable;
		return Object.assign({}, state, {
			submit_variables: submit_variables
		})
	}

	// action called when api fetch is finished
	if (action.type === DATA_LOADED) {
		return Object.assign({}, state, {
			loading: !state.loading
		})
	}

	// action called when api fetch is started
	// and reset class_names and ontolgy_names state
	if (action.type === LOAD_STARTED) {
		return Object.assign({}, state, {
			ontology_names: [],
			class_names: [],
			ontology_names: [],
			ontology_ids: [],
			loading: !state.loading
		})
	}

	// action called when class is loaded from api
	if (action.type === GET_CLASS_NAME) {
		const {class_names, ontology_ids, class_ids, class_definitions} = action.payload
		return Object.assign({}, state, {
			class_names: class_names,
			ontology_ids: ontology_ids,
			class_ids: class_ids,
			class_definitions: class_definitions
		})
	}

	// action called when ontology is loaded from api 
	if (action.type === GET_ONTOLOGY_NAME) {
		const {ontology_names} = action.payload
		return Object.assign({}, state, {
			ontology_names: ontology_names
		})
	}
	// action called when ontology is loaded from api 
	if (action.type === GET_ONTOLOGY_ID) {
		const {ontology_ids} = action.payload
		return Object.assign({}, state, {
			ontology_names: ontology_ids
		})
	}
	
	// action to set search term
	if (action.type === SET_SEARCH) {
		return Object.assign({}, state, {
			search: action.payload
		})
	}

	// action to move current_idx
	if(action.type === SLIDE_INDEX) {
		return Object.assign({}, state, {
			current_idx: action.payload
		})
	}
	
	// action to prepare for strategy page
	if(action.type === PREPARE_NEXT) {
		return Object.assign({}, state, {
			page_type: "variable",
			search: ""
		})
	}
	
	// action to add associated columns to current variable
	if(action.type === ADD_ASSOCIATE) {
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx] = Object.assign({}, submit_variables[current_idx], action.payload)
		return Object.assign({}, state, {
			submit_variables: [...submit_variables]
		})
	}
	
	// action to change multiple choice
	if(action.type === CHANGE_CHOICE) {
		const {current_idx, submit_variables} = state;
		const {new_multiple} = action.payload;
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