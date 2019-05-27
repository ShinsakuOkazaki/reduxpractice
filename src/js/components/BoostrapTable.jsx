import React from "react";
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { columns, rows } = this.props;
        const newColumns = columns.map(c => {
            return {
                    dataField: c.toLowerCase(),
                    text: c
                    }
            }
        )
    }
}

const mapStateToProps = state => {
    return {columns: state.columns, rows: state.rows};
  };


  const TableSub = connect(mapStateToProps, mapDispatchToProps)(Table);
  export default  TableSub;