import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    const user = {
      email: email,
      password: password
    };

    fetch('http://127.0.0.1:8000/api/v1/users/auth/login/', {
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
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
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
                      <div className="reg_text">Email: </div>
                    </div>
                    <div className="reg_box3">
                {/* <label htmlFor='email'>Email address:</label>  */}
                        <br />
                            <input className="reg_Base2" name='email'
                                type='email' value={email}
                                required onChange={e => setEmail(e.target.value)}
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
                {email!='' && password!=''?
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