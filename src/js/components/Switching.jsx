import React from "react";
import { connect } from "react-redux";
import MultipleChoice from "./MultipleChoice.jsx";

class DefaultSwitching extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {variable_type} = this.props
        if (variable_type === "multiple") {
            return (<MultipleChoice/>)
        } else {
            return (<p>Placeholder</p>)
        }
    }
}

const mapStateToProps = state => {
    return {variable_type: state.submit_variables[state.current_idx]["variable_type"]};
}

const Switching = connect(mapStateToProps)(DefaultSwitching);
export default  Switching;