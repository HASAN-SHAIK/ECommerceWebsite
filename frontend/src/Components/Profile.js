import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = ({handleLogout}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
      console.log(JSON.parse(user));
    } else {
      navigate('/login');
    }
  }, [navigate]);


  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='profile-container mt-5 '>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} className='user-profile-card'>
          <div className='bg-light d-flex justify-content-center align-items-center text-center shadow h-100 border-0 rounded'>
            <Card.Body>
              <Card.Title className='display-6 text-dark'><h1>My Profile</h1></Card.Title>
              <Card.Img
                variant='top'
                src= {userInfo.image? userInfo.image: 'https://via.placeholder.com/150'}
                alt='User Profile'
                className='rounded-circle m-4 text-dark'
                style={{ width: '150px', height: '150px' }}
              />
              <Card.Text className='m-3'>
              <h2><strong>{userInfo.name}</strong>  </h2>
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {userInfo.email}
              </Card.Text>
              <Card.Text>
                <strong>Joined on:</strong> {userInfo.date.slice(0,10)}
              </Card.Text>
              <Button variant='danger m-4' onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

