import React from "react";
import "./../css/Register.css"


class landing extends React.Component
{
  constructor(props) 
  {
    super(props);
    this.state = { 
      firstname:'',
      lastname: '',
      username: '',
      deposit: 0.0,
      passw: '',
      conf_passw: '',
      match_pass: false
    };

    this.handle_Change_First_name = this.handle_Change_First_name.bind(this);
    this.handle_Change_last_name = this.handle_Change_last_name.bind(this);
    this.handle_Change_user_name = this.handle_Change_user_name.bind(this);
    this.handle_Change_deposit = this.handle_Change_deposit.bind(this);
    this.handle_Change_pass = this.handle_Change_pass.bind(this);
    this.handle_Change_pass_con = this.handle_Change_pass_con.bind(this);
  }

  handle_Change_First_name(event)
  {
    this.setState( (state, props) =>{
      return{
        firstname: event.target.value
      };
      })
      console.log(this.state.firstname);
  }

  handle_Change_last_name(event)
  {
    this.setState( (state, props) =>{
      return{
        lastname: event.target.value
      };
      })
      console.log(this.state.lastname);
  }

  handle_Change_user_name(event)
  {
    this.setState( (state, props) =>{
      return{
        username: event.target.value
      };
      })
      console.log(this.state.username);
  }

  handle_Change_deposit(event)
  {
    this.setState( (state, props) =>{
      return{
        deposit: event.target.value
      };
      })
      console.log(this.state.deposit);
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

  handle_Change_pass_con(event)
  {
    this.setState( (state, props) =>{
      return{
       conf_passw: event.target.value
      };
      })
    console.log(this.state.conf_passw);
  }


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
              <form>

                <div className="reg_box2">
                  <div className="reg_box3"> 
                    <div className="reg_text">Name: </div> 
                  </div>
                  <div className="reg_box3">
                    <input className="reg_Base" type="text"  placeholder = "Name..."  name="name" 
                          value={this.state.firstname} onChange={handle_Change_First_name2}  />
                  </div>
                </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Last Name: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base" type="text"  placeholder = "Name..."  name="name" 
                            value={this.state.lastname} onChange={this.handle_Change_last_name} />
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">UserName: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base" type="text"  placeholder = "Name..."  name="name" 
                            value={this.state.username} onChange={this.handle_Change_user_name} />
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Deposit: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base" type="text"  placeholder = "Name..."  name="name"  
                            value={this.state.deposit} onChange={this.handle_Change_deposit}/>
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Password: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="Nav_Base" type="text"  placeholder = "Name..."  name="name"  
                              value={this.state.passw} onChange={this.handle_Change_pass}/>
                    </div>
                  </div>

                  <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">Confirm Password: </div>
                    </div>
                    <div className="reg_box3">
                      <input className="reg_Base" type="text"  placeholder = "Name..."  name="name" 
                              value={this.state.conf_passw} onChange={this.handle_Change_pass_con}/>
                    </div>
                  </div>
                  {(() => {
                      if (this.state.passw !== this.state.conf_passw && this.state.conf_passw .length > 1){
                        
                          return (
                              <div className="reg_text2" >the password need to match</div>
                          )
                      }
                      
                      return null;
                    })()}
                </form>
                
              </div>
            </header>
          </div>
              );
        }
}

export default landing;
