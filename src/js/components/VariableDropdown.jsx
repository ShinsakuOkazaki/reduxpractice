import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editSubmit} from "../actions/index";

class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {variable_option, submit_column} = this.props;
        return (
            <Dropdown
                className="select-big"          
                value={submit_column} 
                options={variable_option} 
                onChange={(e) => {
                        this.props.editSubmit({column_name: e.target.value});
                    }   
                } 
                placeholder="Select Variable"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        variable_option: state.variable_option,
        current_column: state.columns[state.current_idx],
        submit_column: state.submit_variables[state.current_idx]["column_name"]
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editSubmit: (column) => dispatch(editSubmit(column))
    };
}

 const VariableDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default VariableDropdown;