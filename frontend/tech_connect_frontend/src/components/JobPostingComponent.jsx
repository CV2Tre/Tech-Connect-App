import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container } from 'react-bootstrap';

const JobPostingComponent = () => {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/job-postings/');
        setJobPostings(response.data);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    fetchJobPostings();
  }, []);

  return (
    <Container className="my-5" style={{ paddingBottom: '30vh' }}> {/* Added style for padding */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {jobPostings.map((posting) => (
          <Col key={posting.id}>
            <Card>
              <Card.Body>
                <Card.Title>{posting.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{posting.company_name}</Card.Subtitle>
                <Card.Text>{posting.description}</Card.Text>
                <Card.Text>Job Type: {posting.job_type}</Card.Text>
                <Card.Text>Salary Range: {posting.salary_range}</Card.Text>
                <Card.Text>Posted Date: {new Date(posting.posted_date).toLocaleDateString()}</Card.Text>
                <Card.Text>
                  Experience Levels: {posting.experience_levels.map((level) => level.name).join(', ')}
                </Card.Text>
                <Card.Text>Categories: {posting.categories.map((category) => category.name).join(', ')}</Card.Text>
                <Card.Text>Technologies: {posting.technologies.map((tech) => tech.name).join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobPostingComponent;
