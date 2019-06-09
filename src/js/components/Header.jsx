import React from "react";
import { connect } from "react-redux";
import { editHeader } from "../actions/index";
import ReactTooltip from 'react-tooltip'
import Match from "./Match.jsx"



class EditableHeader extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        matched: true
      };
      this.refreshMatch = this.refreshMatch.bind(this)
    }

    refreshMatch = () =>
      this.setState({matched: !this.state.matched})

    render() {
      const {columns,headerKey,headerId} = this.props;
      
      return (
        <div className="panel panel-default">
           <div className="panel-heading">
              <Match headerKey={headerKey} headerId={headerId} refresh={this.state.refreshMatch}/>
            </div>
            <div className="panel-body" data-tip data-for={headerId.toString()}>
              <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable ={true}
                suppressContentEditableWarning ={true}
                onBlur={e => {
                  columns[headerId] = e.target.innerHTML;
                  this.props.editHeader(columns);
                }}
                dangerouslySetInnerHTML={{
                  __html: columns[headerId]
                }}
              />
            </div> 
            <ReactTooltip id={headerId.toString()} getContent={() => <span>{columns[headerId]}</span>}/>   
          </div> 
      )
    }
  }


  const mapDispatchToProps = dispatch => {
    return { 
      editHeader: columns => dispatch(editHeader(columns)) 
    }
  }

const mapStateToProps = state => {
  return {columns: state.columns, data: state.data};
};

const Header = connect(mapStateToProps, mapDispatchToProps)(EditableHeader);
export default  Header;
