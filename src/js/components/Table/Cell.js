import React from "raact";
import { connect } from "react-redux";
import TableCellUncontrolled from "./UncontrolledCell";

state = { lastKey: null, mouseOver: false}

class Cell extends React.Component {
   constructor(props) {
       super(props);
   }
   onChange = e => {
       const value = e.target.value;
       if (this.props.onCellChange) {
           this.props.onCellChange(this.props.row, this.props.column, value);
       }
    }
    onTab() {
        if(this.props.isLasCell) {
            this.props.onAddRow(this.props.row + 1);
        }   
   }

   onKeyDown(e) {
       if(e.key === "Tab" && this.state.lastKey !== "Shift") {
           this.onTab();
       }
       this.setState({ lastKey: e.key });
   }

   onMouseEnter(e) {
       this.setState({mouseOver: true});
   }
   onMouseLeave(e){
       this.setState({ mouseOver: false });
   }
   render() {
       const {
           column,
           row,
           onAddColumn,
           onAddRow,
           readOnly,
           value,
           id,
           type,
           errors,
           isHeader
       } = this.props;
       const { mouseOver}  = this.state;
       const showAddColumnBtn = onAddColumn && mouseOver && isHeader;
       const showDeleteColumnBtn = 
            onDeleteColumn && !readOnly && mouseOver &&isHeader;
       const showAddRowBtn = false && onAddRow && mouseOver && column === 0;
       const showDeleteRowBtn = 
            onDeleteRow && mouseOver && column === 0 && errors.length > 0;
       const hasError = Array.isArray(errors) && errors.length > 0;

       return (
           <div
                key={"cell" +id}
                className={"cell " + (hasError ? "has-errors" : "")}
                onKeyDown={this.onKeyDown}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
           >
                {type === "survey" && (
                    <SelectSurvey onChange={this.onChange} defaultvalue={value} />
                )}

                {type === "text" && (
                    <TableCellUncontrolled
                        id={id}
                        readOnly={readOnly}
                        value={value}
                        noChange={this.onChange}
                    />
                )}

                {showAddColumnBtn && (
                    <AddColumn column={column} onAddColumn={onAddColumn} />
                )}
                {showDeleteColumnBtn && (
                    <DeleteColumn onDeleteColumn={onDeleteColumn} column={column} />
                )}
                {showDeleteRowBtn && <DeleteRow onDeleteRow onDeleteRow={onDeleteRow} row={row} />}
                {showAddRowBtn && <AddRow />}
           </div>
       );
    }
}

const mapDispatchToProps = {
    onAddColumn: addColumn,
    onAddRow: addRow,
    onDeleteColumn: deleteColumn,
    onDeleteRow: deleteRow,
    onCellChange: updataCell
};

export default connect(
    null, mapDispatchToProps
)(Cell);

const DeleteRow = ({ onDeleteRow, row }) => (
    <div className={"delete-row"} onClick={() => onDeleteRow(row)} >
        <IconTimes />
    </div>
);

const DeleteColumn = ({ onDeleteColumn, column }) => (
    <div className={"delete-column"} onClick={() => onDeleteColumn(column)} >
        <IconTimes />
    </div>
);

const AddRow = ({ onAddRow, row }) => (
    <>
        <div className={"add-row add-row-before"}>B+</div>
        <div className={"add-row add-row-after"}>Af+</div>
    </>
);

const AddColumn = ({ onAddColumn, column }) => (
    <>
      <div
        className={"add-column add-column-before"}
        onClick={() => onAddColumn(column - 1)}
      >
        <IconPlus />
      </div>
      <div
        className={"add-column add-column-after"}
        onClick={() => onAddColumn(column)}
      >
        <IconPlus />
      </div>
    </>
  );
  
  const IconPlus = () => <>+</>;
  const IconTimes = () => <>x</>;
  