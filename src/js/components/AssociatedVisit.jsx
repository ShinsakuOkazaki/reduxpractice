import React from "react";
import { connect } from "react-redux";
import {addVisit} from "../actions/index";
import Select from 'react-select';

class DefaultVisit extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(visit_time) {
        this.props.addVisit({visit_time: visit_time})
    }
    render() {
        const {columns, visit_time} = this.props;
        const options = columns.map(x => ({label: x, value: x}));
        return (
                <Select 
                    isMulti 
                    value={visit_time}
                    options={options} 
                    onChange={this.handleChange}
                />
        )
    }
}

const mapStateToProps = state => {
    return {
        visit_time: state.submit_variables[state.current_idx]['visit_time'],
        columns: state.columns
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      addVisit: (visit_time) => dispatch(addVisit(visit_time))
    };
}

 const AssociatedVisit = connect(mapStateToProps, mapDispatchToProps)(DefaultVisit);
 export default AssociatedVisit;