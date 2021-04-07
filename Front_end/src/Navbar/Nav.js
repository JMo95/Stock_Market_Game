import React, { useState, useEffect, Fragment }  from 'react'
import { BrowserRouter as Router,
    Switch, Route, useParams, } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

const BootstrapNavbar = () => {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);


  function handle_Change(event)
   {
      console.log("Opertion4");
      // this.setState( (state, props) =>{
      //   return{
      //     search_A: event.target.value
      //   };
      // }
      // )
      // console.log(this.state.search_A)
      // // this.props.search_F(this.state.search_A);
  }


  function handleSubmit(event)
   {
      event.preventDefault();
    //   console.log("Submit happen");
    //   console.log(this.state.search_A);
    //   // this.props.search_F(this.state.search_A);
      alert('A value was submitted: ');
      window.location.href = '/search';
  }

  // render()
  // {

    function handleClick_landing(){
      console.log("Opertion");
      // window.location.href = '/Landing';
    }

    function handleClick_Search (){
      console.log("Opertion2");
      // this.props.search_F("megaman");
      // console.log(this.props.search_F2);
      window.location.href = '/search';
    }

    var handleClick_User = () =>
    {
      console.log("Opertion3");
      // if (this.state.user_hello === true)
      // {
      //     this.setState({
      //       user_hello: false
      //     })
      // }
      // else
      // {
      //   this.setState({
      //     user_hello: true
      //   })
      // }
      // //window.location.href = '/user';
      // console.log("this is boolean: ", this.state.user_hello);
    }
    
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="/">Stock Price Predictor</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/">Top Gainers</Nav.Link>
                                    </Nav>
                                    <Nav>
                                    <Form inline onSubmit={handleSubmit}>
                                    <FormControl type="text" placeholder="Enter name or ticker" className="mr-sm-2"
                                    name="name"  value='he' onChange={handle_Change}/>
                                    <Button variant="outline-success" onClick={()=> handleClick_Search()} onClick={handleSubmit} >Submit</Button>
                                    </Form>
                                    </Nav>
                                    {isAuth === true?
                                      (
                                        <Nav className="ml-auto pr-5">
                                          <NavDropdown title="User" id="basic-nav-dropdown" className = "pr-5">
                                            <NavDropdown.Item href="/User">User Info</NavDropdown.Item>
                                            <NavDropdown.Item href="/auth/Log_out">Log Out</NavDropdown.Item>
                                          </NavDropdown>
                                        </Nav>
                                      )
                                      :
                                      (
                                        <Nav className="ml-auto pr-5">
                                          <NavDropdown title="WELCOME" id="basic-nav-dropdown" className = "pr-5">
                                              <NavDropdown.Item href="/auth/Sign_up">Sign up</NavDropdown.Item>
                                              <NavDropdown.Item href="/auth/Log_in">Log In</NavDropdown.Item>
                                          </NavDropdown>
                                        </Nav>
                                      )
                                    }
                                    
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                        </Router>
                    </div>
                </div>
            </div>
        )  
    // }
}

export default BootstrapNavbar;