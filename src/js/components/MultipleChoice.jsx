import React from "react";
import { connect } from "react-redux";
import {changeChoice} from "../actions/index"


class DefualtChoice extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        
        const {spine_multiple, submit_multiple} = this.props;
        const matched_multiple = submit_multiple.filter(x => spine_multiple.includes(x));
        
        let diff_spine = spine_multiple.filter(x => !submit_multiple.includes(x));
        let diff_submit = submit_multiple.filter(x => !spine_multiple.includes(x));
        
        if (diff_spine.length > diff_submit.length) {
            let empty = new Array(diff_spine.length - diff_submit.length).fill("")
            diff_submit = diff_submit.concat(empty)
        } 
        else if (diff_spine.length < diff_submit.length) {
            let empty = new Array(diff_submit.length - diff_spine.length).fill("")
            diff_spine = diff_spine.concat(empty)
        }
        const list = [];
        for (let i = 0; i < (matched_multiple.length + diff_spine.length); i++) {
            if (i < matched_multiple.length) {
                list.push(
                    <div key={matched_multiple[i]}>
                        <span className="choice">{matched_multiple[i]}</span>
                        <span className="choice"><i className="pi pi-arrow-right" style={{'fontsize': '3em'}}></i></span>
                        <span className="choice">
                            <input type="text"
                                id = {i}
                                data-old={matched_multiple[i]}  
                                value={matched_multiple[i]} 
                                onChange={(e) => this.props.changeChoice({idx: document.getElementById(i).getAttribute("data-old"),
                                                                        new_multiple: e.target.value})}/>
                        </span>
                        
                    </div>
                    
                )
            }
            else if (i >= matched_multiple.length) {
                list.push(
                    <div key={(diff_spine[i - matched_multiple.length] !== "") 
                                                    ? diff_spine[i - matched_multiple.length] :
                                                     "new"+ i - matched_multiple.length}>
                        <span className="choice">{diff_spine[i - matched_multiple.length]}</span>
                        <span className="choice">
                            <input type="text"
                                id = {i}
                                data-old={diff_submit[i - matched_multiple.length ]}
                                value={diff_submit[i - matched_multiple.length ]}
                                onChange={(e) => this.props.changeChoice({old_multiple: document.getElementById(i).getAttribute("data-old"),
                                                                        new_multiple: e.target.value})}/>
                        </span>
                        
                    </div>
                )
            }
        }
        return (
            <div className="w3-card mutiple-panel">{list}</div>
        )
    }
}

 const mapDispatchToProps = dispatch => {
     return { 
       changeChoice: multiple=> dispatch(changeChoice(multiple))
     };
 }

const mapStateToProps = state => {
    return {spine_multiple: state.spine_variables[state.current_idx]["multiple"],
            submit_multiple: state.submit_variables[state.current_idx]["multiple"],
            variable_type: state.submit_variables[state.current_idx]["variable_type"]
        };
}

const MultipleChoice = connect(mapStateToProps, mapDispatchToProps)(DefualtChoice);
export default  MultipleChoice;