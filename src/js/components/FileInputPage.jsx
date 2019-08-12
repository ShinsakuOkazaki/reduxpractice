import React from 'react';
import {Dialog} from 'primereact/dialog';
import {uploadVisible, strategyVisible} from "../actions/index";
import { connect } from "react-redux";
import FileInput from './FileInput.jsx';
import {Button} from 'primereact/button';

class DefualtUpload extends React.Component {
    constructor(props) {
        super(props)
        this.onHide = this.onHide.bind(this)
    }

    onHide() {
        console.log(!this.props.upload_page);
        this.props.uploadVisible(false)
        this.props.strategyVisible(true)
    }

    render() {
        const {upload_page}= this.props;
        return (
            <Dialog header="Welcome to SPINE Data Up Loader " visible={upload_page} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
               <p>On SPINE Data UP Loader, a user can upload his/her data file in the format that is preferable for our systems.
                You will edit and input information regarding to variables in your data file one by one. To start, upload a data file below.
                </p> 
               <FileInput/>
               <Button label="Go to Edit" onClick={this.onHide} />
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        upload_page: state.upload_page
    };
}

const mapDispatchToProps = dispatch => {
    return { 
      uploadVisible: upload_page=> dispatch(uploadVisible(upload_page)),
      strategyVisible: strategy_page => dispatch(strategyVisible(strategy_page))
    };
}

const UploadPage = connect(mapStateToProps, mapDispatchToProps)(DefualtUpload);
export default  UploadPage;