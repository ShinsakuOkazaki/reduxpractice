import React from 'react';
import { connect } from "react-redux";
import OntologySearch from './OntologySearch.jsx';
import OntologyList from './OntologyList.jsx';
import VerifyButton from "./Verify.jsx";
import {ProgressSpinner} from 'primereact/progressspinner';
import GoToColumn from "./GoToColumn.jsx";


class DefaultPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>{this.props.current_variable}</h3>
                <OntologySearch/>
                {this.props.loading ? (
                     <ProgressSpinner/>
                ):(
                    <OntologyList/>
                )}
                <GoToColumn/>
                <VerifyButton/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ontology_option: state.ontology_option,
        current_variable : state.submit_variables[state.current_idx]["column_name"]
    };
}

 const OntologyPage = connect(mapStateToProps)(DefaultPage);
 export default OntologyPage;