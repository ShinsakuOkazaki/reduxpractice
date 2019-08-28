import React from 'react';
import { connect } from 'react-redux';
import {InputTextarea} from 'primereact/inputtextarea';
import {editSubmit} from "../actions/index";


class DefaultSOP extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {sop} = this.props;
        return (
            <div>
                <p>Standard Operating Procedure</p>
                <InputTextarea rows={10} cols={40} value={sop} onChange={(e) => this.props.editSubmit({sop: e.target.value})} />
            </div>
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
      editSubmit: (sop) => dispatch(editSubmit(sop))
    };
}

 const SOP = connect(mapStateToProps, mapDispatchToProps)(DefaultSOP);
 export default SOP;