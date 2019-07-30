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

const App = () => (
  <div>
    {/* <div>
      <KeyUpload />
    </div> */}
    <div className="column">
      <FileInput/>
      <InputName/>
      <TypeDropdown/>
      <Switching/>
    </div> 
    <div className="column">
      <Descriotion/>
      <SOP/>
    </div>
    <div className="column">
      <VerifyButton/>
    </div>
    <div>
      <TableSub />
    </div>
  </div>
);
export default App;