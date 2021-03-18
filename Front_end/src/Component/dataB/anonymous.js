import React from "react";
import "./../../css/Landing.css"
import pict from "./../../Image/PICTURE.png"
import search_p from "./../../Image/BUTTON_search.png"

import axios from "axios"; 
  
class dataB extends React.Component { 
    state = { 
        details: [], 
        name: "",
        password: "",
        deposit: 0.0,
	    firstname: "", 
	    lastname: "",
    }; 
  
    componentDidMount() { 
        let data; 
  
        axios 
            .get("http://localhost:8000/wel2/") 
            .then((res) => { 
                data = res.data; 
                this.setState({ 
                    details: data, 
                }); 
            }) 
            .catch((err) => {}); 
    } 
  
    renderSwitch = (param) => { 
        switch (param + 1) { 
            case 1: 
                return "primary "; 
            case 2: 
                return "secondary"; 
            case 3: 
                return "success"; 
            case 4: 
                return "danger"; 
            case 5: 
                return "warning"; 
            case 6: 
                return "info"; 
            default: 
                return "yellow"; 
        } 
    }; 
  
    handleInput = (e) => { 
        this.setState({ 
            [e.target.name]: e.target.value, 
        }); 
    }; 
  
    handleSubmit = (e) => { 
        e.preventDefault(); 
  
        axios 
            .post("http://localhost:8000/wel2/", { 
                name: this.state.name,
                password: this.state.password,
                deposit: this.state.deposit,
	            firstname: this.state.firstname, 
	            lastname: this.state.lastname,
            }) 
            .then((res) => { 
                this.setState({ 
                    name: "",
                    password: "",
                    deposit: 0.0,
	                firstname: "", 
	                lastname: "",
                }); 
            }) 
            .catch((err) => {}); 
    }; 
  
    render() { 
        return ( 
            <div className="container jumbotron "> 
                <form onSubmit={this.handleSubmit}> 
                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"
                                  id="basic-addon1"> 
                                {" "} 
                                Name{" "} 
                            </span> 
                        </div> 
                        <input type="text" className="form-control" 
                               placeholder="Name of the Poet/Author"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.name} name="name"
                               onChange={this.handleInput} /> 
                    </div> 

                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"
                                  id="basic-addon1"> 
                                {" "} 
                                Password{" "} 
                            </span> 
                        </div> 
                        <input type="text" className="form-control" 
                               placeholder="Name of the Poet/Author"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.password} name="password"
                               onChange={this.handleInput} /> 
                    </div> 


                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"
                                  id="basic-addon1"> 
                                {" "} 
                                Deposit{" "} 
                            </span> 
                        </div> 
                        <input type="text" className="form-control" 
                               placeholder="Name of the Poet/Author"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.deposit} name="deposit"
                               onChange={this.handleInput} /> 
                    </div> 
  
                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"> 
                                First Name  
                            </span> 
                        </div> 
                        <textarea className="form-control " 
                                  aria-label="With textarea"
                                  placeholder="Tell us what you think of ....." 
                                  value={this.state.firstname} name="firstname" 
                                  onChange={this.handleInput}> 
                        </textarea> 
                    </div> 

                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"
                                  id="basic-addon1"> 
                                {" "} 
                                Last Name{" "} 
                            </span> 
                        </div> 
                        <input type="text" className="form-control" 
                               placeholder="Name of the Poet/Author"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.lastname} name="lastname"
                               onChange={this.handleInput} /> 
                    </div> 

  
                    <button type="submit" className="btn btn-primary mb-5"> 
                        Submit 
                    </button> 
                </form> 
  
                <hr 
                    style={{ 
                        color: "#000000", 
                        backgroundColor: "#000000", 
                        height: 0.5, 
                        borderColor: "#000000", 
                    }} 
                /> 
  
                {this.state.details.map((detail, id) => ( 
                    <div key={id}> 
                        <div className="card shadow-lg"> 
                            <div className={"bg-" + this.renderSwitch(id % 6) +  
                                          " card-header"}>User {id + 1}</div> 
                            <div className="card-body"> 
                                <blockquote className={"text-" + this.renderSwitch(id % 6) +  
                                                   " blockquote mb-0"}> 
                                    <h1> {detail.firstname} {detail.lastname} </h1> 
                                    <footer className="blockquote-footer"> 
                                        {" "} 
                                        <cite title="Source Title">{detail.deposit}$</cite> 
                                    </footer> 
                                </blockquote> 
                            </div> 
                        </div> 
                        <span className="border border-primary "></span> 
                    </div> 
                ))} 
            </div> 
        ); 
    } 
} 
export default dataB; 
