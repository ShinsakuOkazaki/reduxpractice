import React from 'react';
import { connect } from 'react-redux';
import XLSX from 'xlsx';
import { inputFile } from '../actions/index'


class FileInput extends React.Component {
    constructor(props){
        super(props);
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleFile(file){
        const reader = new FileReader();
        const rABS = !!reader.readAsBinalyString;
        //reader.onload contain event handler when readAsBinaryString
        reader.onload = e => {
            const wb = XLSX.read(e.target.result, { type: rABS ? "binary" : "array"});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1});
            const columns = data[0];
            const rows = data.slice(1);
            this.props.inputFile({columns: columns, rows: rows});
        };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.handleFile(files[0]);
    }

    render(){
        return (
            <>
                <input
                    type="file"
                    hiddenaccept={SheetJSFT}
                    onChange={this.handleChange}
                />
            </>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        inputFile: file => dispatch(inputFile(file))
    }
}


export default connect(
    null, mapDispatchToProps
)(FileInput);


const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm"
]
.map(function(x) {
    return "." + x;
})
.join(",");