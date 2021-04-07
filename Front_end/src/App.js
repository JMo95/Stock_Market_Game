import './css/App.css';
import React from "react";
// import {render} from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BootstrapNavbar from './Navbar/Nav';
// import useToken from './Tokens/useToken';
//import {Router, Route} from "react-router";

import landing from "./Component/Landing";
import Search from "./Component/Search";
import userX from "./Component/User";
import regist_P from "./Component/Register";
import log_in from "./Component/Log_in";
import dataB from "./Component/dataB";
import anonymous from "./Component/dataB/anonymous";
import stock_C from "./Component/dataB/stock_collection";
import auth_sign from "./Component/auth/Signup";
import auth_log_out from "./Component/auth/Logout";
import auth_log_in from "./Component/auth/Log_in";

//import { AuthProvider } from './components/Auth';



function App()
// class App extends React.Component
{

  // const {token, setToken } = useToken();
  // constructor(props) 
  // {
    
  //   super(props);
  //   this.state = { 
  //     search_for: ''
  //   };
  // }
  let state = {
    search_for: ''
  }



  function handleSearch(search_Data){
    //this function is pass to the children to modify original search_for
    state.search_for= search_Data
    console.log(state.search_for)
  }

  function handle_pass_Search(){
    console.log("Function")
    return state.search_for;
  }

        // render()
        // {

          

  return (
    <div className="App"> 
    
      {/* <BootstrapNavbar search_F = {handleSearch()}  /> */}
      <BootstrapNavbar  />
      {handle_pass_Search()}
      <Router>
      {/* <div className="App_Nav"> */}
                  
      {/* </div> */}
                
        <div className="App_Body" >
          <div className='AppB'>              
            <Switch>
              <Route path="/" exact component={landing} />
              <Route exact path="/Landing" component={landing} />
              {/* <Route exact path="/Search" render={(props) => (<Search Input={this.state.search_for} search_F={this.handleSearch} /> )} /> */}
              <Route path="/Search" component={Search} />
              <Route exact path="/User" component={userX} />
              <Route exact path="/Log_in" component={log_in} />
              <Route exact path="/Register" component={regist_P} />
              <Route exact path="/dataB" component={dataB} />
              <Route exact path="/anonymous" component={anonymous} />
              <Route exact path="/stock_C" component={stock_C} />
              <Route exact path="/auth/Sign_up" component={auth_sign} />
              <Route exact path="/auth/Logout" component={auth_log_out} />
              <Route exact path="/auth/Log_in" component={auth_log_in} />
              
            </Switch>
          </div>  
        </div>
      </Router>
    </div>
    );
  }
// }

export default App;
