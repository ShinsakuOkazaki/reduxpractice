import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { editCell } from "../actions/index";
  

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.renderEditable = this.renderEditable.bind(this);
      }
      
      renderEditable(cellInfo) {
        const {columns, rows }= this.props;
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
      
      render() {
        const { columns, rows } = this.props;
        const renderEditable = this.renderEditable;

        const newRows = rows.map(
            function(arr){
              const ob = {}
              columns.forEach((key, i) => ob[key.toLowerCase()] = arr[i]);
              return ob
            }
          )
        
        const newColumns = columns.map(
          function(c){
            return { Header: c,
                    accessor: c.toLowerCase(),
                    Cell: renderEditable 
                  }
          }
          )

        return (
          <div>
            <ReactTable
              data={newRows}
              columns={newColumns}
              defaultPageSize={10}
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


