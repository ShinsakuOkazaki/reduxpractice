import React from "react";
import { connect } from "react-redux";
import {slideIndex, setStrategyPage, strategyVisible, prepareNext} from "../actions/index.js"


class DefaultPanel extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(e) {
        this.props.slideIndex(e.target.id)
        this.props.setStrategyPage()
        this.props.strategyVisible(true);
        this.props.prepareNext()
    }

    render() {
        const {columns, current_idx} = this.props
        const list = columns.map(
            (x, i) => {
                if (i === current_idx) {
                    return (
                        <li key={i}
                            id={i}
                            className="overflow-list curr-prog-panel"
                            onClick = {this.clickHandler}>
                            {x}
                        </li>
                    )
                }
                return (
                    <li key={i}
                        id={i}
                        className="overflow-list"
                        onClick = {this.clickHandler}>
                        {x}
                    </li>
                )
            })
        return (
            <ul className="w3-ul w3-card-4 progress-panel">
                {list}
            </ul>
        )
    }

}

const mapStateToProps = state => {
    return {
       columns : state.columns,
       current_idx: state.current_idx
    };
};

const mapDispatchToProps = dispatch => {
    return { 
        slideIndex: idx => dispatch(slideIndex(idx)),
        setStrategyPage: () => dispatch(setStrategyPage()),
        strategyVisible: page_visible => dispatch(strategyVisible(page_visible )),
        prepareNext: () => dispatch(prepareNext())
    };
}

const ProgressPanel= connect(mapStateToProps, mapDispatchToProps)(DefaultPanel);
export default ProgressPanel;