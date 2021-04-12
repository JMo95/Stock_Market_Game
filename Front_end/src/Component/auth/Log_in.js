import React, { useState, useEffect } from 'react';

import "./../../css/Register2.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      console.log("this happen")
      window.location.replace('http://localhost:3000/');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    var userR = new FormData();
    userR.append("username", user);
    userR.append("password", password);

    var requestOptions = {
      method: 'POST',
      body: userR,
      redirect: 'follow'
    };

    fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/", requestOptions)
      // .then(response => response.text())
      .then(response => response.json())
      // .then(result => console.log("This is a token ", result.token))
      .then(function(result){
        if (result) {
          localStorage.clear();
          localStorage.setItem('token', result.token);
          console.log("The token is here " , typeof(result))
          console.log("The token here is a " , result.token)

          window.location.replace('http://localhost:3000/');
        } else {
          console.log("Else haopen")
          setEmail('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div className="App">
        <header className="App-header">
            <div className="reg_box">
            {loading === false && <h1 className="reg_text0"> Login </h1>}
            {errors === true && <h2 className="reg_text0">Cannot log in with provided credentials</h2>}
            {loading === false && (
                <form onSubmit={onSubmit}>
                    <div className="reg_box2">
                    <div className="reg_box3">
                      <div className="reg_text">User: </div>
                    </div>
                    <div className="reg_box3">
                {/* <label htmlFor='email'>Email address:</label>  */}
                        <br />
                            <input className="reg_Base2" name='user'
                                type='text' value={user}
                                required onChange={e => setUser(e.target.value)}
                            />{' '}
                        </div>
                    </div>
                    {/* <br /> */}

                    <div className="reg_box2">
                        <div className="reg_box3">
                        <div className="reg_text">Password: </div>
                        </div>
                        <div className="reg_box3">
                            {/* <label htmlFor='password'>Password:</label> <br /> */}
                            <input className="reg_Base2" 
                                name='password' type='password' value={password}
                                required onChange={e => setPassword(e.target.value)}
                            />{' '}
                        </div>
                    </div>
                {/* <br /> */}
                {user!='' && password!=''?
                    <button type="submit" className="btn btn-primary mb-5" > 
                            Submit 
                    </button> 
                    :
                    <div></div>
                 }
                {/* <input type='submit' value='Login' /> */}
                </form>
            )}
        </div>
      </header>
    </div>
  );
};

export default Login;