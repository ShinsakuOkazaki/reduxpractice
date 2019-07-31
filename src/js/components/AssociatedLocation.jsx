import React from "react";
import { connect } from "react-redux";
import {addLocation} from "../actions/index";
import Select from 'react-select';

class DefaultLocation extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(location) {
        this.props.addLocation({location: location})
    }
    render() {
        const {columns, location} = this.props;
        const options = columns.map(x => ({label: x, value: x}));
        return (
    
                <Select 
                    isMulti 
                    value={location}
                    options={options} 
                    onChange={this.handleChange}
                />
        )
    }
}

const mapStateToProps = state => {
    return {
        location: state.submit_variables[state.current_idx]['location'],
        columns: state.columns
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      addLocation: (visit_time) => dispatch(addLocation(visit_time))
    };
}

 const AssociatedLocation = connect(mapStateToProps, mapDispatchToProps)(DefaultLocation);
 export default AssociatedLocation;