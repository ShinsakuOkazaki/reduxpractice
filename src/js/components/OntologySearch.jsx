import React from 'react';
import { connect } from "react-redux";
import {setSearch} from "../actions/index";
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

class DefaultSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.current_variable
        }
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    onChange(e) {
        this.setState({value: e.target.value})
    }

    onClick() {
        this.props.setSearch(this.state.value)
    }

    render() {
        return (
            <div>
                <InputText value={this.state.value} onChange={this.onChange}></InputText>
                <Button label="Search" onClick={this.onClick} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ontology_option: state.ontology_option,
        current_variable : state.submit_variables[state.current_idx]["column_name"]
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        setSearch: search => dispatch(setSearch(search))
    };
}

 const OntologySearch = connect(mapStateToProps, mapDispatchToProps)(DefaultSearch);
 export default OntologySearch;