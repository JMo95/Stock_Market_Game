import logo from './logo.svg';
import './css/App.css';
import React from "react";
import {render} from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
//import {Router, Route} from "react-router";

import landing from "./Component/Landing";
import search from "./Component/Search";
//import { AuthProvider } from './components/Auth';

function App() {
  return (
    <div className="App"> 
      <Router>
        {/* <div className="App_Nav"> */}
          <Nav />
        {/* </div> */}
        
        <div className="App_Body" >
          <div className='AppB'>              
              <Switch>
                  <Route path="/" exact component={landing} />
                  <Route path="/Landing" component={landing} />
                  <Route path="/Search" component={search} />
              </Switch>
            </div>  
        </div>
      </Router>
    </div>
  );
}

export default App;
