import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const CreateJobPosting = () => {
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [e.target.name]: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/job-postings/', formData);
      alert('Job posting created successfully!');
      setFormData({
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
    } catch (error) {
      console.error('Error creating job posting:', error);
      alert('Failed to create job posting. Please try again.');
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh', paddingBottom: '10vh' }}>
      <div style={{ width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px' }}>Create Job Posting</h2>
        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Form fields */}
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleInputChange} style={{ width: '100%' }} />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleInputChange} style={{ width: '100%' }} />
          </Form.Group>
          <Form.Group controlId="formCompanyName" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter company name" name="company_name" value={formData.company_name} onChange={handleInputChange} style={{ width: '100%' }} />
          </Form.Group>
          <Form.Group controlId="formJobType" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Job Type</Form.Label>
            <Form.Control type="text" placeholder="Enter job type" name="job_type" value={formData.job_type} onChange={handleInputChange} style={{ width: '100%' }} />
          </Form.Group>
          <Form.Group controlId="formSalaryRange" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Salary Range</Form.Label>
            <Form.Control type="text" placeholder="Enter salary range" name="salary_range" value={formData.salary_range} onChange={handleInputChange} style={{ width: '100%' }} />
          </Form.Group>
          <Form.Group controlId="formPostedDate" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Posted Date</Form.Label>
            <Form.Control type="date" name="posted_date" value={formData.posted_date} onChange={handleInputChange} style={{ width: '100%' }} />
          </Form.Group>
          <Form.Group controlId="formExperienceLevels" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Experience Levels</Form.Label>
            <Form.Control as="select" multiple name="experience_levels" value={formData.experience_levels} onChange={handleMultiSelectChange} style={{ width: '100%' }}>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Junior">Junior</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formCategories" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Categories</Form.Label>
            <Form.Control as="select" multiple name="categories" value={formData.categories} onChange={handleMultiSelectChange} style={{ width: '100%' }}>
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
              <option value="Full-Stack">Full-Stack</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTechnologies" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Technologies</Form.Label>
            <Form.Control as="select" multiple name="technologies" value={formData.technologies} onChange={handleMultiSelectChange} style={{ width: '100%' }}>
              <option value="Bootstrap">Bootstrap</option>
              <option value="HTML 5">HTML 5</option>
              <option value="NPM">NPM</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
              <option value="jQuery">jQuery</option>
              <option value="Ember.js">Ember.js</option>
              <option value="Svelte">Svelte</option>
              <option value="Angular">Angular</option>
              <option value="Backbone.js">Backbone.js</option>
              <option value="Vue.js">Vue.js</option>
              <option value="Apache">Apache</option>
              <option value="PHP">PHP</option>
              <option value="Django">Django</option>
              <option value="MongoDB">MongoDB</option>
              <option value="Laravel">Laravel</option>
              <option value="Python">Python</option>
              <option value="React Native">React Native</option>
              <option value="NodeJS">NodeJS</option>
            </Form.Control>
          </Form.Group>
          {/* Add other form fields for experience levels, categories, and technologies as needed */}
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Create
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default CreateJobPosting;
