import React from "react";
import { connect } from "react-redux";
import { editHeader } from "../actions/index";
import ReactTooltip from 'react-tooltip'

class EditableHeader extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        preHeader: [
          "Subject", "VisitLabel", "VisitDate",
          "CLINICAL_SYSTOLIC_BLOOD_PRESSURE", 
          "CLINICAL_DIASTOLIC_BLOOD_PRESSURE",
          //"CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_24_HOURS",
          //"CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_24_HOURS",
          "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_AWAKE",
          "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_AWAKE",
          "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_ASLEEP",
          "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_ASLEEP",
          "NEW_COLUMN"
        ],
       // matched: []
      };
     // this.checkMatch = this.checkMatch.bind(this);
    }

    // checkMatch() {
    //   const {columns,headerKey,headerId} = this.props;
    //   const matchIf = this.state.preHeader.includes(columns);
    //   this.setState({matched: this.state.matched[headerKey]})
    //   return (
    //     <div className="panel-heading">
    //       {matched ? (
    //         <p className="panel-title text-success">{columns[headerId]}</p> 
    //       ) : (
    //         <p className="panel-title text-danger">None</p>
    //       )}
    //     </div>
    //   )
    // }

    render () {
      const {columns,headerKey,headerId} = this.props;
      const matched = this.state.preHeader.includes(headerKey);
      return (
        <div className="panel panel-default">
           <div className="panel-heading">
            {matched ? (
              <p className="panel-title text-success">{columns[headerId]}</p> 
              ) : (
              <p className="panel-title text-danger">None</p>
              )}
            </div>
            <div className="panel-body" data-tip data-for={headerId.toString()}>
              <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable ={true}
                suppressContentEditableWarning ={true}
                onBlur={e => {
                  columns[headerId] = e.target.innerHTML;
                  this.props.editHeader(columns);
                }}
                dangerouslySetInnerHTML={{
                  __html: columns[headerId]
                }}
              />
            </div> 
            <ReactTooltip id={headerId.toString()} getContent={() => <span>{columns[headerId]}</span>}/>   
          </div> 
      )
    }
  }


  const mapDispatchToProps = dispatch => {
    return { 
      editHeader: columns => dispatch(editHeader(columns)) 
    }
  }

  const mapStateToProps = state => {
    return {columns: state.columns, data: state.data};
  };

const Header = connect(mapStateToProps, mapDispatchToProps)(EditableHeader);
export default  Header;
