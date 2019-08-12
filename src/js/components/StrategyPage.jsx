import React from 'react';
import {Dialog} from 'primereact/dialog';
import {strategyVisible} from "../actions/index";
import { connect } from "react-redux";
import InputName from "./InputName.jsx";
import VariableDropdown from './VariableDropdown.jsx';
import OntologyDropdown from './OntologyDropdown.jsx';

class DefualtStrategy extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {strategy_page, column_name} = this.props;
        return (

            <Dialog header= "Search variable" visible={strategy_page} style={{width: '50vw'}} modal={true} onHide={() => this.props.strategyVisible(false)}>
                <p>Variable Name</p>
               <InputName/>
               <p>Step 1: Search in suggested variable from SPINE</p>
               <VariableDropdown/>
               <p>Step 2: Search in Ontology</p>
               <OntologyDropdown/>
               <p>Step 3: Define by yourselves</p>

            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        strategy_page: state.strategy_page,
        column_name: state.submit_variables[state.current_idx]['column_name']
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      strategyVisible: page_visible=> dispatch(strategyVisible(page_visible))
    };
}

const StrategyPage = connect(mapStateToProps, mapDispatchToProps)(DefualtStrategy);
export default  StrategyPage;