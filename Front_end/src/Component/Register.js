import React from "react";
import "./../css/Register.css"


class landing extends React.Component
{
        constructor(props) 
        {
                super(props);
        }

        render()
        {
          return (
                <div className="App">
                  <header className="App-header">
                    <p>
                      Register.
                    </p>
                    <div className="reg_box">
                      <form>
                        <div className="reg_text">Name: </div>
                        <input className="reg_Base" type="text"  placeholder = "Name..."  name="name"  />

                        <div className="reg_text">Last Name: </div>
                        <input className="reg_Base" type="text"  placeholder = "Name..."  name="name"  />

                        <div className="reg_text">UserName: </div>
                        <input className="reg_Base" type="text"  placeholder = "Name..."  name="name"  />

                        <div className="reg_text">Deposit: </div>
                        <input className="reg_Base" type="text"  placeholder = "Name..."  name="name"  />

                        <div className="reg_text">Password: </div>
                        <input className="Nav_Base" type="text"  placeholder = "Name..."  name="name"  />

                        <div className="reg_text">Confirm Password: </div>
                        <input className="reg_Base" type="text"  placeholder = "Name..."  name="name"  />
                      </form>
                    </div>
                  </header>
                </div>
              );
        }
}

export default landing;
