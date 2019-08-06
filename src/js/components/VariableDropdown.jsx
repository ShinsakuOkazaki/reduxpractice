import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editName} from "../actions/index";

class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {column_name, variable_option} = this.props;
        
        return (
            <Dropdown
               
                value={column_name} 
                options={variable_option} 
                onChange={(e) => {
                        this.props.editName({ column: e.target.value});
                    }   
                } 
                placeholder="Select Variable"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        column_name: state.submit_variables[state.current_idx]['column_name'],
        variable_option: state.variable_option
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editName: (column) => dispatch(editName(column))
    };
}

 const VariableDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default VariableDropdown;