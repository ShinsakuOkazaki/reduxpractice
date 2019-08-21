import React from "react";
import { connect } from "react-redux";
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {slideIndex, strategyVisible, setStrategyPage,prepareNext} from "../actions/index"

class DefaultGoTo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: null
        }
        this.onChange = this.onChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    onChange(e) {
        console.log("local state:",this.setState.idx)
        this.setState({idx: e.value})
    }

    handleClick() {
        
        this.props.slideIndex(this.state.idx)
        this.props.setStrategyPage()
        this.props.strategyVisible(true);
        this.props.prepareNext()
    }

    render() {
        const {columns} = this.props;
        const option = columns.map( (x, i) => ({label: x, value: i}))
        return (
            <div>
                <Dropdown value={this.state.idx} options={option} onChange={this.onChange} placeholder="Select Column"/>
                <Button label="Go to this column to edit" onClick={this.handleClick} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
      slideIndex: idx => dispatch(slideIndex(idx)),
      strategyVisible: page_visible => dispatch(strategyVisible(page_visible)),
      setStrategyPage: () => dispatch(setStrategyPage()),
      prepareNext: () => dispatch(prepareNext())
    };
}

const mapStateToProps = state => {
    return {columns: state.columns};
}

const GoToColumn = connect(mapStateToProps, mapDispatchToProps)(DefaultGoTo);
export default  GoToColumn;