import React from 'react';
import { connect } from "react-redux";
import OntologySearch from './OntologySearch.jsx';
import OntologyList from './OntologyList.jsx';
import VerifyButton from "./Verify.jsx";
import {ProgressSpinner} from 'primereact/progressspinner';
import ProgressPanel from "./ProgressPanel.jsx"


class DefaultPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w3-row">
                <div className="w3-margin">
                        <h3>{this.props.submit_column}</h3>
                </div>
                <div className="w3-col l3">
                    <ProgressPanel/>
                </div>
                <div className="w3-col l6">
                    <h3>{this.props.current_variable}</h3>
                    <OntologySearch/>
                    {this.props.loading ? (
                        <ProgressSpinner/>
                    ):(
                        <OntologyList className="ontology-list"/>
                    )}
                </div>
                <div className="w3-col l3">
                    {/* <GoToColumn/> */}
                    <VerifyButton/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        submit_column: state.submit_variables[state.current_idx]["column_name"]
    };
}

 const OntologyPage = connect(mapStateToProps)(DefaultPage);
 export default OntologyPage;