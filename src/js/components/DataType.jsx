import React from 'react';
import { connect } from 'react-redux';
import { editDatatype } from "../actions/index";
import {Dropdown} from 'primereact/dropdown';


class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {current_variable_type, variable_types} = this.props;
        return (
            <div >
                <p>Data Type</p>
                <Dropdown 
                        value={current_variable_type} 
                        options={variable_types} 
                        onChange={(e) => {
                                this.props.editDataType({ variable_type: e.target.value});
                            }   
                        } 
                        placeholder="Select Data Type"
                />
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        current_variable_type: state.submit_variables[state.current_idx]['variable_type'],
        variable_types: state.variable_types
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      editDataType: (variable_type) => dispatch(editDatatype(variable_type))
    };
}

 const TypeDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default TypeDropdown;


