import React from "react";
import { connect } from "react-redux";

class MatchHeader extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {columns, match, headerId} = this.props;
        const matched = match.includes(columns[headerId]);
        return(
            <div>
                <div>
                    {matched ? (
                        <div>
                            <p>{columns[headerId]}</p> 
                            <span classNmae='arrow'>&#8595;</span>
                        </div>
                    ) : (
                        <div>
                            <p>None</p>
                        </div>
                    )}
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {columns: state.columns, match: state.match};
};

const Match = connect(mapStateToProps)(MatchHeader);
export default  Match;