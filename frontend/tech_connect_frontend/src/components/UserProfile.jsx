import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const UserProfileComponent = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login');
    } else {
      fetchUserProfile(accessToken);
    }
  }, [navigate]);

  const fetchUserProfile = async (accessToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/profile/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserProfile(null);
    navigate('/login');
  };

  return (
    <div style={{ margin: '40px auto', lineHeight: '1.6', fontSize: '20px', color: '#444', padding: '0 10px', fontFamily: 'Arial, sans-serif' }}>
      <Container className="py-5">
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Header style={{ fontSize: '24px', fontWeight: 'bold' }}>
                <h2>User Profile</h2>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div>Loading User Profile...</div>
                ) : userProfile ? (
                  <>
                    <p><strong>Username:</strong> {userProfile.username}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                  </>
                ) : (
                  <p>User profile not available.</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Row className="mb-3">
              <Col>
                <Link to="/manage-job-postings" style={{ fontSize: '20px', color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Manage Job Postings</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfileComponent;
