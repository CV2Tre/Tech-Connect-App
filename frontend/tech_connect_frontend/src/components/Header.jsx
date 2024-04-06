// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Header() {
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
         
        </div>
      </main>
    </Container>
  );
}

export default Header;