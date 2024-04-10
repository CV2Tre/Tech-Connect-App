import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const UserProfileComponent = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobPostings, setJobPostings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login');
    } else {
      fetchUserProfile(accessToken);
      fetchJobPostings(accessToken);
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

  const fetchJobPostings = async (accessToken) => {
    try {
      const response = await axios.get('http://localhost:8000/job-postings/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setJobPostings(response.data);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserProfile(null);
    navigate('/login');
  };

  return (
    <div style={{ margin: '40px auto', maxWidth: '650px', lineHeight: '1.6', fontSize: '20px', color: '#444', padding: '0 10px', fontFamily: 'Arial, sans-serif' }}>
      <Container className="py-5">
        <Row className="justify-content-center mb-4">
          <Col md={8}>
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
        </Row>

        {/* Add link to AdminJobPostings */}
        <Row className="justify-content-center mb-3">
          <Col md={8}>
            <Link to="/admin-job-postings" style={{ fontSize: '20px', color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Admin Job Postings</Link>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5" style={{ paddingBottom: '4rem' }}>
          <Col md={8}>
            {jobPostings.map((posting, index) => (
              <Card
                key={posting.id}
                className="mb-3"
                style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: '22px', fontWeight: 'bold' }}>{posting.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '18px', fontWeight: 'bold' }}>{posting.company_name}</Card.Subtitle>
                  <Card.Text style={{ fontSize: '18px' }}>{posting.job_type}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfileComponent;