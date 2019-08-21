// import React from "react";
// import { connect } from "react-redux";
// import InputName from "./InputName.jsx"
// import VariableDropdown from "./VariableDropdown.jsx"
// //import OntologyDropdown from "./OntologyDropdown.jsx"

// class DefaultField extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         const {search_by} = this.props;
//         if (search_by === "variable") {
//             return (<VariableDropdown/>)
//         // }
//         // else if (search_by === "ontology") {
//         //     return (<OntologyDropdown/>)
//         // }
//         // else if (search_by === "other") {
//         //     return (<InputName/>)
//         }
        
//     }
// }


// const mapStateToProps = state => {
//     return {search_by: state.submit_variables[state.current_idx]["search_by"]};
// }

// const VariableField = connect(mapStateToProps)(DefaultField);
// //export default  VariableField;