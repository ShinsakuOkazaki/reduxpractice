import React from 'react';
import { connect } from 'react-redux';
import {Panel} from 'primereact/panel';
import SearchSelect from "./SearchSelect.jsx";
import VariableFild from "./VariableField.jsx";
import {OverlayPanel} from 'primereact/overlaypanel';
import {Button} from 'primereact/button';
class DefaultPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {column_name} = this.props;
        return (
            <div>
                
                <Button type="button" label="Help" className="help" onClick={(e) => this.op.toggle(e)} />
                <OverlayPanel style={{width: "300px"}} ref={(el) => this.op = el}>
                    <p>
                        This field is for matching your variable name to either variable names in our system
                        or the ontology. The Header of this field shows your variable name.
                        On the left dropdown you can select "Variable" in our system, "Ontology",
                        and "Other". Corresponding to your select, you will be able to select the specific variable
                        and class of ontology, and input original name if you selected "Other".
                    </p>
                </OverlayPanel>
                <p>Variable Name</p>
                <Panel header={column_name ? column_name : "Variable Name"}>
                    <div>
                        <SearchSelect/>
                        <VariableFild/>
                    </div>
                </Panel>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        column_name: state.submit_variables[state.current_idx]['column_name']
    };
}

const VariablePanel = connect(mapStateToProps)(DefaultPanel);
 export default VariablePanel;