import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLoginSuccess(email);
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Quick Quizzer</h1>
      <div className="auth-buttons">
        <Link to="/register" className="register-btn">Register</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
      <div className="login-form">
        <h2>- Welcome Back -</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password :</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="show-password">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show Password
            </label>
          </div>
          <button type="submit" className="login-submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 