import React from "react";
import { connect } from "react-redux";
import {addLocation} from "../actions/index";
import Select from 'react-select';
import {ScrollPanel} from 'primereact/scrollpanel';

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
            // <ScrollPanel style={{width: '100%', height: '200px'}}>
            <div style={{height: '200px'}}>
                <p>Associated Location</p>
                <Select 
                    style={{width: '100%', height: '50px'}}
                    isMulti 
                    value={location}
                    options={options} 
                    onChange={this.handleChange}
                />
            </div>
            // </ScrollPanel>   
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