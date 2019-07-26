import {Button} from 'primereact/button';
import React from "react";
import {slideIndex} from "../actions/index"
import { connect } from "react-redux";


class DefaultButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Button label="Verify" onClick = { ()=>{
                    const current = this.props.current + 1;
                    this.props.slideIndex(current)
                }   
            } 
            />
        )
    }
}




const mapDispatchToProps = dispatch => {
    return { 
      slideIndex: current => dispatch(slideIndex(current))
    };
}

const mapStateToProps = state => {
    return {current: state.current};
}

const VerifyButton = connect(mapStateToProps, mapDispatchToProps)(DefaultButton);
export default  VerifyButton;