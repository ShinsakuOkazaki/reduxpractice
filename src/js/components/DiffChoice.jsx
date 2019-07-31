import React from "react";
import { connect } from "react-redux";
import {changeChoice} from "../actions/index";

class DefaultDiffChoice extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {diff_spine_choice, diff_submit_choice, idx} = this.props
        return (
            <div>
                <span className="choice">{diff_spine_choice}</span>
                <span className="choice">
                    <input type="text"
                        id = {idx}
                        value={diff_submit_choice}
                        onChange={(e) => this.props.changeChoice({idx: idx,
                                                                new_multiple: e.target.value})}/>
                </span>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return { 
      changeChoice: multiple=> dispatch(changeChoice(multiple))
    };
}

const DiffChoice = connect(null, mapDispatchToProps)(DefaultDiffChoice);
export default  DiffChoice;