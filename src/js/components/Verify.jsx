import {Button} from 'primereact/button';
import React from "react";
import {slideIndex, strategyVisible, setStrategyPage,prepareNext} from "../actions/index"
import { connect } from "react-redux";


class DefaultButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }
    onClick() {
        const {current_idx} = this.props
        const next_idx = current_idx + 1; 
        this.props.slideIndex(next_idx);
        this.props.setStrategyPage()
        this.props.strategyVisible(true);
        this.props.prepareNext()
    }

    render() {
        return (
            <Button label="Verify" onClick = {this.onClick}/>
        )
    }
}




const mapDispatchToProps = dispatch => {
    return { 
      slideIndex: current_idx => dispatch(slideIndex(current_idx)),
      strategyVisible: page_visible => dispatch(strategyVisible(page_visible)),
      setStrategyPage: () => dispatch(setStrategyPage()),
      prepareNext: () => dispatch(prepareNext())
    };
}

const mapStateToProps = state => {
    return {current_idx: state.current_idx};
}

const VerifyButton = connect(mapStateToProps, mapDispatchToProps)(DefaultButton);
export default  VerifyButton;