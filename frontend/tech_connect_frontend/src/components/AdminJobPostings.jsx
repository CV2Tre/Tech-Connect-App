import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import { Table, Button } from 'react-bootstrap';

const AdminJobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/job-postings/');
        setJobPostings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching job postings');
        console.error('Error fetching job postings:', error);
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/job-postings/${id}`);
      // Remove the deleted job posting from the state
      setJobPostings(jobPostings.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job posting:', error);
      setError('Failed to delete job posting');
    }
  };

  return (
    <div>
      <header>
        <Link to="/profile">Back</Link> {/* Link to go back to /profile */}
        <h2>Admin Job Postings</h2>
        <Link to="/create-job-posting">
          <Button variant="primary">Create Job Posting</Button>
        </Link>
      </header>
      {error && <div>Error: {error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Company Name</th>
              <th>Job Type</th>
              <th>Experience Levels</th>
              <th>Salary Range</th>
              <th>Categories</th>
              <th>Technologies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map((jobPosting) => (
              <tr key={jobPosting.id}>
                <td>{jobPosting.title}</td>
                <td>{jobPosting.description}</td>
                <td>{jobPosting.company_name}</td>
                <td>{jobPosting.job_type}</td>
                <td>{jobPosting.experience_levels.join(', ')}</td>
                <td>{jobPosting.salary_range}</td>
                <td>{jobPosting.categories.join(', ')}</td>
                <td>{jobPosting.technologies.join(', ')}</td>
                <td>
                  <Link to={`/edit-job-posting/${jobPosting.id}`}>Edit</Link>
                  <Button variant="danger" onClick={() => handleDelete(jobPosting.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminJobPostings;
