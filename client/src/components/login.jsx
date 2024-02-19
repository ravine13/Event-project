import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({ onSwitchToSignUp }) => {
  const [usermail, setUsermail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login clicked');
    
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        usermail,
        password,
      });

      console.log('Login successful:', response.data);

    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="log-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="Email">Email:</label>
        <input
          type="text"
          id="email"
          value={usermail}
          onChange={(e) => setUsermail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={onSwitchToSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onSwitchToSignUp: PropTypes.func.isRequired,
};

export default Login;