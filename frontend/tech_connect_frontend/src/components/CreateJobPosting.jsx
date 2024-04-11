import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CreateJobPosting = ({ jobId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    job_type: '',
    salary_range: '',
    posted_date: '',
    experience_level: '',
    categories: [],
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:8000/categories/');
        setCategories(categoryResponse.data);

        if (jobId) {
          const jobResponse = await axios.get(`http://localhost:8000/job-postings/${jobId}/`);
          const { title, description, company_name, job_type, salary_range, posted_date, experience_level, categories } = jobResponse.data;
          setFormData({
            title,
            description,
            company_name,
            job_type,
            salary_range,
            posted_date,
            experience_level,
            categories: categories.map(category => category.id),
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setFormData({ ...formData, categories: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (jobId) {
        await axios.put(`http://localhost:8000/job-postings/${jobId}/`, formData);
      } else {
        await axios.post('http://localhost:8000/job-postings/', formData);
      }
      alert('Job posting saved successfully!');
      navigate('/admin-job-postings'); // Redirect to admin job postings
    } catch (error) {
      console.error('Error saving job posting:', error);
      setError('Failed to save job posting');
      alert('Failed to save job posting. Please try again.');
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px' }}>
      <Link to="/manage-job-postings" style={{ marginBottom: '20px' }}>Back</Link>
      <div style={{ width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '50px' }}>
        <h2 style={{ marginBottom: '20px' }}>{jobId ? 'Edit Job Posting' : 'Create Job Posting'}</h2>
        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter company name" name="company_name" value={formData.company_name} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formJobType">
            <Form.Label>Job Type</Form.Label>
            <Form.Control type="text" placeholder="Enter job type" name="job_type" value={formData.job_type} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSalaryRange">
            <Form.Label>Salary Range</Form.Label>
            <Form.Control type="text" placeholder="Enter salary range" name="salary_range" value={formData.salary_range} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostedDate">
            <Form.Label>Posted Date</Form.Label>
            <Form.Control type="date" name="posted_date" value={formData.posted_date} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formExperienceLevel">
            <Form.Label>Experience Level</Form.Label>
            <Form.Control as="select" name="experience_level" value={formData.experience_level} onChange={handleInputChange}>
              <option value="">Select Experience Level</option>
              <option value="1">Junior</option>
              <option value="2">Mid-Level</option>
              <option value="3">Senior</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategories">
            <Form.Label>Categories</Form.Label>
            <Form.Control as="select" multiple name="categories" value={formData.categories} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {jobId ? 'Save Changes' : 'Create Job Posting'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default CreateJobPosting;
