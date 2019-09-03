// import React from "react";
// import { connect } from "react-redux";
// import ReactTable from "react-table";
// import "react-table/react-table.css";
// import { editCell } from "../actions/index";
// import Pagination from "./Pagination.jsx";
// import Header from "./Header.jsx";
// // import { getData } from "../actions/index";
// import {Sidebar} from 'primereact/sidebar';
// // import {Button} from 'primereact/button';


// class Table extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {visible:false}
//         this.renderEditable = this.renderEditable.bind(this);
//     }
      
//       renderEditable(cellInfo) {
//         const { data }= this.props;
//         return (
//           <div
//             contentEditable ={true}
//             suppressContentEditableWarning ={true}
//             onBlur={e => {
//               data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
//               this.props.editCell(data);
//             }}
//             dangerouslySetInnerHTML={{
//               __html: data[cellInfo.index][cellInfo.column.id]
//             }}
//           />
//         );
//       }

//       // componentDidMount() {
//       //   this.props.getData();
//       // }
      
//       render() {
//         const { columns, data, current_idx} = this.props;
//         const renderEditable = this.renderEditable;
        
//         const newColumns = columns.map((column, id) => {
//           return { Header: () => 
//                       <div >
//                         <Header headerKey={column} headerId={id}/>
//                       </div>
//                     ,
//                     accessor: column,
//                     filterable: false,
//                     sortable: false,
//                     Cell: renderEditable,
//                     width: 150,
//                     getHeaderProps: (state, rowInfo, column, instance) => {
//                       return {
//                         style: {
//                           background: column.id === columns[current_idx] ? null : '#A9A9A9'
//                         }
//                       }
//                     },
//                     getProps: (state, rowInfo, column) => {
                      
//                       return {
//                           style: {
//                               background: column.id === columns[current_idx] ? null : '#A9A9A9'
//                           }
//                       }
//                     },
//                   }
//                 }
//               )

//         return (
//           <div>
//           {/* <Sidebar visible={this.state.visible} position="bottom" onHide={(e) => this.setState({visible:false})}> */}
//             <ReactTable
//               data={data}
//               columns={newColumns}
//               PaginationComponent={Pagination}
//               //showPagination = {true}
//               pageSize={2}
//               // className="-striped -highlight"
//               // getProps = {() => {
//               //   return {
//               //     style: {
//               //       'borderCollapse': 'separate',
//               //       'borderSpacing': '15px'
//               //     }
//               //   }
//               // }}
//             />
//           {/* </Sidebar> */}
//           {/* <Button label="Select Variable to edit" onClick={(e) => this.setState({visible:true})}/> */}
//           </div>
//         );
//       }
    
// }



// const mapDispatchToProps = dispatch => {
//   return { 
//     editCell: data => dispatch(editCell(data)),
//     // getData: data => dispatch(getData(data))
//   }
// }

// const mapStateToProps = state => {
//   return {
//     columns: state.columns,
//     data: state.data, match: state.match,
//     current_idx:state.current_idx
//   };
// };

// const TableSub = connect(mapStateToProps, mapDispatchToProps)(Table);
// export default  TableSub;


