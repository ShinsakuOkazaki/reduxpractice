import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editName} from "../actions/index";

class DefaultDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onlyUnique = this.onlyUnique.bind(this);
    }
    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    

    render() {
        const {suggested_ontologies, current_variable} = this.props;
        console.log("suggested_ontology",suggested_ontologies)
        const ontologies = suggested_ontologies.map(x => x["class_id"]).filter(this.onlyUnique)
        //let ontology_option = ontologies.map(x => ({label:x, value:x}))
        //console.log("ontology_option:", ontology_option)
        return (
            <Dropdown
                className="select-big"
                value={current_variable} 
                //options={ontology_option} 
                onChange={(e) => {
                        this.props.editName({type: "ontology", column: e.target.value});
                    }   
                } 
                placeholder="Select Ontology"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        suggested_ontologies: state.suggested_ontologies,
        current_variable: state.submit_variables[state.current_idx]["column_name"]
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editName: (column) => dispatch(editName(column))
    };
}

 const OntologyDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 //export default OntologyDropdown;