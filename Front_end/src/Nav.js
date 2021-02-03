import './css/Nav.css';
// import React, { Component }  from "react";
// import Image from 'react-image-resizer';
import logo from "./Image/BUTTON_search.png"
import profile from "./Image/Profile.png"
import pictureX from "./Image/PICTURE.png"


const Nav = () => {
  // console.log(currentUser);

  var handleClick_landing = () =>
  {
    console.log("Opertion");
    window.location.href = '/Landing';
  }

  var handleClick_Search = () =>
  {
    console.log("Opertion2");
    window.location.href = '/search';
  }

  var handleClick_User = () =>
  {
    console.log("Opertion3");
    window.location.href = '/user';
  }

    return (
       <div className="CoreX2">
     {/* <Image source={logo} 
     style={{ alignSelf: 'center', height: 150, width: 150,
     borderWidth: 1, borderRadius: 75 }} /> */}
        <img src={pictureX} className="Nav_Icon2" onClick={()=> handleClick_landing()}/>
        
        <div className="Nav_Base">
            
        </div>
        <form className="Nav_Base">
          <input className="Nav_Base" type="text"  placeholder = "Seach ...."  name="name"  />
        </form>
        <img src={logo} className="Nav_Icon" align='center' onClick={()=> handleClick_Search()} />
        
        <div className="hole3"> </div>
        <img src={[profile]} className="Nav_Icon" align='right' onClick={()=> handleClick_User()}  />

      </div>
    );
}

export default Nav;