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
    }
      
      renderEditable(cellInfo) {
        const { data }= this.props;
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable ={true}
            suppressContentEditableWarning ={true}
            onBlur={e => {
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.props.editCell(data);
            }}
            dangerouslySetInnerHTML={{
              __html: data[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }
      
      render() {
        const { columns, data } = this.props;
        const renderEditable = this.renderEditable;
        const newColumns = columns.map((column, id) => {
          return { Header: () => 
                      <div>
                        <Header headerKey={column} headerId={id}/>
                      </div>
                      ,
                    accessor: column.toLowerCase(),
                    filterable: false,
                    sortable: false,
                    Cell: renderEditable,
                    width: 100
                  }
                }
              )

        return (
          <div>
            <ReactTable
              data={data}
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
    editCell: data => dispatch(editCell(data)) 
  }
}

const mapStateToProps = state => {
  return {columns: state.columns, data: state.data};
};

const TableSub = connect(mapStateToProps, mapDispatchToProps)(Table);
export default  TableSub;


