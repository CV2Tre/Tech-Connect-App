// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching jobs from API...');
        const response = await axios.get('http://localhost:8000/job-postings/');
        console.log('Job data received:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleCardClick = (category) => {
    navigate(`/jobs?category=${category}`);
  };

  return (
    <Container>
      <main>
    
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px' }}>
            <div onClick={() => handleCardClick('back-end')}>
              <Card
                style={{
                  width: '250px',
                  height: '250px',
                  border: '2px solid #90EE90',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#90EE90',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Back-End</Card.Title>
                  <Card.Text style={{ fontSize: '1.2rem' }}>
                    Discover rewarding back-end development roles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div onClick={() => handleCardClick('front-end')}>
              <Card
                style={{
                  width: '250px',
                  height: '250px',
                  border: '2px solid #ADD8E6',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#ADD8E6',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Front-End</Card.Title>
                  <Card.Text style={{ fontSize: '1.2rem' }}>
                    Explore exciting front-end development opportunities.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div onClick={() => handleCardClick('full-stack')}>
              <Card
                style={{
                  width: '250px',
                  height: '250px',
                  border: '2px solid #FFA07A',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#FFA07A',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Full Stack</Card.Title>
                  <Card.Text style={{ fontSize: '1.2rem' }}>
                    Explore versatile full-stack development opportunities.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default Home;