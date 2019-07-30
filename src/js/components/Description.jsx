import React from 'react';
import { connect } from 'react-redux';
import {InputTextarea} from 'primereact/inputtextarea';
import {editDescription} from "../actions/index";


class DefaultDescription extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {description} = this.props;
        return (
            <InputTextarea rows={10} cols={60} value={description} onChange={(e) => this.props.editDescription(e.target.value)} />
        )
    }
}

const mapStateToProps = state => {
    return {
        description: state.submit_variables[state.current_idx]['description']
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      editDescription: (description) => dispatch(editDescription(description))
    };
}

 const Description = connect(mapStateToProps, mapDispatchToProps)(DefaultDescription);
 export default Description;