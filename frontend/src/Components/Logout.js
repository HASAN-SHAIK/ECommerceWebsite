import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Logout.css';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <Container className="logout-container d-flex flex-column align-items-center justify-content-center">
      <div className="logout-card shadow-lg">
        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon mb-3" />
        <h2>Goodbye!</h2>
        <p className="text-center">We hope to see you back soon. You are successfully Logged Out</p>
        <Link to='/login'><Button variant="primary" className="logout-button">
          Log In
        </Button></Link>
      </div>
    </Container>
  );
};

export default Logout;