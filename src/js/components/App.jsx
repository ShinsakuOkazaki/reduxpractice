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
import Descriotion from "./Description.jsx";
import SOP from "./SOP.jsx";
import AssociatedVisit from "./AssociatedVisit.jsx";
import AssociatedLocation from "./AssociatedLocation.jsx";

const App = () => (
  <div>
    {/* <div>
      <KeyUpload />
    </div> */}
    <div className="column">
      <div className="w3-margin">
        <FileInput/>
      </div>
      <div className="w3-margin">
        <InputName/>
      </div>
      <div className="w3-margin">
        <TypeDropdown/>
      </div>
      <div className="w3-margin">
        <Switching/>
      </div>
    </div> 
    <div className="column">
      <div className="w3-margin">
        <Descriotion/>
      </div>
      <div className="w3-margin">
        <SOP/>
      </div>
    </div>
    <div className="column">
      <div className="w3-margin">
        <AssociatedVisit/>
      </div>
      <div className="w3-margin">  
        <AssociatedLocation/>
      </div>
      <div className="w3-margin">  
        <VerifyButton/>
      </div>
    </div>
    <div>
      <TableSub />
    </div>
  </div>
);
export default App;