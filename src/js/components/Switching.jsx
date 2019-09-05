// This component switch display of component based on variable type of current working variable
// If the type is multiple, this will show MultipleChoice component
// Otherwise, this will show UnitDropDown and StatUnit component
import React from "react";
import { connect } from "react-redux";
import MultipleChoice from "./MultipleChoice.jsx";
import StatUnit from "./StatUnit.jsx";
import UnitDropdown from "./UnitDropdown.jsx";

class DefaultSwitching extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {variable_type} = this.props
        if (variable_type === "multiple") {
            return (<MultipleChoice/>)
        } else {
            return (
                <div className="unit-stat">
                    <div className="line-left ">
                        <p>Unit</p>
                        <UnitDropdown/>
                    </div>
                    <div className="line-right ">
                        <p>Statistical Type</p>
                        <StatUnit/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {variable_type: state.submit_variables[state.current_idx]["variable_type"]};
}

const Switching = connect(mapStateToProps)(DefaultSwitching);
export default  Switching;