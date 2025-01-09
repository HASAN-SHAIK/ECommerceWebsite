import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({setUser, setLoggedIn, handleRegister }) => {
  const [email, setEmail] = useState('');
  const [loginType, setLoginType] = useState(true);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(true);
  const navigate = useNavigate();
  const handleLogin = async(email, password) => {
    try {
      const {data} = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });
      sessionStorage.setItem('userInfo', JSON.stringify(data));
      if (sessionStorage.userInfo) {
        navigate('/');
        setLoggedIn(true);
        setUser(1);
      }
    } catch (error) {
      setLoginSuccess(false);
      console.error('Error:', error.response);
    }
    setLoading(false);
  }
  const handleAdminLogin = async(email, password) => {
    try {
      const {data} = await axios.post('http://localhost:8080/api/admin/login', {
        email,
        password,
      });
      sessionStorage.setItem('userInfo', JSON.stringify(data));
      if (sessionStorage.userInfo) {
        navigate('/admin');
        setUser(0);
        setLoggedIn(true);
      }
    } catch (error) {
      setLoginSuccess(false);
      console.error('Error:', error.response);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    handleLogin(email, password);
  };
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    handleAdminLogin(email, password);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };
  const handleLoginType = () => {
    setLoginType(!loginType);
  }

  const onSignIn = async(googleUser) => {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  await handleRegister(profile.getName(),profile.getEmail(),profile.getName(),profile.getImageUrl());
  await handleLogin(profile.getEmail(),profile.getName())
  console.log("happended");
}

  return (
    <div className="login-container">
    { loginType ?
      <div className="login-card">
        <div className="login-form">
          {/* <h2 className='text-center'>Login to Your Account</h2> */}
          <h2 className='bg-light text-dark p-3 rounded text-center'>User Login Page</h2>

          {/* <p>Login using social networks</p> */}
          <div className="social-icons mt-3">
          <div class="g-signin2" data-onsuccess="onSignIn">Sign In</div>
              
          </div>
          <Form onSubmit={handleSubmit}>
            {/* <h3 className='bg-dark text-light p-3 rounded text-center'>User Login Page</h3> */}
            {!loginSuccess && <div className="error-message">Recheck your credentials!</div>}
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {
              loading? <div className='login-button text-center'>
              <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                      </div></div> :
            <Button type="submit" className="login-button">
              Sign In
            </Button>
            }
          <div className='btn btn-danger text-center mt-3' onClick={handleLoginType}>Click for Admin Login</div>

          </Form>
        </div>
        <div className="signup-section">
          <h3>New Here?</h3>
          <p>Sign up and discover a great amount of new opportunities!</p>
          <Button onClick={handleRegisterClick} className="signup-button">
            Sign Up
          </Button>
        </div>
      </div>
      :
      <div className="admin-login-card">
        <div className="login-form">
          {/* <h2 className='text-center'>Login to Your Account</h2> */}
          {/* <p>Login using social networks</p> */}
          <h2 className='bg-light text-dark p-3 rounded text-center'>Admin Login Page</h2>

          <div className="social-icons mt-3">
          <div class="g-signin2" data-onsuccess="onSignIn">Sign In</div>
              
          </div>
          <Form onSubmit={handleAdminSubmit}>
            {!loginSuccess && <div className="error-message">Recheck your credentials!</div>}
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="login-button">
              Sign In
            </Button>
          <div className='btn btn-primary text-center mt-3' onClick={handleLoginType}>Click for User Login</div>
          </Form>
        </div>
        <div className="signup-section">
          <h3>New Here?</h3>
          <p>Sign up and discover a great amount of new opportunities!</p>
          <Button onClick={handleRegisterClick} className="signup-button">
            Sign Up
          </Button>
        </div>
      </div>
    }
    </div>
  );
};

export default Login;