import React from "react";
import FileInput from './FileInput.jsx';
import TableSub from './TableSub.jsx';
import KeyUpload from "./KeyUpload.jsx"
import VerifyButton from "./Verify.jsx";
import InputName from "./InputName.jsx";
import TypeDropdown from "./DataType.jsx";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Switching from "./Switching.jsx";


const App = () => (
  <div className="row mt-3">
    {/* <div>
      <KeyUpload />
    </div> */}
    <div>
      <FileInput/>
    </div>
    <div className="w3-cell-row ">
      <div className="w3-container w3-cell">
        <InputName/>
      </div>
      <div className="w3-container w3-cell">
        <TypeDropdown/>
      </div>
      <div className="w3-container w3-cell">
        <VerifyButton />
      </div>
    </div>
    <div>
      <Switching/>
    </div>
    <div>
      <TableSub />
    </div>
  </div>
);
export default App;