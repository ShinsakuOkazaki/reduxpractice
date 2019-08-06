import React from 'react';
import { connect } from 'react-redux';
import {Panel} from 'primereact/panel';
import SearchSelect from "./SearchSelect.jsx";
import VariableFild from "./VariableField.jsx";

class DefaultPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {column_name} = this.props;
        return (
                <Panel header={column_name}>
                    <SearchSelect/>
                    <VariableFild/>
                </Panel>
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