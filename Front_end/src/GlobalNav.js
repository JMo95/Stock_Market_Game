import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

class BootstrapNavbar extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">Stock Price Predictor</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/">Top Gainers</Nav.Link>
                                    <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form>
                                    </Nav>
                                    <Nav className = "ml-auto">
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="">Something</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                    
                                </Navbar.Collapse>
                            </Navbar>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;