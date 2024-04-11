import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const categories = [
  { id: 'back-end', name: 'Back-End', color: '#90EE90' },
  { id: 'front-end', name: 'Front-End', color: '#ADD8E6' },
  { id: 'full-stack', name: 'Full Stack', color: '#FFA07A' },
];

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/job-postings/');
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
      <main style={{ marginBottom: '100px' }}>
        
      
        <Row className="justify-content-center mt-4">
          {categories.map((category, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4">
              <Link to={`/jobs?category=${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card
                  style={{
                    border: `2px solid ${category.color}`,
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    backgroundColor: category.color,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCardClick(category.id)}
                >
                  <Card.Body>
                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{category.name}</Card.Title>
                    <Card.Text style={{ fontSize: '1.2rem' }}>Discover {category.name} opportunities</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </main>
    </Container>
  );
}

export default Home;
