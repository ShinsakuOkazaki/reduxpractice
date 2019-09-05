// This component sets set setPage of state so that PageSwitching Component
// can know what kind of page it should display for next operation

import React from 'react';
import {Dialog} from 'primereact/dialog';
import {strategyVisible, setPage, editSubmit, goToPage} from "../actions/index";
import { connect } from "react-redux";
import VariableDropdown from './VariableDropdown.jsx';
import {RadioButton} from 'primereact/radiobutton';
import {Button} from 'primereact/button';
import {Fieldset} from 'primereact/fieldset';

class DefualtStrategy extends React.Component {
    constructor(props) {
        super(props)
        this.onHide = this.onHide.bind(this)
        this.onChangeOther = this.onChangeOther.bind(this)
    }

    onHide() {
        this.props.strategyVisible(false)
        this.props.goToPage()
    }
    onChangeOther(e) {
        this.props.setPage({page_type: e.value})
        this.props.editSubmit({column_name: this.props.current_column})
    }
    
    render() {
        const {strategy_page, current_column, page_type, submit_column , submit_description} = this.props;
        const footer = (
            <Button label="Go to Edit" onClick={this.onHide} />
        );
        return (
            <div>
                <Dialog header= "Search variable" visible={strategy_page} style={{width: '50vw'}} footer={footer} modal={true} onHide={this.onHide}>
                    <h3>{current_column}</h3>
                    <div className="p-grid" style={{width:'250px',marginBottom:'10px'}}>
                        <div  className="p-col-12">
                            <RadioButton inputId="rb1" name="page" value="variable" onChange={(e) => this.props.setPage({page_type: e.value})} checked={(page_type === 'variable' && submit_column !== "")} />    
                            <label htmlFor="rb1" className="p-radiobutton-label">
                                <VariableDropdown/>
                            </label>
                        </div>
                        <div  className="p-col-12">
                            <RadioButton inputId="rb2" name="page" value="ontology" onChange={this.onChangeOther} checked={page_type === 'ontology'} />
                            <label htmlFor="rb2" className="p-radiobutton-label">Search for Ontology</label>    
                        </div>
                        <div  className="p-col-12">
                            <RadioButton inputId="rb3" name="page" value="other" onChange={this.onChangeOther} checked={page_type === 'other'} /> 
                            <label htmlFor="rb3" className="p-radiobutton-label">Define by yourselves</label>
                        </div>
                    </div> 
                    <Fieldset legend="Description">{submit_description}</Fieldset>
                </Dialog>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        strategy_page: state.strategy_page,
        current_column: state.columns[state.current_idx],
        page_type: state.page_type,
        submit_column: state.submit_variables[state.current_idx]["column_name"],
        submit_description: state.submit_variables[state.current_idx]["description"]
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      strategyVisible: page_visible=> dispatch(strategyVisible(page_visible)),
      setPage: page_type => dispatch(setPage(page_type)),
      editSubmit: column_name => dispatch(editSubmit(column_name)),
      goToPage: () => dispatch(goToPage())
    };
}

const StrategyPage = connect(mapStateToProps, mapDispatchToProps)(DefualtStrategy);
export default  StrategyPage;