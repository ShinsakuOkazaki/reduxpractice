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
                            <p className="match-flag">{columns[headerId]}</p> 
                            <span className='arrow'>&#8595;</span>
                        </div>
                    ) : (
                        <div>
                            <p className="match-flag">None</p>
                            <br/>
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