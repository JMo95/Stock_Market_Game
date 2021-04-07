import React from "react";
import "./../css/Register.css";
import axios from "axios";


class landing extends React.Component
{

  constructor(props) 
  {
    super(props);
    this.state = { 
      details: [],
      username: '',
      passw: '',
      submitH: false
    };

    this.handle_Change_user_name = this.handle_Change_user_name.bind(this);
    this.handle_Change_pass = this.handle_Change_pass.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
  }

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


  handle_Change_user_name(event)
  {
    this.setState( (state, props) =>{
      return{
        username: event.target.value
      };
      })
      console.log(this.state.username);
  }


  handle_Change_pass(event)
  {
    this.setState( (state, props) =>{
      return{
       passw: event.target.value
      };
      })
    console.log(this.state.passw);
  }

  OnSubmit(e)
  {
    e.preventDefault();
    console.log("Submit")
    if (this.state.submitH === false)
    {
      console.log("Change happen") 
      this.setState( (state, props) =>{
        return{
          submitH: true
        };
      })
    }
    else
    {
      console.log("Change 2 happen") 
      this.setState( (state, props) =>{
        return{
          submitH: false
        };
      })
    } 
    console.log(this.state.submitH)   
  }


  render()
  {

    

    return (
        <div className="App">
          <header className="App-header">
            <div className="reg_box">
              <p className="reg_text0"> Sign in </p>
              <form>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">UserName: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base2" type="text"  placeholder = "Name..."  name="name" 
                            value={this.state.username} onChange={this.handle_Change_user_name} />
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Password: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base2" type="text"  placeholder = "Name..."  name="passw"  
                              value={this.state.passw} onChange={this.handle_Change_pass}/>
                    </div>
                  </div>

                  {this.state.passw.length>1 && this.state.username.length>1 ?  
                      <button type="submit" className="btn btn-primary mb-5" onClick={this.OnSubmit}> 
                        Submit 
                      </button> 
                      : 
                      <div> </div> }
                </form>
              </div>
              {this.state.submitH ? 
                <div>
                  {this.state.details.some(detail => detail.name === this.state.username &&  detail.password === this.state.passw)? 
                  <div>hello</div> 
                  : 
                  <div>Error</div> 
                  }
                    {/* {this.state.details.filter( detail => detail.name === this.state.username &&  detail.password === this.state.passw ).map((detail, id) => ( 
                      <div key={id}> 
                          {this.state.details.some(detail => detail.name === this.state.username)}
                          <div className="card shadow-lg"> 
                              <div className={"bg-" + this.renderSwitch(id % 6) +  
                                            " card-header"}>User {id + 1}</div> 
                              <div className="card-body"> 
                                  <blockquote className={"text-" + this.renderSwitch(id % 6) +  
                                                    " blockquote mb-0"}> 
                                      <h1> {detail.firstname} {detail.lastname} </h1> 
                                      <footer className="blockquote-footer"> 
                                          {" "} 
                                          <cite title="Source Title">{detail.password}$</cite> 
                                      </footer> 
                                  </blockquote> 
                              </div> 
                          </div> 
                          <span className="border border-primary "></span> 
                      </div> 
                  ))} */}
                </div> 
                :
                <div> </div>
              }
                          </header>
          </div>
              );
        }
}

export default landing;
