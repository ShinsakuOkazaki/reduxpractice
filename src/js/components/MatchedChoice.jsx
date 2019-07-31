import React from "react";
import { connect } from "react-redux";
import {changeChoice} from "../actions/index";
import {InputText} from 'primereact/inputtext';

class DefaultMatchedChoice extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const {temp_submit_multiple, idx} = this.props
        temp_submit_multiple[idx] = event.target.value;
        this.props.changeChoice({new_multiple: temp_submit_multiple});
    }
    render() {
        const {temp_submit_multiple, temp_spine_multiple, idx} = this.props
        return (
            <form>
                <span className="choice">{temp_spine_multiple[idx]}</span>
                <span className="choice"><i className="pi pi-arrow-right" style={{'fontsize': '3em'}}></i></span>
                <span className="choice">
                    <InputText type="text"
                        id = {idx}  
                        value={temp_submit_multiple[idx]} 
                        onChange={this.handleChange}
                    />
                </span>
            </form>
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