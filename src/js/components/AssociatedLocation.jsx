// component to select assiciated location
// user can select multiple location associated with current variable
import React from "react";
import { connect } from "react-redux";
import {addAssociate} from "../actions/index";
import {MultiSelect} from 'primereact/multiselect';


class DefaultLocation extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.addAssociate({location: e.value})
    }
    render() {
        const {columns, location} = this.props;
        const options = columns.map(x => ({label: x, value: x}));
        return (
            <div style={{height: '200px'}}>
                <p>Associated Location</p>
                <MultiSelect value={location} options={options} onChange={this.handleChange} />
            </div>
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
      addAssociate: (visit_time) => dispatch(addAssociate(visit_time))
    };
}

 const AssociatedLocation = connect(mapStateToProps, mapDispatchToProps)(DefaultLocation);
 export default AssociatedLocation;