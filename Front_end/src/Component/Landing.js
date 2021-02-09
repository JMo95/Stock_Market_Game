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

        render()
        {
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
                        <img src={[pict]} align='center'  />
                      </div>
                    </div>

                    <div className="land_hole"> &nbsp; </div>

                    <div className="land_box">   
                      <div className="land_box2">
                        <h2 className="land_text"> Search </h2>
                        <img src={[search_p]} className="land_Icon" align='center'  />
                        <p className="land_text"> --------- </p>
                        <form className="Nav_Base">
                          <input className="Nav_Base" type="text"  placeholder = "Seach ...."  name="name"  />
                        </form>
                      </div>
                      <div className="land_hole2"> </div>
                      <div className="land_box2">
                        <h2 className="land_text"> User </h2>
                        <div className="land_box3" style = { { display: 'center' }} > REGISTER </div>
                        <div className="land_box3"  display='center' > SIGN UP </div>
                      </div>
                    </div>


                    <div className="land_hole"> &nbsp; </div>
                  </header>
                </div>
              );
        }
}

export default landing;
