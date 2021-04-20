import React, { useState, useEffect, Fragment }  from "react";
import "./../css/User.css"
import search_p from "./../Image/BUTTON_search.png"
import Stocks from './table';


const User = () => {

  const [email, setEmail] = useState('')
  const [money, setMoney] = useState('')
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState(false);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      window.location.replace('http://localhost:3000/');
    } else {
      setLoading(false);
    }
    var myHeaders = new Headers();
    var bearer = "bearer "
    // console.log("This is my bearer: ", bearer)
    bearer += localStorage.getItem('token')
    // console.log("This is my bearer: ", bearer)
    myHeaders.append("Authorization", bearer);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    
    fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getuser/", requestOptions)
    .then(response => response.json())
    .then(function(result){
      // console.log("This is a result: ", result[0])
      // console.log("This is a map user: ", result[0].user__username)
      // console.log("This is a map email: ", result[0].user__email)
      // console.log("This is a username: ", result[0].getElementBy('user_username'))
      // console.log("This is a result: ", result[0].user_username)
      // tomato["user__username"] = result[0].user__username
      // tomato.money = result[0].money
      // tomato.user__email = result[0].user__email
      setUsername(result[0].user__username)
      setEmail(result[0].user__email)
      setMoney(result[0].money)

     } )
    .catch(function(error){
       console.log('error', error) 
       console.log("Tomato")
       localStorage.clear()
        setErrors(true)
      });
// localStorage.clear(), setErrors(true)
  }, []);


  const handleUser = e => {

      // var myHeaders = new Headers();
      // var bearer = "bearer "
      // // console.log("This is my bearer: ", bearer)
      // bearer += localStorage.getItem('token')
      // // console.log("This is my bearer: ", bearer)
      // myHeaders.append("Authorization", bearer);

      // var requestOptions = {
      //   method: 'GET',
      //   headers: myHeaders,
      //   redirect: 'follow'
      // };

      // var tomato = {
      //   "money": 0,
      //   "user__email": "",
      //   "user__username": "",
      // };
      

      
      // fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getuser/", requestOptions)
      // .then(response => response.json())
      // .then(function(result){
      //   // console.log("This is a result: ", result[0])
      //   // console.log("This is a map user: ", result[0].user__username)
      //   // console.log("This is a map email: ", result[0].user__email)
      //   // console.log("This is a username: ", result[0].getElementBy('user_username'))
      //   // console.log("This is a result: ", result[0].user_username)
      //   // tomato["user__username"] = result[0].user__username
      //   // tomato.money = result[0].money
      //   // tomato.user__email = result[0].user__email
      //   setUsername(result[0].user__username)
      //   setEmail(result[0].user__email)
      //   setMoney(result[0].money)

      //  } )
      // .catch(error => console.log('error', error));

    };



        function handleClick_Search2() {
          console.log("OpertionX");
          alert('Operation search');
          window.location.href = '/search';
      }

      function handleSubmit_search(event)
      {
        event.preventDefault();
          console.log("Submit happen");
          alert('A value was submitted: ');
          window.location.href = '/search';
      }
  

  return (

    <div className="App">
          {/* <div>BELLOW LAY YOUR TOKEN</div>
          <div> { localStorage.getItem('token') } </div>
          <div> This is the username: { username } </div>
          {
            handleUser()
            // console.log("Print stuff: ",value)
          } */}
      <header className="App-header">
        <div className="user_box">   
        {errors ==true?
        <div> You had gotten Logout, your account has expired</div>
        :
        <div>
        <div className="user_box2">
            <h2 className="user_text"> { username }  </h2>
            <div className="user_box4">
              <h3> Profile </h3>
              <p className="user_text2"> Name: {username}</p>
              <p className="user_text2"> Email: {email}</p>
              <p className="user_text2"> Deposit money: {money}</p>
            </div>
          </div>

          <div className="user_hole2"> </div>

          <div className="user_box2_1" > 
            <div className="user_box5">
              <h3> Your stocks </h3>
              <div> <Stocks /> </div>
            </div>
          </div>

          <div className="user_box2">
            <h2 className="user_text"> Search </h2>
              <img src={[search_p]} className="land_Icon" align='center' onClick={()=> handleClick_Search2()} alt="standard search button" />
              <p className="user_text"> --------- </p>
              <form className="user_Base" onSubmit={handleSubmit_search}>
                <input className="user_Base" type="text"  placeholder = "Seach ...."  name="name"  />
              </form>
          </div>


        </div>
        }
        
          
        </div>

      </header>
    </div>
              );
        // }
}

export default User;
