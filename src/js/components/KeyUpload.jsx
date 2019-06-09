import React from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";


class Upload extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return (
            <div></div>
        )
    }
}


export default connect(null, {getData})(Upload);