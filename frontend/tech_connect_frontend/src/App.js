import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './components/Footer';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Header from './components/Header';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching jobs from API...');
        const response = await axios.get('http://localhost:8000/job-postings/');
        console.log('Job data received:', response.data);
        setJobs(response.data); // Assuming the API directly returns an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home jobs={jobs} />} />
          <Route path="/jobs" element={<JobsPage jobs={jobs} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function JobsPage({ jobs }) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const jobType = searchParams.get('type');

  const filteredJobs = jobType
    ? jobs.filter((job) => job.type.toLowerCase() === jobType.toLowerCase())
    : jobs;

  return (
    <Container className="my-5">
      <Row>
        <Col>
         
          <Jobs jobs={filteredJobs} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;