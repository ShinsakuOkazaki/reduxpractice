import React from 'react';
import { connect } from 'react-redux';
import { editDatatype } from "../actions/index";
import {Dropdown} from 'primereact/dropdown';


class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //const { variable_types, submit_variables, current_idx} = this.props;
        //const current_variable = submit_variables[current_idx];
        //const current_variable_type = current_variable["variable_type"];
        const {current_variable_type, variable_types} = this.props;
        return (
            <Dropdown 
                    value={current_variable_type} 
                    options={variable_types} 
                    onChange={(e) => {
                            this.props.editDataType({ variable_type: e.target.value});
                        }   
                    } 
                    placeholder="Select Data Type"
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        current_variable_type: state.submit_variables[state.current_idx]['variable_type'],
        variable_types: state.variable_types,
        //submit_variables: state.submit_variables,
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      editDataType: (variable_type) => dispatch(editDatatype(variable_type))
    };
}

 const TypeDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default TypeDropdown;


