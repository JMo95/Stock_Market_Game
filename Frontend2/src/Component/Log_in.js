import React from "react";
import "./../css/Register.css";


class landing extends React.Component
{
  constructor(props) 
  {
    super(props);
    this.state = { 
      username: '',
      passw: ''
    };

    this.handle_Change_user_name = this.handle_Change_user_name.bind(this);
    this.handle_Change_pass = this.handle_Change_pass.bind(this);
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


  handle_Change_pass(event)
  {
    this.setState( (state, props) =>{
      return{
       passw: event.target.value
      };
      })
    console.log(this.state.passw);
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
                      <input className="reg_Base" type="text"  placeholder = "Name..."  name="name" 
                            value={this.state.username} onChange={this.handle_Change_user_name} />
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

                  

                </form>
              </div>
            </header>
          </div>
              );
        }
}

export default landing;
