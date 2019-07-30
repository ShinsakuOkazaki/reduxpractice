import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {editStatType} from "../actions/index";

class DefaultStatUnit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {current_statistical_type, statistical_types} = this.props;
        
        return (
            <Dropdown
                value={current_statistical_type} 
                options={statistical_types} 
                onChange={(e) => {
                        this.props.editStatType({ statistical_type: e.target.value});
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
      editStatType: (statistical_type) => dispatch(editStatType(statistical_type))
    };
}

 const StatUnit = connect(mapStateToProps, mapDispatchToProps)(DefaultStatUnit);
 export default StatUnit;