// import React from "react";
// import { connect } from "react-redux";
// import { editHeader, gotoIndex } from "../actions/index";
// import ReactTooltip from 'react-tooltip'




// class EditableHeader extends React.Component {
//     constructor(props){
//       super(props);
//     }

//     render() {
//       const {columns,headerKey,headerId} = this.props;
//       return (
//         <div>
//             <div data-tip data-for={headerId.toString()}>
//               <div
//                 suppressContentEditableWarning ={true}
//                 onClick={e => {
                  
//                   this.props.gotoIndex(headerId);
//                 }}
//                 dangerouslySetInnerHTML={{
//                   __html: columns[headerId]
//                 }}  
//               />
//             </div> 
//             <ReactTooltip id={headerId.toString()} getContent={() => <span>{columns[headerId]}</span>}/>   
//           </div> 
//       )
//     }
//   }


//   const mapDispatchToProps = dispatch => {
//     return { 
//       editHeader: column => dispatch(editHeader(column)),
//       gotoIndex: idx => dispatch(gotoIndex(idx))
//     };
//   }

// const mapStateToProps = state => {
//   return {columns: state.columns};
// }

// const Header = connect(mapStateToProps, mapDispatchToProps)(EditableHeader);
// export default  Header;
