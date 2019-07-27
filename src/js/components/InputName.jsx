import { InputText } from 'primereact/inputtext';
import React from "react";
import { editName} from "../actions/index";
import { connect } from "react-redux";


class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
            <InputText 
                value={this.props.column} 
                onChange = { (e) => 
                    this.props.editName({column: e.target.value})} />
        )
    }
}



const mapDispatchToProps = dispatch => {
    return { 
      editName: column => dispatch(editName(column))
    };
}

const mapStateToProps = state => {
    return {column: state.submit_variables[state.current_idx]["column_name"]};
}


const InputName = connect(mapStateToProps, mapDispatchToProps)(Input);
export default InputName;