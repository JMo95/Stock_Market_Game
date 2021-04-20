import    { React, useState, useEffect, Fragment }  from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'


const BootstrapNavbar = () => {

    const [isAuth, setIsAuth] = useState(false);
    const [email, setEmail] = useState("");
    const [money, setMoney] = useState(0);
    const [username, setUsername] = useState("");
    const [errorrs, setErrors] = useState(false);
  
    useEffect(() => {
      if (localStorage.getItem('token') !== null) {
        setIsAuth(true);
      }
    var myHeaders = new Headers();
    var bearer = "bearer "
    // console.log("This is my bearer: ", bearer)
    bearer += localStorage.getItem('token')
    // console.log("This is my bearer: ", bearer)
    myHeaders.append("Authorization", bearer);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    
    fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getuser/", requestOptions)
    .then(response => response.json())
    .then(function(result){
      setUsername(result[0].user__username)
      setEmail(result[0].user__email)
      setMoney(result[0].money)

     } )
    .catch(function(error){
       console.log('error', error) 
       localStorage.clear()
        setErrors(true)
      });

    }, []);

    
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="/">Beginner Trading</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/Find/aapl">Search</Nav.Link>
                                    <Nav.Link href="/Trading">Trade</Nav.Link>
                                    </Nav>
                                    <Nav>
                                    {/*
                                    <Form inline onSubmit={this.handleSubmit}>
                                    <FormControl type="text" placeholder="Enter name or ticker" className="mr-sm-2"
                                    name="name"  value={this.state.search_A} onChange={this.handle_Change}/>
                                    <Button variant="outline-success" onClick={()=> handleClick_Search()} onClick={this.handleSubmit} >Submit</Button>
                                    </Form>
                                    */}
                                    </Nav>
                                    {isAuth === true?
                                      ( 
                                        <Nav className="ml-auto pr-5">
                                        <NavDropdown title={username} id="basic-nav-dropdown" className = "pr-5">
                                            <NavDropdown.Item href="/User">User Info</NavDropdown.Item>
                                            <NavDropdown.Item href="/auth/Logout">Log Out</NavDropdown.Item>
                                        </NavDropdown>
                                        </Nav>
                                      )
                                      :
                                      ( 
                                        <Nav className="ml-auto pr-5">
                                        <NavDropdown title="WELCOME" id="basic-nav-dropdown" className = "pr-5">
                                            <NavDropdown.Item href="/auth/Sign_up">Sign up</NavDropdown.Item>
                                            <NavDropdown.Item href="/auth/Log_in">Login</NavDropdown.Item>
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
