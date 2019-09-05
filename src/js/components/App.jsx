import React from "react";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import StrategyPage from "./StrategyPage.jsx";
import UploadPage from "./FileInputPage.jsx";
import PageSwitching from "./PageSwitching.jsx";

//root components to control 
const App = () => (
  <div>
    <div><UploadPage/></div>
    <div><StrategyPage/></div>
    <div><PageSwitching/></div>
  </div>
);
export default App;