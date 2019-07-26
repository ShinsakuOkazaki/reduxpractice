import { InputText } from 'primereact/inputtext';
import React from "react";
import { editHeader,  columnMatching} from "../actions/index";
import { connect } from "react-redux";


class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {columns, current, spine_variable} = this.props;
        const original_columns = spine_variable.map(x => x["column_name"]);
        const matching = original_columns.includes(columns[current]);
        this.props.columnMatching(matching);
        return (
            <InputText 
                value={columns[current]} 
                onChange = { (e) => {
                    culumns[current] = e.target.value;
                    this.props.editHeader({columns });
                    }
                } 
                size="35" 
            />
        )
    }
}



const mapDispatchToProps = dispatch => {
    return { 
      editHeader: columns => dispatch(editHeader(columns)),
      columnMatching: matching => dispatch(columnMatching(matching))
    };
}

const mapStateToProps = state => {
    return {columns: state.columns, 
            current: state.current,
            spine_variable: state.spine_variable
        };
}


const InputName = connect(mapStateToProps, mapDispatchToProps)(Input);
export default InputName;