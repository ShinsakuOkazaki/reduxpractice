// Page component for variable edit operation
import React from 'react';
import { connect } from "react-redux";
import TypeDropdown from "./DataType.jsx";
import Switching from "./Switching.jsx";
import Descriotion from "./Description.jsx";
import SOP from "./SOP.jsx";
import AssociatedVisit from "./AssociatedVisit.jsx";
import AssociatedLocation from "./AssociatedLocation.jsx";
import VerifyButton from "./Verify.jsx";

import ProgressPanel from "./ProgressPanel.jsx"


class DefaultPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="w3-row">
                <div className="w3-col l3">
                    <div className="w3-margin">
                        <h3>{this.props.submit_column}</h3>
                    </div>
                    <div className="w3-margin">
                        <ProgressPanel/>
                    </div>
                </div>
                <div className="w3-col l3">
                    <div className="data-type">
                        <TypeDropdown/>
                    </div>
                    <div className="w3-margin">
                    <Switching/>
                    </div>
                </div> 
                <div className="w3-col l3">
                    <div className="w3-margin">
                    <Descriotion/>
                    </div>
                    <div className="w3-margin">
                    <SOP/>
                    </div>
                </div>
                <div className="w3-col l3">
                    <div className="w3-margin">
                    <AssociatedVisit/>
                    </div>
                    <div className="w3-margin">  
                    <AssociatedLocation/>
                    </div>
                    <div className="varify"> 
                    <VerifyButton/>
                    </div>
                </div>
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        submit_column: state.submit_variables[state.current_idx]["column_name"]
    }
}

const VariablePage = connect(mapStateToProps)(DefaultPage);
export default VariablePage;