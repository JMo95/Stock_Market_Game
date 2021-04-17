import './css/App.css';
import React from "react";
// import {render} from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BootstrapNavbar from './Nav';
//import {Router, Route} from "react-router";

import landing from "./Component/Landing";
import Search from "./Component/Search";
import userX from "./Component/User";
import regist_P from "./Component/Register";
import log_in from "./Component/Log_in";
import dataB from "./Component/dataB";
import Trading from "./Component/Trading";
import auth_sign from "./Component/auth/Signup";
import auth_log_out from "./Component/auth/Logout";
import auth_log_in from "./Component/auth/Log_in";
import get_stock from "./Component/table.js";


//import { AuthProvider } from './components/Auth';


//function App() {
class App extends React.Component
{
  constructor(props) 
  {
    super(props);
    this.state = { 
      search_for: ''
    };
  }

  handleSearch = (search_Data) =>{
    //this function is pass to the children to modify original search_for
    this.setState({search_for: search_Data})
    console.log(this.state.search_for)
  }

  handle_pass_Search = () =>{
    console.log("Function")
    return this.state.search_for;
  }

        render()
        {
          return (
            <div className="App"> 
            <BootstrapNavbar search_F = {this.handleSearch}  />
            {this.handle_pass_Search}
              <Router>
                {/* <div className="App_Nav"> */}
                  
                {/* </div> */}
                
                <div className="App_Body" >
                  <div className='AppB'>              
                      <Switch>
                          <Route path="/" exact component={landing} />
                          <Route exact path="/Landing" component={landing} />
                          <Route exact path="/Search" render={(props) => (<Search Input={this.state.search_for} search_F={this.handleSearch} /> )} />
                          {/* <Route path="/Search" component={search} /> */}
                          <Route exact path="/User" component={userX} />
                          <Route exact path="/Log_in" component={log_in} />
                          <Route exact path="/Register" component={regist_P} />
                          <Route exact path="/dataB" component={dataB} />
                          <Route exact path="/Trading" component={Trading} />

                          <Route exact path="/auth/Sign_up" component={auth_sign} />
                          <Route exact path="/auth/Logout" component={auth_log_out} />
                          <Route exact path="/auth/Log_in" component={auth_log_in} />
                          <Route exact path="/superman" component={get_stock} />
                          
                      </Switch>
                    </div>  
                </div>
              </Router>
            </div>
          );
        }
}

export default App;
