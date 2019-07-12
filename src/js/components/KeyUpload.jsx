import React from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";
import {ProgressSpinner} from 'primereact/progressspinner';

class Upload extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return (
            <div>
                {this.props.loading ? (
                     <ProgressSpinner/>
                ):(
                    <div/>
                )}
            </div>
            
        )
    }
}


const mapStateToProps = state => {
    return {loading: state.loading};
  };


export default connect(mapStateToProps, {getData})(Upload);