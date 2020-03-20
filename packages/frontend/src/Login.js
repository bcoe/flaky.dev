import React from 'react';
import Notification from './Notification';

import './css/Login.css';

function Login() {
  return (
    <div className="Login">
      <Notification />
      <div className="content">
        This is the content of my login screen.
      </div>
    </div>
  );
}

export default Login;
