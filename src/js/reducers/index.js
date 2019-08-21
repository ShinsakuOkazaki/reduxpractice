import { INPUT_FILE,
		 EDIT_CELL,
		 EDIT_HEADER,
		 DATA_LOADED,
		 LOAD_STARTED,
		 SLIDE_INDEX,
		 CHANGE_CHOICE,
		 EDIT_SOP,
		 STRATEGY_VISIBLE,
		 UPLOAD_VISIBLE,
		 SET_STRATEGY_PAGE,
		 EDIT_SUBMIT,
		 SET_PAGE,
		 GO_TO_PAGE,
		 ONTOLOGY_LOADED,
		 ONTOLOGY_STARTED,
		 SET_SEARCH,
		 GET_CLASS_NAME,
		 PREPARE_NEXT,
		 ADD_ASSOCIATE
		} from "../constants/action-types";
import stringSimilarity from "string-similarity";

function getSpineColumns(spine_variables) {
	return spine_variables.map(x => x["column_name"])
}

function compareRating(a, b){
	return b.rating - a.rating
}

function getSuggestedVariable(column, spine_variables) {
	//console.log("check string:", column)
	const spine_columns = getSpineColumns(spine_variables);
	//console.log(spine_columns)
	const suggested_variables = stringSimilarity.findBestMatch(column, spine_columns)["ratings"].sort(compareRating).map(x => x["target"]);
	//console.log(suggested_variable)
	//console.log("sucess")
	return suggested_variables
}

const unique = (value, index, self) => {
	return self.indexOf(value) === index;
}

function getMultipleChoice(spine_variables, column, data) {
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
			format:""
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
	variable_option:[
		{label: "", value:""}
	],
	ontology_option :[],
	strategy_page: false,
	upload_page: true,
	page_type: "variable",
	search: "",
	loading: false
};

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
	if(action.type === STRATEGY_VISIBLE) {
		return Object.assign({}, state, {
			strategy_page: action.payload
		})
	}
	if(action.type === SET_STRATEGY_PAGE) {
		const {columns, current_idx, spine_variables} = state;
		const suggested_variables = getSuggestedVariable(columns[current_idx], spine_variables)
		console.log("suggested_variable", suggested_variables)
		let variable_option = suggested_variables.map(x => ({label:x, value:x}));
		variable_option.push({label:"Cannot Find", value: ""});
		console.log("variable_option:", variable_option)
		return Object.assign({}, state, {
			variable_option: variable_option
		})
	}

	if(action.type === UPLOAD_VISIBLE) {
		console.log("uploadVisible is called:", action.payload)
		return Object.assign({}, state, {
			upload_page: action.payload
		})
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
	if (action.type === EDIT_SUBMIT) {
		console.log("submit payload:", action.payload)
		let {submit_variables, current_idx} = state
		submit_variables[current_idx] = Object.assign({}, submit_variables[current_idx], action.payload)
		return Object.assign({}, state, {
			submit_variables: [...submit_variables]
		})
	}
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
	if (action.type === DATA_LOADED) {
		return Object.assign({}, state, {
			loading: !state.loading
		})
	}
	if (action.type === LOAD_STARTED) {
		const {ontology} = action.payload
		return Object.assign({}, state, {
			ontology_option: ontology,
			loading: !state.loading
		})
	}
	if (action.type === ONTOLOGY_LOADED) {
		const {ontology} = action.payload;
		const {ontology_option} = state
		console.log("ontology", ontology)
		console.log("ontology_option", ontology_option)
		return Object.assign({}, state, {
			ontology_option: [...ontology_option, ontology],
		})
	}
	if (action.type === GET_CLASS_NAME) {
		const {class_name} = action.payload
		return Object.assign({}, state, {
			class_name: class_name
		})
	}

	if (action.type === ONTOLOGY_STARTED) {
		return Object.assign({}, state, {
			loading: !state.loading
		})
	}
	if (action.type === SET_SEARCH) {
		return Object.assign({}, state, {
			search: action.payload
		})
	}
	if(action.type === SLIDE_INDEX) {
		return Object.assign({}, state, {
			current_idx: action.payload
		})
	}
	if(action.type === PREPARE_NEXT) {
		return Object.assign({}, state, {
			page_type: "variable",
			ontology_option :[],
			search: ""
		})
	}
	
	if(action.type === ADD_ASSOCIATE) {
		let {current_idx, submit_variables} = state;
		submit_variables[current_idx] = Object.assign({}, submit_variables[current_idx], action.payload)
		return Object.assign({}, state, {
			submit_variables: [...submit_variables]
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
	
  	return state;
};
export default rootReducer;