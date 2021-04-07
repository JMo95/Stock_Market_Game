import React from "react";
import "./../css/Register.css"

import axios from "axios"; 

class landing extends React.Component
{
//   // constructor(props) 
//   // {
//   //   super(props);
//   //   this.state = { 
//   //     firstname:'',
//   //     lastname: '',
//   //     username: '',
//   //     deposit: 0.0,
//   //     passw: '',
//   //     conf_passw: '',
//   //     match_pass: false
//   //   };

//     this.handle_Change_First_name = this.handle_Change_First_name.bind(this);
//     this.handle_Change_last_name = this.handle_Change_last_name.bind(this);
//     this.handle_Change_user_name = this.handle_Change_user_name.bind(this);
//     this.handle_Change_deposit = this.handle_Change_deposit.bind(this);
//     this.handle_Change_pass = this.handle_Change_pass.bind(this);
//     this.handle_Change_pass_con = this.handle_Change_pass_con.bind(this);
//   }

state = { 
  details: [], 
  name: "",
  password: "",
  deposit: 0.0,
  firstname: "", 
  lastname: "",
  conf_passw: ""
}; 






handleInput = (e) => { 
    this.setState({ 
        [e.target.name]: e.target.value, 
    }); 
}; 

handleSubmit = (e) => { 
    // e.preventDefault(); 
    
    console.log("Submit Happen")

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
              conf_passw: ""
            }); 
        }) 
        .catch((err) => {}); 
}; 


  render()
  {

    var handle_Change_First_name2 = (event)=>
    {
    this.setState( (state, props) =>{
      return{
        firstname: event.target.value
      };
      })
      console.log(this.state.firstname);
    }

    return (
        <div className="App">
          <header className="App-header">
            <div className="reg_box">
              <p className="reg_text0"> Register </p>
              <form onSubmit={this.handleSubmit}>

                <div className="reg_box2">
                  <div className="reg_box3"> 
                    <div className="reg_text">Name: </div> 
                  </div>
                  <div className="reg_box3">
                    <input className="reg_Base2" type="text"  placeholder = "Name..."  name="firstname" 
                          value={this.state.firstname} onChange={this.handleInput}  />
                  </div>
                </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Last Name: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base2" type="text"  placeholder = "Name..."  name="lastname" 
                            value={this.state.lastname} onChange={this.handleInput} />
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">UserName: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base2" type="text"  placeholder = "Name..."  name="name" 
                            value={this.state.name} onChange={this.handleInput} />
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Deposit: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base2" type="text"  placeholder = "Name..."  name="deposit"  
                            value={this.state.deposit} onChange={this.handleInput}/>
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Password: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base2" type="password"  placeholder = "Name..."  name="password"  
                              value={this.state.password} onChange={this.handleInput}/>
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Confirm Password: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base2" type="password"  placeholder = "Name..."  name="conf_passw" 
                              value={this.state.conf_passw} onChange={this.handleInput}/>
                    </div>
                  </div>
                  {(() => {
                    
                      if (this.state.password !== this.state.conf_passw && this.state.conf_passw .length > 1){
                        
                          return (
                              <div className="reg_text2" >the password need to match</div>
                          )
                      }
                      
                      if(this.state.password === this.state.conf_passw && this.state.conf_passw .length > 1)
                      {
                        return <button type="submit" className="btn btn-primary mb-5"> Submit </button> ;
                      }
                    })()}

                    


                </form>
                
              </div>
            </header>
          </div>
              );
        }
}

export default landing;
