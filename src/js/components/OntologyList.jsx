import React from 'react';
import { connect } from "react-redux";
import {ListBox} from 'primereact/listbox';
import {editSubmit} from "../actions/index";

class DefaultList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {current_ontology, ontology_option, class_name} = this.props
        const option = ontology_option.map((x, i) => ({label: class_name[i] + " -- " + x, value: class_name[i]+ " -- " + x}))
        if (option.length === 0) {
            return (
                <div>
                    <h4>Not Found</h4>
                </div>
            )
        }
        return (
            <ListBox value={current_ontology} options={option} onChange={(e) => this.props.editSubmit({ontology_name: e.value})} style={{width:"50%"}} />
        )
    }
}

const mapStateToProps = state => {
    return {
        ontology_option: state.ontology_option,
        current_ontology : state.submit_variables[state.current_idx]["ontology_name"],
        class_name : state.class_name
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editSubmit: ontology_name => dispatch(editSubmit(ontology_name))
    };
}

const OntologyList = connect(mapStateToProps, mapDispatchToProps)(DefaultList);
export default OntologyList;