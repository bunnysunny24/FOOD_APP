import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const credentials = {
    collector: { username: 'collector', password: 'collect123' },
    provider: { username: 'provider', password: 'provide123' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === credentials.collector.username && password === credentials.collector.password) {
      localStorage.setItem('userType', 'collector'); // Save the user type to localStorage
      navigate('/collector-dashboard');
    } else if (username === credentials.provider.username && password === credentials.provider.password) {
      localStorage.setItem('userType', 'provider'); // Save the user type to localStorage
      navigate('/provider-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <h2>Login to Food Service App</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
