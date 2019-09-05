// Dropdown for variable in SPINE used on StrategyPage Component
import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editSubmit} from "../actions/index";


class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { spine_variables} = this.props;
        const spine_variable = spine_variables.find(x => x["column_name"] === e.target.value)
        let description = ""
        if (typeof spine_variable !== "undefined") {
            description = spine_variable["description"]
        }
        this.props.editSubmit({column_name: e.target.value, description: description});
    }
    render() {
        const {variable_option, submit_column} = this.props;
        
        return (
            <Dropdown
                className="select-big"          
                value={submit_column} 
                options={variable_option} 
                onChange={this.onChange} 
                filter={true}
                placeholder="Select Variable"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        variable_option: state.variable_option,
        current_column: state.columns[state.current_idx],
        submit_column: state.submit_variables[state.current_idx]["column_name"], 
        spine_variables : state.spine_variables
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editSubmit: (column) => dispatch(editSubmit(column))
    };
}

 const VariableDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default VariableDropdown;