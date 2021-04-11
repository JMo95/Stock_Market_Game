import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'


class BootstrapNavbar extends React.Component{
  constructor(props) 
  {
    super(props);
    this.state ={
      search_A: '',
      user_hello: false
    };

    this.handle_Change = this.handle_Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handle_Change(event)
   {
      console.log("Opertion4");
      this.setState( (state, props) =>{
        return{
          search_A: event.target.value
        };
      }
      )
      console.log(this.state.search_A)
      this.props.search_F(this.state.search_A);
  }


  handleSubmit(event)
   {
    event.preventDefault();
      console.log("Submit happen");
      console.log(this.state.search_A);
      this.props.search_F(this.state.search_A);
      alert('A value was submitted: ' + this.state.search_A);
      window.location.href = '/search';
  }

  render()
  {

    var handleClick_landing = () =>
    {
      console.log("Opertion");
      window.location.href = '/Landing';
    }

    var handleClick_Search = () =>
    {
      console.log("Opertion2");
      // this.props.search_F("megaman");
      // console.log(this.props.search_F2);
      window.location.href = '/search';
    }

    var handleClick_User = () =>
    {
      console.log("Opertion3");
      if (this.state.user_hello === true)
      {
          this.setState({
            user_hello: false
          })
      }
      else
      {
        this.setState({
          user_hello: true
        })
      }
      //window.location.href = '/user';
      console.log("this is boolean: ", this.state.user_hello);
    }
    
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
                                    <Nav.Link href="/search">Search</Nav.Link>
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
                                    <Nav className="ml-auto pr-5">
                                    <NavDropdown title="User" id="basic-nav-dropdown" className = "pr-5">
                                        <NavDropdown.Item href="/User">User Info</NavDropdown.Item>
                                        <NavDropdown.Item href="/Log_in">Login</NavDropdown.Item>
                                        <NavDropdown.Item href="/Register">Resgister</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;
