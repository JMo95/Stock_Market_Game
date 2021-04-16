

import React, { useState, useEffect, Fragment } from 'react';

const Logout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      window.location.replace('http://localhost:3000/');
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = e => {
    e.preventDefault();

        console.log(localStorage.getItem('token'));
        localStorage.clear();
        window.location.replace('http://localhost:3000/auth/Log_in/');
      // });
  };

  

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>Are you sure you want to logout?</h1>
          <input type='button' value='Logout' onClick={handleLogout} />
          <div className='hole'></div>
          {/* <div>BELLOW LAY YOUR TOKEN</div>
          <div> { localStorage.getItem('token') } </div> */}
        </Fragment>
      )}
    </div>
  );
};

export default Logout;