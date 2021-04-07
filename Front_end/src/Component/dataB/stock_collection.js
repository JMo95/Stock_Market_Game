import React from "react";
import "./../../css/Landing.css"
import pict from "./../../Image/PICTURE.png"
import search_p from "./../../Image/BUTTON_search.png"

import axios from "axios"; 
  
class Stock_C extends React.Component { 
    state = { 
        details: [], 
        name: "",
        price: 0.0,
	    Company: "", 
	    desciption: "",
        date: "",
	    ticker: "",
    }; 
  
    componentDidMount() { 
        let data; 
  
        axios 
            .get("http://localhost:8000/wel3/") 
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
        console.log("Stock submit happen")
  
        axios 
            .post("http://localhost:8000/wel3/", { 
                name: this.state.name,
                price: this.state.price,
	            Company: this.state.Company, 
	            desciption: this.state.desciption,
                date: this.state.date,
                ticker: this.state.ticker,
            }) 
            .then((res) => { 
                this.setState({ 
                    name: "",
                    price: 0.0,
            	    Company: "", 
            	    desciption: "",
                    date: "", 
                    ticker: "",
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
                                Company{" "} 
                            </span> 
                        </div> 
                        <input type="text" className="form-control" 
                               placeholder="Type of the Company"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.Company} name="Company"
                               onChange={this.handleInput} /> 
                    </div> 


                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"
                                  id="basic-addon1"> 
                                {" "} 
                                Price{" "} 
                            </span> 
                        </div> 
                        <input type="text" className="form-control" 
                               placeholder="Price of Stock"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.price} name="price"
                               onChange={this.handleInput} /> 
                    </div> 
  
                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"> 
                                Description  
                            </span> 
                        </div> 
                        <textarea className="form-control " 
                                  aria-label="With textarea"
                                  placeholder="Tell us what you think of ....." 
                                  value={this.state.description} name="description" 
                                  onChange={this.handleInput}> 
                        </textarea> 
                    </div> 

                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"
                                  id="basic-addon1"> 
                                {" "} 
                                date{" "} 
                            </span> 
                        </div> 
                        <input type="date" className="form-control" 
                               placeholder="Age published"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.date} name="date"
                               onChange={this.handleInput} /> 
                    </div> 

                    <div className="input-group mb-3"> 
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"
                                  id="basic-addon1"> 
                                {" "} 
                                ticker{" "} 
                            </span> 
                        </div> 
                        <input type="text" className="form-control" 
                               placeholder="..."
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.ticker} name="ticker"
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
                                          " card-header"}>Stock {id + 1}</div> 
                            <div className="card-body"> 
                                <blockquote className={"text-" + this.renderSwitch(id % 6) +  
                                                   " blockquote mb-0"}> 
                                    <h1> {detail.firstname} {detail.name} </h1> 
                                    <footer className="blockquote-footer"> 
                                        {" "} 
                                        <cite title="Source Title">{detail.Company}</cite> 
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
export default Stock_C; 
