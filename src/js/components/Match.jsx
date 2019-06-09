import React from "react";
import { connect } from "react-redux";

class MatchHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            preHeader: [
              "Subject", "VisitLabel", "VisitDate",
              "CLINICAL_SYSTOLIC_BLOOD_PRESSURE", 
              "CLINICAL_DIASTOLIC_BLOOD_PRESSURE",
              //"CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_24_HOURS",
              //"CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_24_HOURS",
              "NEW_COLUMN",
              "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_AWAKE",
              "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_AWAKE",
              "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_ASLEEP",
              "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_ASLEEP",
              "NEW_COLUMN"
            ]
           // matched: []
          };
    }
    render() {
        const {columns,headerKey,headerId} = this.props;
        const matched = this.state.preHeader.includes(columns[headerId]);
        return(
            <div>
                {matched ? (
                <p className="panel-title text-success">{columns[headerId]}</p> 
                ) : (
                <p className="panel-title text-danger">None</p>
                )}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {columns: state.columns, data: state.data};
};

const Match = connect(mapStateToProps)(MatchHeader);
export default  Match;