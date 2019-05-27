import React from "react";
import { connect } from "react-redux";
import { editHeader } from "../actions/index";

class EditableHeader extends React.Component {
    constructor(props){
      super(props);
  
    }
    render () {
      const {columns} = this.props;
      const {id} = this.props
      return (
        <div
          style={{ backgroundColor: "#fafafa" }}
          contentEditable ={true}
          suppressContentEditableWarning ={true}
          onBlur={e => {
            columns[id] = e.target.innerHTML;
            this.props.editHeader(columns);
          }}
          dangerouslySetInnerHTML={{
            __html: columns[id]
          }}
        />
      )
    }
  }


  const mapDispatchToProps = dispatch => {
    return { 
      editHeader: columns => dispatch(editHeader(columns)) 
    }
  }

  const mapStateToProps = state => {
    return {columns: state.columns, rows: state.rows};
  };

const Header = connect(mapStateToProps, mapDispatchToProps)(EditableHeader);
export default  Header;
