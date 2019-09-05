// Component to edit multiple choice 
// This component will be shown only when current variable type is multiple

import React from "react";
import { connect } from "react-redux";
import MatchedChoice from "./MatchedChoice.jsx";
import {Fieldset} from 'primereact/fieldset';
import {ScrollPanel} from 'primereact/scrollpanel';


class DefualtChoice extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {multiple} = this.props;
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

const mapStateToProps = state => {
    return {multiple: state.submit_variables[state.current_idx]["multiple"],
        };
}

const MultipleChoice = connect(mapStateToProps)(DefualtChoice);
export default  MultipleChoice;