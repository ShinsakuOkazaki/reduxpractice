import React from "react";
import { connect } from "react-redux";
//import {changeChoice} from "../actions/index"
import MatchedChoice from "./MatchedChoice.jsx";
import {Fieldset} from 'primereact/fieldset';
import {ScrollPanel} from 'primereact/scrollpanel';


class DefualtChoice extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        // const {spine_multiple, submit_multiple} = this.props;
        // console.log("Change in multiple Component")
        // console.log(submit_multiple)
        // //calculate intercection of variable of spine and of user
        // const matched_multiple = submit_multiple.filter(x => spine_multiple.includes(x));
        // //calculate difference of variable of spine from user's
        // let diff_spine = spine_multiple.filter(x => !submit_multiple.includes(x));
        // //calculate difference of variable of user's from of spine
        // let diff_submit = submit_multiple.filter(x => !spine_multiple.includes(x));
        // //array of empty string whose length is another array
        // const empty_spine = new Array(diff_submit.length).fill("")
        // const empty_submit = new Array(diff_spine.length).fill("")
        // diff_spine = diff_spine.concat(empty_spine)
        // diff_submit = empty_submit.concat(diff_submit)
        // const temp_spine_multiple = matched_multiple.concat(diff_spine);
        // const temp_submit_multiple  = matched_multiple.concat(diff_submit);
        const {multiple} = this.props;
        //const submit_multi_list = Object.values(submit_multiple)
        let listItems = [];
        for (let i = 0; i < multiple.length; i++) {
            listItems.push(
                <MatchedChoice key={( multiple[i]["spine"] !== "") ? multiple[i]["spine"] : "extra"+i} 
                                multiple={multiple}
                                idx={i}
                />
            )
        }        
        return (
            <Fieldset legend="Multiple Choice"><ScrollPanel>{listItems}</ScrollPanel></Fieldset>
        )
    }
}

//  const mapDispatchToProps = dispatch => {
//      return { 
//        changeChoice: multiple=> dispatch(changeChoice(multiple))
//      };
//  }

const mapStateToProps = state => {
    return {multiple: state.submit_variables[state.current_idx]["multiple"],
           // submit_multiple: state.submit_variables[state.current_idx]["multiple"]
        };
}

const MultipleChoice = connect(mapStateToProps)(DefualtChoice);
export default  MultipleChoice;