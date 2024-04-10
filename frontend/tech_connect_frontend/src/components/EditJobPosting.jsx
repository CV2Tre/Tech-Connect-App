import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EditJobPosting = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    job_type: '',
    salary_range: '',
    posted_date: '',
    experience_levels: [],
    categories: [],
    technologies: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/job-postings/${id}`);
        const jobPosting = response.data;
        setFormData({
          title: jobPosting.title,
          description: jobPosting.description,
          company_name: jobPosting.company_name,
          job_type: jobPosting.job_type,
          salary_range: jobPosting.salary_range,
          posted_date: jobPosting.posted_date,
          experience_levels: jobPosting.experience_levels.map(level => level.name),
          categories: jobPosting.categories.map(category => category.name),
          technologies: jobPosting.technologies.map(tech => tech.name),
        });
        setError('');
      } catch (error) {
        console.error('Error fetching job posting:', error);
        setError('Failed to fetch job posting');
      }
    };

    fetchJobPosting();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add axios request to update job posting
      // Assuming you have a function to update the job posting
      await axios.put(`http://localhost:8000/edit-job-posting/${id}`, formData);
      setSuccess('Job posting updated successfully');
      setError('');
    } catch (error) {
      console.error('Error updating job posting:', error);
      setError('Failed to update job posting');
      setSuccess('');
    }
  };

  return (
    <div>
      <header>
        <Link to="/admin-job-postings/">Back</Link> {/* Link to go back to /profile */}
        <h2>Edit Job Posting</h2>
      </header>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        {/* Add more input fields for other fields */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditJobPosting;
