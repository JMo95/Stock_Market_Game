import React, { useState, useEffect } from 'react';

import "./../../css/Register.css"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      // window.location.replace('http://localhost:3000/');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2
    };

    fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          window.location.replace('http://localhost:3000/');
        } else {
          setEmail('');
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        }
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
                                <div className="reg_text">UserName: </div>
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