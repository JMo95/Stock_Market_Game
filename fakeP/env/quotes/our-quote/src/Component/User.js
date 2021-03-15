import React from "react";
import "./../css/User.css"
import search_p from "./../Image/BUTTON_search.png"


class User extends React.Component
{
        constructor(props) 
        {
                super(props);
        };

        handleClick_Search2 = () =>
        {
            console.log("OpertionX");
            alert('Operation search');
            window.location.href = '/search';
        }

        handleSubmit_search(event)
         {
          event.preventDefault();
            console.log("Submit happen");
            alert('A value was submitted: ');
            window.location.href = '/search';
        }

        render()
        {
          return (
                <div className="App">
                  <header className="App-header">
                  <div className="user_box">   
                      <div className="user_box2">
                        <h2 className="user_text"> User -- NAME </h2>
                        <div className="user_box4">
                            <h3> Profile </h3>
                            this is personal info
                            <p className="user_text2"> Name: </p>
                            <p className="user_text2"> Usename: </p>
                            <p className="user_text2"> Deposit money: </p>
                        </div>

                        <div className="user_box4">
                            <h3> Pin sotcks </h3>
                            <p className="user_text2"> Name: </p>
                            <p className="user_text2"> Usename: </p>
                            <p className="user_text2"> Deposit money: </p>
                        </div>

                      </div>

                      <div className="user_hole2"> </div>

                      <div className="user_box2">
                        <h2 className="user_text"> Search </h2>
                        <img src={[search_p]} className="land_Icon" align='center' onClick={()=> this.handleClick_Search2()} alt="standard search button" />
                        <p className="user_text"> --------- </p>
                        <form className="user_Base" onSubmit={this.handleSubmit_search}>
                          <input className="user_Base" type="text"  placeholder = "Seach ...."  name="name"  />
                        </form>
                      </div>
                    </div>

                  </header>

                </div>
              );
        }
}

export default User;
