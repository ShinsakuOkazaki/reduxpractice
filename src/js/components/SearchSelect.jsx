import React from 'react';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import { editSearch } from "../actions/index";

class DefaultSearch extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {search_option, current_search_by} = this.props;
        
        return (
            <Dropdown
                className="select-small"
                value={current_search_by} 
                options={search_option} 
                onChange={(e) => {
                        this.props.editSearch({ search_by: e.target.value});
                    }   
                } 
                placeholder="Select Unit"
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        current_search_by: state.submit_variables[state.current_idx]['search_by'],
        search_option: state.search_option
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        editSearch: (format) => dispatch(editSearch(format))
    };
}

 const SearchSelect = connect(mapStateToProps, mapDispatchToProps)(DefaultSearch);
 export default SearchSelect;