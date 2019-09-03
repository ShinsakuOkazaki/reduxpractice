// import React from "react";
// import { connect } from "react-redux";
// import { uploadData } from "../actions/index";
// import {ProgressSpinner} from 'primereact/progressspinner';

// class Upload extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         this.props.uploadData();
//     }

//     render() {
//         return (
//             <div>
//                 {this.props.loading ? (
//                      <ProgressSpinner/>
//                 ):(
//                     <div/>
//                 )}
//             </div>
            
//         )
//     }
// }


// const mapStateToProps = state => {
//     return {loading: state.loading};
// };

// const mapDispatchToProps = dispatch => {
//     return { 
//         uploadData: key => dispatch(uploadData(key))
//     };
// }



// const  KeyUpload = connect(mapStateToProps, mapDispatchToProps)(Upload);
// export default KeyUpload;