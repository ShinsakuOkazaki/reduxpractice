// This component switchs next operation according to user choince
// If user selects variable, this sets next page VariablePage.
// If user selects ontology, this sets next page OntologyPage.header

import React from "react";
import { connect } from "react-redux";
import VariablePage from "./VariablePage.jsx";
import OntologyPage from "./OntologyPage.jsx";

class DefaultSwitching extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {page_type} = this.props
        if (page_type === "ontology") {
            return (<OntologyPage/>)
        } else {
            return (<VariablePage/>)
        }
    }
}

const mapStateToProps = state => {
    return {page_type: state.page_type};
}

const PageSwitching = connect(mapStateToProps)(DefaultSwitching);
export default  PageSwitching;