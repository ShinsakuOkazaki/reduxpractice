import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editSubmit} from "../actions/index";

class DefaultUnit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {current_format, formats} = this.props;
        
        return (
            <Dropdown
                className="line-left"
                value={current_format} 
                options={formats} 
                onChange={(e) => {
                        this.props.editSubmit({ format: e.target.value});
                    }   
                } 
                placeholder="Select Unit"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        current_format: state.submit_variables[state.current_idx]['format'],
        formats: state.formats
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editSubmit: (format) => dispatch(editSubmit(format))
    };
}

 const UnitDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultUnit);
 export default UnitDropdown;