import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = ({ socket }) => {
  const navigate = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    if (username.trim() && password.trim()) {
      e.preventDefault();
      socket.emit('login', { username, password });
      setPassword('');
      setUsername('');
    }
  };

  useEffect(() => {
    socket.on('loginSuccess', (data) => {
      console.log(data.message);
      localStorage.setItem('_myEmail', data.user._email);
      navigate.push('/photos');
    });
    socket.on('loginError', (error) => {
      console.log(error);
    });
  }, [socket, navigate]);

  return (
    <div className="login">
      <h2 style={{ marginBottom: '30px' }}>Login</h2>
      <form className="login__form" onSubmit={handleSignIn}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="input"
          name="username"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input"
          name="password"
          id="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn">LOG IN</button>
        <p style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link className="link" to="/register">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
