import React from 'react';
import {Dialog} from 'primereact/dialog';

export class Explanation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {visible: true};
    }
    render() {
        return (

            <Dialog header="Instruction" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={() => this.setState({visible: false})}>
                In Crinical Data Uploader, you can upload your data file with information and format that are suitable for our application. 
                You will input information regarding to variables in your data file one by one. Once you click the "Verify" button, 
                it will take you to the next variable. Once you complete all of your variables submit button will show up, so you click it finish.
                First, upload your data file to start!
            </Dialog>
        )
    }
}