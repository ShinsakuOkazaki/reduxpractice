import React from "react";
import { connect } from "react-redux";
//import {changeChoice} from "../actions/index"
import MatchedChoice from "./MatchedChoice.jsx";
import {Card} from 'primereact/card';


class DefualtChoice extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        
        const {spine_multiple, submit_multiple} = this.props;
        const matched_multiple = submit_multiple.filter(x => spine_multiple.includes(x));
        
        let diff_spine = spine_multiple.filter(x => !submit_multiple.includes(x));
        let diff_submit = submit_multiple.filter(x => !spine_multiple.includes(x));
        const empty_spine = new Array(diff_submit.length).fill("")
        const empty_submit = new Array(diff_spine.length).fill("")
        diff_spine = diff_spine.concat(empty_spine)
        diff_submit = empty_submit.concat(diff_submit)
        const temp_spine_multiple = matched_multiple.concat(diff_spine);
        const temp_submit_multiple  = matched_multiple.concat(diff_submit);
        let listItems = [];
        for (let i = 0; i < temp_spine_multiple.length; i++) {
            listItems.push(
                <MatchedChoice key={( temp_spine_multiple[i] !== "") ? temp_spine_multiple[i] : "extra"+i} 
                                temp_submit_multiple={temp_submit_multiple}
                                temp_spine_multiple={temp_spine_multiple}
                                idx={i}
                />
            )
        }        
        return (
            <Card>{listItems}</Card>
        )
    }
}

//  const mapDispatchToProps = dispatch => {
//      return { 
//        changeChoice: multiple=> dispatch(changeChoice(multiple))
//      };
//  }

const mapStateToProps = state => {
    return {spine_multiple: state.spine_variables[state.current_idx]["multiple"],
            submit_multiple: state.submit_variables[state.current_idx]["multiple"]
        };
}

const MultipleChoice = connect(mapStateToProps)(DefualtChoice);
export default  MultipleChoice;