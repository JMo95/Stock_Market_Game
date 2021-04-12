import React, { useState, useEffect } from 'react';

import "./../../css/Register2.css"

import "./../../css/Register.css"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    var FormData = require('form-data');
    var userR2 = new FormData();
    userR2.append('user', user);
    userR2.append('email', email);
    userR2.append('password', password1);


    var requestOptions = {
      method: 'POST',
      body: userR2,
      redirect: 'follow'
    };

      fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/register/", requestOptions)
      // .then(res => res.json())
      .then(function(response) {
          if(response.ok)
          {
            console.log(response.text())
            return 0
          }
          throw new Error ("Something went wrong")
      }
      )
      // => console.log(response.text()))
      .then(data => {
          window.location.replace('http://localhost:3000/')
        }
      )
      .catch(function(error)
      {
        console.log("else happen")
          setUser('');
          setEmail('');
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        console.log('Request Failed', error)
      });
  };

  return (
    <div className="App">
          <header className="App-header">
          <div className="reg_box">
                {loading === false && <h1 className="reg_text0" >Signup</h1>}
                {errors === true && <h2 className="reg_text0" >Cannot signup with provided credentials</h2>}
                <form onSubmit={onSubmit}>
                        {/* <label htmlFor='email'>Email address:</label> <br /> */}
                        <div className="reg_box2">
                            <div className="reg_box3">
                                <div className="reg_text">Username: </div>
                            </div>
                            <div className="reg_box3">
                                <input className="reg_Base2" name='user'
                                        type='user' value={user}
                                    onChange={e => setUser(e.target.value)} required />{' '}
                            </div>
                        </div>


                        {/* <label htmlFor='email'>Email address:</label> <br /> */}
                        <div className="reg_box2">
                            <div className="reg_box3">
                                <div className="reg_text">Email: </div>
                            </div>
                            <div className="reg_box3">
                                <input className="reg_Base2" name='email'
                                        type='email' value={email}
                                    onChange={e => setEmail(e.target.value)} required />{' '}
                            </div>
                        </div>

                        <br />
                        {/* <label htmlFor='password1'>Password:</label> <br /> */}
                        <div className="reg_box2">
                            <div className="reg_box3">
                                <div className="reg_text">Password: </div>
                            </div>
                            <div className="reg_box3">
                                <input  className="reg_Base2" name='password1'
                                        type='password' value={password1}
                                        onChange={e => setPassword1(e.target.value)} required />{' '}
                            </div>
                        </div>
                        <br />
                        {/* <label htmlFor='password2'>Confirm password:</label> <br /> */}


                        <div className="reg_box2">
                            <div className="reg_box3">
                                <div className="reg_text">Confirm Pass: </div>
                            </div>
                            <div className="reg_box3">
                                <input className="reg_Base2" name='password2'
                                        type='password'  value={password2}
                                        onChange={e => setPassword2(e.target.value)} required />{' '}
                            </div>
                    </div>

                    <br />
                    <input type='submit' value='Signup' />
                </form>
            </div>
      </header>
    </div>
  );
};

export default Signup;