import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Jobs from './components/Jobs';

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
      <div className="App">
        <Container>
          <main>
            <h2 className="my-4">Tech Connect App</h2>

            <Jobs jobs={jobs} />
          </main>
        </Container>
      </div>
    </Router>
  );
}

export default App;