import React from 'react';
import { connect } from 'react-redux';
import {InputTextarea} from 'primereact/inputtextarea';
import {editSOP} from "../actions/index";


class DefaultSOP extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {sop} = this.props;
        return (
            <InputTextarea rows={10} cols={60} value={sop} onChange={(e) => this.props.editDescription(e.target.value)} />
        )
    }
}

const mapStateToProps = state => {
    return {
        sop: state.submit_variables[state.current_idx]['sop']
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      editSOP: (sop) => dispatch(editSOP(sop))
    };
}

 const SOP = connect(mapStateToProps, mapDispatchToProps)(DefaultSOP);
 export default SOP;