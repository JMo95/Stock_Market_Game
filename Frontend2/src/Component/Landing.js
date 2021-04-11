import React from "react";
import "./../css/Landing.css"
import pict from "./../Image/PICTURE.png"
import search_p from "./../Image/BUTTON_search.png"


class landing extends React.Component
{
        constructor(props) 
        {
          super(props);
        }


        handleClick_Search2 = () =>
          {
            console.log("OpertionX");
            window.location.href = '/search';
          }

        handleClick_Sign_in = () =>
          {
            console.log("Opertion_Sign");
            window.location.href = '/Log_in';
          }

        handleClick_Regsiter = () =>
          {
            console.log("Opertion_Reg");
            window.location.href = '/Register';
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
          // var handleClick_Search = () =>
          // {
          //   console.log("Opertion2");
          //   window.location.href = '/search';
          // }

          

          return (
                <div className="App">
                  <header className="App-header">
                    <h1> Stock Predictor App </h1>
                    <div className="land_box">   
                      <div className="land_box2">
                        <h2 className="land_text"> About Us </h2>
                        <p className="land_text">
                          This is Senior project, search yourr stock, be prepare, we will tell you your future, but you take the risk
                        </p>
                      </div>
                      <div className="land_hole2"> </div>
                      <div className="land_box2">
                        <img src={[pict]} align='center' alt="future imagee for stock price" />
                      </div>
                    </div>

                    <div className="land_hole"> &nbsp; </div>

                    <div className="land_box">   
                      <div className="land_box2">
                        <h2 className="land_text"> Search </h2>
                        <img src={[search_p]} className="land_Icon" align='center' onClick={()=> this.handleClick_Search2()} alt="standard search button"  />
                        <p className="land_text"> --------- </p>
                        <form className="Nav_Base" onSubmit={this.handleSubmit_search}>
                          <input className="Nav_Base" type="text"  placeholder = "Seach ...."  name="name"  />
                        </form>
                      </div>
                      <div className="land_hole2"> </div>
                      <div className="land_box2">
                        <h2 className="land_text"> User </h2>
                        <div className="land_box3" style = { { display: 'center' }} onClick={()=> this.handleClick_Regsiter()} > REGISTER </div>
                        <div className="land_box3"  display='center' onClick={()=> this.handleClick_Sign_in()} > SIGN UP </div>
                      </div>
                    </div>


                    <div className="land_hole"> &nbsp; </div>
                  </header>
                </div>
              );
        }
}

export default landing;
