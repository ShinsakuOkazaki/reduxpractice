// Form for Description
import React from 'react';
import { connect } from 'react-redux';
import {InputTextarea} from 'primereact/inputtextarea';
import {editSubmit} from "../actions/index";


class DefaultDescription extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {description} = this.props;
        return (
            <div className="adjust-top">
                <p>Discription</p>
                <InputTextarea 
                    rows={10} 
                    cols={40} 
                    value={description} 
                    onChange={(e) => this.props.editSubmit({description:e.target.value})} 
                    tooltip="Iuput description of this variable.
                             If it is matched to either one of variables in our system
                             or ontology, this field shows a suggested description." 
                    tooltipOptions={{position: 'right'}}
                />
            </div>
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
      editSubmit: (description) => dispatch(editSubmit(description))
    };
}

 const Description = connect(mapStateToProps, mapDispatchToProps)(DefaultDescription);
 export default Description;