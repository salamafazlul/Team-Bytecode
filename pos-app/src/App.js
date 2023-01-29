import React,{ useState} from "react";
import './App.css';
import Login from './components/UserMgt/Login';
import { ReactDOM } from "react-dom";
import { Log } from './components/UserMgt/Log';

function App() {

  const [currentForm, setCurrentForm] = useState ("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
}


  return (
    <>
    <div className="split App">
      
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Log onFormSwitch={toggleForm} />
     }
     

    </div>
    
    <div className="split logo">
    <div className="centered">
      <img src={require('./images/logo.png')} />
      <p className="p1"><b> WELCOME !</b></p>
      <p className="p2"> BY TECH POS SOLUTION </p>
      <p className="p3"> Our technology creates your excellence </p>
    </div>

  </div>
  </>

  );
}

export default App