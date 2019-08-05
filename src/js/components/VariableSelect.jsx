import React from "react";
import { connect } from "react-redux";
import { } from "../actions/index";
import {Steps} from 'primereact/steps';


class DefaultStep extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: "",

        }
        
    }
    render(){
        return (
            <Steps 
                model={interactiveItems} 
                activeIndex={this.state.activeIndex} 
                onSelect={(e) => this.setState({activeIndex: e.index})} 
                readOnly={false} />
        )
    }
}

const mapStateToProps = state => {
    return {
        current_variable_type: state.variable_class
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      editDataType: (variable_type) => dispatch(editDatatype(variable_type))
    };
}

 const TypeDropdown = connect(mapStateToProps, mapDispatchToProps)(DefaultDropdown);
 export default TypeDropdown;