import React from "react";
// import TableSub from './TableSub.jsx';
// import KeyUpload from "./KeyUpload.jsx"
// import VerifyButton from "./Verify.jsx";
// import TypeDropdown from "./DataType.jsx";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import Switching from "./Switching.jsx";
// import Descriotion from "./Description.jsx";
// import SOP from "./SOP.jsx";
// import AssociatedVisit from "./AssociatedVisit.jsx";
// import AssociatedLocation from "./AssociatedLocation.jsx";
// import VariablePanel from "./VariablePanel.jsx";
import StrategyPage from "./StrategyPage.jsx";
import UploadPage from "./FileInputPage.jsx";
import PageSwitching from "./PageSwitching.jsx";


const App = () => (
  <div>
    {/* <div>
      <KeyUpload />
    </div> */}
    <div><UploadPage/></div>
    <div><StrategyPage/></div>
    <div><PageSwitching/></div>
    {/* <div className="column-left">
      <div className="w3-margin">
        <VariablePanel/>
      </div>
      <div className="data-type">
        <TypeDropdown/>
      </div>
      <div className="w3-margin">
        <Switching/>
      </div>
    </div> 
    <div className="column-middle">
      <div className="w3-margin">
        <Descriotion/>
      </div>
      <div className="w3-margin">
        <SOP/>
      </div>
    </div>
    <div className="column-right">
      <div className="w3-margin">
        <AssociatedVisit/>
      </div>
      <div className="w3-margin">  
        <AssociatedLocation/>
      </div>
      <div className="varify">  
        <VerifyButton/>
      </div>
    </div>
    <div>
      <TableSub />
    </div> */}
  </div>
);
export default App;