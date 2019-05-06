import React from "react";
import { connect } from "react-redux";

class Body extends React.Component {
    render(){
        const { rows } = this.props;
        return (
            <div calssName={'body'}>
                {rows.length 

                }
            </div>
        )
    }
}