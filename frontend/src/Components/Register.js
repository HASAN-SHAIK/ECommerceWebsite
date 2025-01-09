import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';
import { Circles } from 'react-loading-icons';

const Register = ({handleRegister,errorMessage}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    const formdata = new FormData();
    formdata.append('api_key','336613869639273');
    formdata.append('file',file);
    formdata.append('public_id',name+email);
    formdata.append('timestamp','1315060510');
    formdata.append('upload_preset','xbcujwvd');
    setLoading(true);
    try{
      const response = await axios.post('https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload',
        formdata
      );
      const image = response.data.url;
      console.log(image);
      handleRegister(name,email,password,image);
    }
    catch(err){
      console.error("Error", err);
    }
    setLoading(false);
  } 

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <Form className="register-form" onSubmit={(e)=>handleSubmit(e)}>
          <h2 className="register-heading">Register</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <div class="">
            {/* <label for="formFile" class="form-label">Default file input example</label> */}
            <input class="form-control" type="file" id="formFile" accept='.jpg, .png' onChange={(e)=>setFile(e.target.files[0])} />
          </div>
          <Button type="submit" className="register-button animate">
            {loading? <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                      :"Register"}
          </Button>
          <Button variant="link" onClick={handleLoginClick} className="login-link animate">
            Already have an account? Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;