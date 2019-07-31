import React from "react";
import { connect } from "react-redux";
//import {changeChoice} from "../actions/index"
import MatchedChoice from "./MatchedChoice.jsx";
import DiffChoice from "./DiffChoice.jsx";


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
        console.log("matched_multiple:" + matched_multiple);
        console.log("diff_spine:" + diff_spine);
        console.log("diff_submit:" + diff_submit);
        let listItems = [];
        for (let i = 0; i < (matched_multiple.length + diff_spine.length); i++) {
            if (i < matched_multiple.length) {
                listItems.push(
                    <MatchedChoice key={matched_multiple[i]} 
                                    matched_choice= {matched_multiple[i]}
                                    idx={i}/>
                    // <div key={matched_multiple[i]}>
                    //     <span className="choice">{matched_multiple[i]}</span>
                    //     <span className="choice"><i className="pi pi-arrow-right" style={{'fontsize': '3em'}}></i></span>
                    //     <span className="choice">
                    //         <input type="text"
                    //             id = {i}  
                    //             value={matched_multiple[i]} 
                    //             onChange={(e) => this.props.changeChoice({idx: i,
                    //                                                     new_multiple: e.target.value})}
                    //         />
                    //     </span>
                        
                    // </div>
                    
                )
            }
            else if (i >= matched_multiple.length) {
                const diff_spine_choice = diff_spine[i - matched_multiple.length];
                const diff_submit_choice = diff_submit[i - matched_multiple.length]
                listItems.push(
                    <DiffChoice key={( diff_spine_choice !== "") ? diff_spine_choice : "new"+ i - matched_multiple.length}
                                diff_spine_choice={diff_spine_choice}
                                diff_submit_choice={diff_submit_choice} 
                                idx={i}/>
                    // <div key={(diff_spine[i - matched_multiple.length] !== "") 
                    //                                 ? diff_spine[i - matched_multiple.length] :
                    //                                  "new"+ i - matched_multiple.length}>
                    //     <span className="choice">{diff_spine[i - matched_multiple.length]}</span>
                    //     <span className="choice">
                    //         <input type="text"
                    //             id = {i}
                    //             value={diff_submit[i - matched_multiple.length ]}
                    //             onChange={(e) => this.props.changeChoice({idx: i,
                    //                                                     new_multiple: e.target.value})}/>
                    //     </span>
                    // </div>
                )
            }
        }
        return (
            <div className="w3-card mutiple-panel">{listItems}</div>
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