import React from "react";

export default class TableCellUncontrolled extends React.Component {
    constructor(props){
        super(props);
        this.state = { value: props.value };
        this.onChange= this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(e) {
        this.setState(e.target.value);
    }

    onBlur(e) {
        if(this.props.onChange) {
            this.props.onChange(e);
        }
    }

    render() {
        const readOnlyClass = this.props.readOnly ? "read-only" : "editable";
        
        return (
            <div key={this.props.id} className={readOnlyClass}>
                <input
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    value={this.state.value}
                    readOnly={this.props.readOnly}
                    disabled={this.props.readObly}
                />
            </div>
        )
    }
}