import {Button} from 'primereact/button';
import React from "react";
import {slideIndex} from "../actions/index"
import { connect } from "react-redux";


class DefaultButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {current_idx} = this.props
        return (
            <Button label="Verify" onClick = { ()=>{
                    const next_idx = current_idx + 1;
                    this.props.slideIndex(next_idx);
                }   
            } 
            />
        )
    }
}




const mapDispatchToProps = dispatch => {
    return { 
      slideIndex: current_idx => dispatch(slideIndex(current_idx))
    };
}

const mapStateToProps = state => {
    return {current_idx: state.current_idx};
}

const VerifyButton = connect(mapStateToProps, mapDispatchToProps)(DefaultButton);
export default  VerifyButton;