import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const EditJobPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
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
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/job-postings/${id}/`);
        const jobPosting = response.data;

        const selectedExperienceLevels = jobPosting.experience_levels.map(level => level.id);
        const selectedCategories = jobPosting.categories.map(category => category.id);

        setFormData({
          id: jobPosting.id,
          title: jobPosting.title,
          description: jobPosting.description,
          company_name: jobPosting.company_name,
          job_type: jobPosting.job_type,
          salary_range: jobPosting.salary_range,
          posted_date: jobPosting.posted_date,
          experience_levels: selectedExperienceLevels,
          categories: selectedCategories,
          technologies: jobPosting.technologies.map(tech => tech.name),
        });

        setError('');
      } catch (error) {
        console.error('Error fetching job posting:', error);
        setError('Failed to fetch job posting');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories/');
        setCategoryOptions(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchExperienceLevels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/experience-levels/');
        setExperienceLevels(response.data);
      } catch (error) {
        console.error('Error fetching experience levels:', error);
      }
    };

    fetchJobPosting();
    fetchCategories();
    fetchExperienceLevels();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value))
      .filter(Boolean); // Filter out falsy values (e.g., None)

    setFormData({ ...formData, [e.target.name]: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.categories.length === 0 || formData.experience_levels.length === 0) {
      setError('Please select at least one category and one experience level.');
      return;
    }

    try {
      const { id, ...updatedData } = formData;
      await axios.put(`http://localhost:8000/job-postings/${id}/`, updatedData);
      setSuccess('Job posting updated successfully');
      setError('');
      alert('Job posting updated successfully!');
      navigate('/admin-job-postings/');
    } catch (error) {
      console.error('Error updating job posting:', error);
      setError('Failed to update job posting');
      setSuccess('');
      alert('Failed to update job posting. Please try again.');
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', paddingBottom: '10vh', paddingTop: '30px' }}>
      <div style={{ width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '50px' }}>
        <h2 style={{ marginBottom: '20px' }}>Update Job Posting</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formCompanyName" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter company name" name="company_name" value={formData.company_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formJobType" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Job Type</Form.Label>
            <Form.Control type="text" placeholder="Enter job type" name="job_type" value={formData.job_type} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formSalaryRange" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Salary Range</Form.Label>
            <Form.Control type="text" placeholder="Enter salary range" name="salary_range" value={formData.salary_range} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPostedDate" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Posted Date</Form.Label>
            <Form.Control type="date" name="posted_date" value={formData.posted_date} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formExperienceLevels" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Experience Levels</Form.Label>
            <Form.Control as="select" multiple name="experience_levels" value={formData.experience_levels} onChange={handleMultiSelectChange}>
              {experienceLevels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formCategories" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Categories</Form.Label>
            <Form.Control as="select" multiple name="categories" value={formData.categories} onChange={handleMultiSelectChange}>
              {categoryOptions.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTechnologies" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Technologies</Form.Label>
            <Form.Control type="text" placeholder="Enter technologies" name="technologies" value={formData.technologies} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Update
          </Button>
          <Button variant="secondary" onClick={() => navigate('/admin-job-postings/')} style={{ marginTop: '10px', width: '100%' }}>
            Cancel
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditJobPosting;
