
import React from "react";
import { connect } from "react-redux";
import {changeChoice} from "../actions/index";
import {InputText} from 'primereact/inputtext';



class DefaultMatchedChoice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {inputValue: ""}
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }
    handleBlur() {
        const {multiple, idx} = this.props;
        multiple[idx]["submit"] = this.state.inputValue;
        this.props.changeChoice({new_multiple: multiple});
    }
    componentDidMount() {
        const {multiple, idx} = this.props;
        this.setState({inputValue: multiple[idx]["submit"]});
     }
    render() {
        const {multiple, idx} = this.props;
        return (
            <form className="multi-form">
                <div className="multi-spine">
                    {multiple[idx]["spine"]}
                </div>
                <div className="multi-arrow"><i className="pi pi-arrow-right" style={{'fontsize': '3em'}}></i></div>
                <div className="multi-submit">
                    <InputText type="text" 
                        id={idx}
                        value={this.state.inputValue} 
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                </div>
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