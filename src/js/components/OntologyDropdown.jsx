import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editName} from "../actions/index";

class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {column_name, ontology_option} = this.props;
        
        return (
            <Dropdown
                className="select-big"
                value={column_name} 
                options={ontology_option} 
                onChange={(e) => {
                        this.props.editName({ column: e.target.value});
                    }   
                } 
                placeholder="Select Ontology"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        column_name: state.submit_variables[state.current_idx]['column_name'],
        ontology_option: state.ontology_option
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editName: (column) => dispatch(editName(column))
    };
}

 const OntologyDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default OntologyDropdown;