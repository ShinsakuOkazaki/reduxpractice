import React from 'react';
import {Dropdown} from 'primereact/dropdown';
import { connect } from "react-redux";
import {editSubmit} from "../actions/index";

class DefaultPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {ontology_option, current_variable} = this.props
        const option = ontology_option.map(x => ({label: x, value:x}))
        return (
            <Dropdown 
                value={current_variable}
                options={option}
                onChange={(e) => this.props.editSubmit({column_name: e.target.value})} 
                placeholder="Select an Ontology"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        ontology_option: state.ontology_option,
        current_variable : state.submit_variables[state.current_idx]["column_name"]
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editSubmit: column_name => dispatch(editSubmit(column_name))
    };
}

 const OntologyPage = connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
 export default OntologyPage;