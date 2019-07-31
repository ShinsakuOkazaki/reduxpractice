import React from "react";
import { connect } from "react-redux";
import {changeChoice} from "../actions/index";

class DefaultMatchedChoice extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {matched_choice, idx} = this.props
        return (
            <div>
                <span className="choice">{matched_choice}</span>
                <span className="choice"><i className="pi pi-arrow-right" style={{'fontsize': '3em'}}></i></span>
                <span className="choice">
                    <input type="text"
                        id = {idx}  
                        value={matched_choice} 
                        onChange={(e) => this.props.changeChoice({idx: idx,
                                                                new_multiple: e.target.value})}
                    />
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

const MatchedChoice = connect(null, mapDispatchToProps)(DefaultMatchedChoice);
export default  MatchedChoice;