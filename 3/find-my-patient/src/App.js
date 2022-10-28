import React from "react";
import './App.css';
import SignInOutContainer from './containers';
import PatientHome from "./components/Patient/home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import AddPatient from './components/Patient/addPatient';
import UpdatePatient from './components/Patient/updatePatient';
import NotFound from './NotFound';
function App() {
  return (
    <div className="App">
 <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<SignInOutContainer />}/>
        <Route exact path="/patient" element={<PatientHome />}/>
        <Route exact path="/addPatient"  element={<AddPatient/>}/>
        <Route exact path="/updatePatient" element={<UpdatePatient/>}/>
        <Route path="*" element={<NotFound />} />
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
