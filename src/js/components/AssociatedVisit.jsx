import React from "react";
import { connect } from "react-redux";
import {addAssociate} from "../actions/index";
import {MultiSelect} from 'primereact/multiselect';

class DefaultVisit extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.addAssociate({visit_time: e.value})
    }
    render() {
        const {columns, visit_time} = this.props;
        const options = columns.map(x => ({label: x, value: x}));
        return (
            <div className=" adjust-top" style={{height: '250px'}}>
                <p>Associated Visit Date</p>
                <MultiSelect value={visit_time} options={options} onChange={this.handleChange} />
            </div>
                
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
      addAssociate: (visit_time) => dispatch(addAssociate(visit_time))
    };
}

 const AssociatedVisit = connect(mapStateToProps, mapDispatchToProps)(DefaultVisit);
 export default AssociatedVisit;