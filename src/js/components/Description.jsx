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
            <div className="adjust-top">
                <p>Discription</p>
                <InputTextarea 
                    rows={10} 
                    cols={50} 
                    value={description} 
                    onChange={(e) => this.props.editDescription({description:e.target.value})} 
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
      editDescription: (description) => dispatch(editDescription(description))
    };
}

 const Description = connect(mapStateToProps, mapDispatchToProps)(DefaultDescription);
 export default Description;