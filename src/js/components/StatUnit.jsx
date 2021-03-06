// This component will show dropdown of statistical_type
import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editSubmit} from "../actions/index";

class DefaultStatUnit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {current_statistical_type, statistical_types} = this.props;
        
        return (
            <Dropdown
                className="line-right"
                value={current_statistical_type} 
                options={statistical_types} 
                onChange={(e) => {
                        this.props.editSubmit({ statistical_type: e.target.value});
                    }   
                } 
                placeholder="Select Statistical Type"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        current_statistical_type: state.submit_variables[state.current_idx]['statistical_type'],
        statistical_types: state.statistical_types
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      editSubmit: (statistical_type) => dispatch(editSubmit(statistical_type))
    };
}

 const StatUnit = connect(mapStateToProps, mapDispatchToProps)(DefaultStatUnit);
 export default StatUnit;