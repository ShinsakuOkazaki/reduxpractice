import React from "react";
import FileInput from './FileInput.jsx';
import TableSub from './TableSub.jsx';
import KeyUpload from "./KeyUpload.jsx"

const App = () => (
  <div className="row mt-5">
    <div>
      <KeyUpload />
    </div>
    <div>
      <FileInput/>
    </div>
    <div>
      <TableSub />
    </div>
  </div>
);
export default App;