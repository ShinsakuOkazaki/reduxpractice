import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { editCell } from "../actions/index";
import Pagination from "./Pagination.jsx";
import Header from "./Header.jsx";


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.renderEditable = this.renderEditable.bind(this);
        this.matchingHeader = this.matchingHeader.bind(this);
      }
      
      renderEditable(cellInfo) {
        const {columns, rows }= this.props;
        //convert an array of array to array of object
        const newRows = rows.map(
          function(arr){
            const ob = {}
            columns.forEach((key, i) => ob[key.toLowerCase()] = arr[i]);
            return ob
          }
        )
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable ={true}
            suppressContentEditableWarning ={true}
            onBlur={e => {
              newRows[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              const changedRows = newRows.map(
                function(ob) {
                  const arr=[];
                  columns.forEach((key, i) =>arr[i] = ob[key.toLowerCase()]);
                  return arr
                }
              )
              this.props.editCell(changedRows);
            }}
            dangerouslySetInnerHTML={{
              __html: newRows[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }


      matchingHeader(key, id) {
        const preHeader = ["Subject", "VisitLabel", "VisitDate",
                           "CLINICAL_SYSTOLIC_BLOOD_PRESSURE", 
                           //"CLINICAL_DIASTOLIC_BLOOD_PRESSURE",
                           "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_24_HOURS",
                           //"CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_24_HOURS",
                           "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_AWAKE",
                           "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_AWAKE",
                          // "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_ASLEEP",
                           "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_ASLEEP"]
        
           
        const matched = preHeader.includes(key);
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              {matched ? (
                <p className="panel-title text-success">{key}</p> 
              ) : (
                <p className="panel-title text-danger">None</p>
              )}
            </div>
            <div className="panel-body">
                <Header key={key} id={id}/>
            </div> 
          </div> 
        );
      }
    
      
      render() {
        const { columns, rows } = this.props;
        const renderEditable = this.renderEditable;
        const matchingHeader = this.matchingHeader;
        //convert an array of array to array of object
        const newRows = rows.map(
            function(arr){
              const ob = {}
              columns.forEach((key, i) => ob[key.toLowerCase()] = arr[i]);
              return ob
            }
          )
        //convert an array of string to array of object
        const newColumns = columns.map(
          function(key, id){
            return {Header: matchingHeader(key, id),
                    accessor: key.toLowerCase(),
                    Cell: renderEditable,
                    width: 300, 
                  }
          }
          )

        return (
          <div>
            <ReactTable
              data={newRows}
              columns={newColumns}
              PaginationComponent={Pagination}
              //showPagination = {true}
              //pageSize={20}
              className="-striped -highlight"
            />
          </div>
        );
      }
    
}

const mapDispatchToProps = dispatch => {
  return { 
    editCell: rows => dispatch(editCell(rows)) 
  }
}


const mapStateToProps = state => {
  return {columns: state.columns, rows: state.rows};
};

const TableSub = connect(mapStateToProps, mapDispatchToProps)(Table);
export default  TableSub;


