import React from 'react';
import { connect } from 'react-redux';
import { updateCurrent} from "../actions/index";
import {Dropdown} from 'primereact/dropdown';


class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { variable_types, current_variable} = this.props;
        const current_variable_type = current_variable["variable_type"];
        return (
            <Dropdown 
                    value={current_variable_type} 
                    options={variable_types} 
                    onChange={(e) => {
                            current_variable["variable_type"] = e.value;
                            this.props.updateCurrent(current_variable);
                        }   
                    } 
                    placeholder="Data Type"
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        variable_types: state.variable_types,
        current_variable: state.current_variable
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      updateCurrent: current_variable => dispatch(updateCurrent(current_variable))
    };
}

 const TypeDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default TypeDropdown;


