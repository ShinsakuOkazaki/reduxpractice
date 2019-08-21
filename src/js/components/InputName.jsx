import { InputText } from 'primereact/inputtext';
import React from "react";
import { connect } from "react-redux";


class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>{this.props.column}</div>
        )
    }
}





const mapStateToProps = state => {
    return {column: state.columns[state.current_idx]};
}


const InputName = connect(mapStateToProps)(Input);
export default InputName;