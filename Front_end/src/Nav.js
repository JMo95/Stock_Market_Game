import './css/Nav.css';
import React, { Component }  from "react";
// import Image from 'react-image-resizer';
import logo from "./Image/BUTTON_search.png"
import profile from "./Image/Profile.png"
import pictureX from "./Image/PICTURE.png"

class Nav extends React.Component
{
  // console.log(currentUser);

  constructor(props) 
        {
          super(props);
          this.state ={
            search_A: ''
          };

          this.handle_Change = this.handle_Change.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

        handle_Change(event)
         {
            console.log("Opertion4");
            this.setState( (state, props) =>{
              return{
                search_A: event.target.value
              };
            }
            )
            console.log(this.state.search_A)
            this.props.search_F(this.state.search_A);
        }


        handleSubmit(event)
         {
          event.preventDefault();
            console.log("Submit happen");
            console.log(this.state.search_A);
            this.props.search_F(this.state.search_A);
            alert('A value was submitted: ' + this.state.search_A);
            window.location.href = '/search';
        }

        render()
        {

          var handleClick_landing = () =>
          {
            console.log("Opertion");
            window.location.href = '/Landing';
          }

          var handleClick_Search = () =>
          {
            console.log("Opertion2");
            // this.props.search_F("megaman");
            // console.log(this.props.search_F2);
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
                <form className="Nav_Base" onSubmit={this.handleSubmit} >
                  <input className="Nav_Base" type="text"  placeholder = "Seach ...."  name="name"  value={this.state.search_A} onChange={this.handle_Change} />
                </form>
                <img src={logo} className="Nav_Icon" align='center' onClick={()=> handleClick_Search()} />
                
                <div className="hole3"> </div>
                <img src={[profile]} className="Nav_Icon" align='right' onClick={()=> handleClick_User()}  />

              </div>
            );
        }
}

export default Nav;

// const Nav = (props) => {
//   // console.log(currentUser);

//   var handleClick_landing = () =>
//   {
//     console.log("Opertion");
//     window.location.href = '/Landing';
//   }

//   var handleClick_Search = () =>
//   {
//     console.log("Opertion2");
//     window.location.href = '/search';
//   }

//   var handleClick_User = () =>
//   {
//     console.log("Opertion3");
//     window.location.href = '/user';
//   }

//     return (
//        <div className="CoreX2">
//      {/* <Image source={logo} 
//      style={{ alignSelf: 'center', height: 150, width: 150,
//      borderWidth: 1, borderRadius: 75 }} /> */}
//         <img src={pictureX} className="Nav_Icon2" onClick={()=> handleClick_landing()}/>
        
//         <div className="Nav_Base">
            
//         </div>
//         <form className="Nav_Base">
//           <input className="Nav_Base" type="text"  placeholder = "Seach ...."  name="name"  />
//         </form>
//         <img src={logo} className="Nav_Icon" align='center' onClick={()=> handleClick_Search()} />
        
//         <div className="hole3"> </div>
//         <img src={[profile]} className="Nav_Icon" align='right' onClick={()=> handleClick_User()}  />

//       </div>
//     );
// }

// export default Nav;