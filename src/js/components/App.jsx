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


const App = () => (
  <div className="row mt-5">
    {/* <div>
      <KeyUpload />
    </div> */}
    <div>
      <FileInput/>
    </div>
    <div>
      <TableSub />
    </div>
    <div>
      <InputName/>
    </div>
    <div>
      <TypeDropdown/>
    </div>
    <div>
      <VerifyButton />
    </div>
  </div>
);
export default App;