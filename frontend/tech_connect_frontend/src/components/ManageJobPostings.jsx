import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';

const ManageJobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [experienceLevels, setExperienceLevels] = useState([]);

  useEffect(() => {
    fetchJobPostings();
    fetchExperienceLevels(); // Fetch experience levels on component mount
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/job-postings/');
      setJobPostings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      setError('Error fetching job postings');
      setLoading(false);
    }
  };

  const fetchExperienceLevels = async () => {
    try {
      const response = await axios.get('http://localhost:8000/experience-levels/');
      setExperienceLevels(response.data); // Store fetched experience levels in state
    } catch (error) {
      console.error('Error fetching experience levels:', error);
      // Handle error fetching experience levels
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/job-postings/${id}/`);
      setJobPostings(jobPostings.filter(job => job.id !== id));
      alert('Job posting deleted successfully.');
    } catch (error) {
      console.error('Error deleting job posting:', error);
      setError('Failed to delete job posting');
      alert('Failed to delete job posting. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/profile">Back</Link>
        <h2 className="mb-0">Manage Job Postings</h2>
        <div>
          <div className="me-3">
            <Link to="/create-job-posting">
              <Button variant="primary">Create Job Posting</Button>
            </Link>
          </div>
          <Button variant="info" onClick={fetchJobPostings}>Refresh Job Postings</Button>
        </div>
      </header>

      {error && <div className="alert alert-danger">Error: {error}</div>}

      <div className="table-responsive" style={{ marginBottom: '30px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Company Name</th>
              <th>Experience Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map((jobPosting) => (
              <tr key={jobPosting.id}>
                <td>{jobPosting.id}</td>
                <td>{jobPosting.title}</td>
                <td>{jobPosting.description}</td>
                <td>{jobPosting.company_name}</td>
                <td>
                  {jobPosting.experience_levels.map((levelId, index) => {
                    const level = experienceLevels.find(l => l.id === levelId);
                    return (
                      <span key={index}>{level ? level.name : ''}{index !== jobPosting.experience_levels.length - 1 ? ', ' : ''}</span>
                    );
                  })}
                </td>
                <td className="text-end">
                  <Link to={`/edit-job-posting/${jobPosting.id}`} className="me-2">
                    Edit
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(jobPosting.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ManageJobPostings;
