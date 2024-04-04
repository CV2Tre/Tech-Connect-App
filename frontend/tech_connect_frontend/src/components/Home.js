import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Jobs from './components/Jobs';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching jobs from API...');
        const response = await axios.get('http://localhost:8000/job-postings/');
        console.log('Job data received:', response.data);
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container>
      <main>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20vh',
            marginBottom: '2rem',
          }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Tech Connect</h1>
          <p style={{ fontSize: '1.5rem', color: '#666' }}>
            Find your next tech job opportunity
          </p>
        </div>
        <Jobs jobs={filteredJobs} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px' }}>
            <div>
              <Card
                style={{
                  width: '250px',
                  height: '250px',
                  border: '2px solid #ADD8E6',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#ADD8E6',
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title>Example 1</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  width: '250px',
                  height: '250px',
                  border: '2px solid #90EE90',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#90EE90',
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title>Example 2</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  width: '250px',
                  height: '250px',
                  border: '2px solid #FFA07A',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#FFA07A',
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title>Example 3</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default