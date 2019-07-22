import { InputText } from 'primereact/inputtext';
import React from "react";
import { connect } from "react-redux";


class InputName extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        <span className="p-float-label">
            <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
            <label htmlFor="in">Attribute Name</label>
        </span>
    }
}

