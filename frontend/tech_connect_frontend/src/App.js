import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './components/Footer';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Header from './components/Header';
import LoginComponent from './components/Login';
import UserProfileComponent from './components/UserProfile';
import AdminJobPostings from './components/AdminJobPostings';
import EditJobPostings from './components/EditJobPosting'; // Import the EditJobPostings component
import CreateJobPosting from './components/CreateJobPosting';

function App() {
  const [jobs, setJobs] = useState([]);

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

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home jobs={jobs} />} />
          <Route path="/jobs" element={<JobsPage jobs={jobs} />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/profile" element={<UserProfileComponent />} />
          <Route path="/admin-job-postings" element={<AdminJobPostings />} />
          <Route path="/edit-job-posting/:id" element={<EditJobPostings />} /> {/* Route for EditJobPostings */}
          <Route path="/create-job-posting" element={<CreateJobPosting />} /> {/* Route for CreateJobPosting */}

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function JobsPage({ jobs }) {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Jobs jobs={jobs} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
