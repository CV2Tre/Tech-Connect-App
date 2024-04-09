import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminJobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    job_type: '',
    experience_levels: [],
    salary_range: '',
    posted_date: '',
    categories: [],
    technologies: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/job-postings/');
      setJobPostings(response.data);
    } catch (error) {
      setError('Error fetching job postings');
      console.error('Error fetching job postings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e, fieldName) => {
    const options = Array.from(e.target.options);
    const selectedValues = options.filter((option) => option.selected).map((option) => option.value);
    setFormData({ ...formData, [fieldName]: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/job-postings/${editingId}/`, formData);
      } else {
        await axios.post('http://localhost:8000/job-postings/', formData);
      }
      setFormData({
        title: '',
        description: '',
        company_name: '',
        job_type: '',
        experience_levels: [],
        salary_range: '',
        posted_date: '',
        categories: [],
        technologies: [],
      });
      setEditingId(null);
      fetchJobPostings();
    } catch (error) {
      setError('Error submitting job posting');
      console.error('Error:', error);
    }
  };

  const handleEdit = (id) => {
    const selectedJobPosting = jobPostings.find((jobPosting) => jobPosting.id === id);
    setFormData(selectedJobPosting);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/job-postings/${id}/`);
      fetchJobPostings();
    } catch (error) {
      setError('Error deleting job posting');
      console.error('Error:', error);
    }
  };

  return (
    <Container style={{ marginTop: '40px', paddingBottom: '10%' }}>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/profile" className="text-decoration-none">
          <div className="d-flex align-items-center">
            <img src="user-avatar.png" alt="User Avatar" className="rounded-circle mr-2" width="32" height="32" />
            <span>Back to Profile</span>
          </div>
        </Link>
        <h1>Admin Job Postings</h1>
      </header>
      {error && <div>Error: {error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formCompanyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" name="company_name" value={formData.company_name} onChange={handleInputChange} placeholder="Company Name" />
                </Form.Group>
                <Form.Group as={Col} controlId="formJobType">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control type="text" name="job_type" value={formData.job_type} onChange={handleInputChange} placeholder="Job Type" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formExperienceLevels">
                  <Form.Label>Experience Levels</Form.Label>
                  <Form.Control as="select" multiple name="experience_levels" value={formData.experience_levels} onChange={(e) => handleMultiSelectChange(e, 'experience_levels')}>
                    <option value="Junior">Junior</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formSalaryRange">
                  <Form.Label>Salary Range</Form.Label>
                  <Form.Control type="text" name="salary_range" value={formData.salary_range} onChange={handleInputChange} placeholder="Salary Range" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formPostedDate">
                  <Form.Label>Posted Date</Form.Label>
                  <Form.Control type="date" name="posted_date" value={formData.posted_date} onChange={handleInputChange} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formCategories">
                  <Form.Label>Categories</Form.Label>
                  <Form.Control as="select" multiple name="categories" value={formData.categories} onChange={(e) => handleMultiSelectChange(e, 'categories')}>
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="Full-Stack">Full-Stack</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formTechnologies">
                  <Form.Label>Technologies</Form.Label>
                  <Form.Control as="select" multiple name="technologies" value={formData.technologies} onChange={(e) => handleMultiSelectChange(e, 'technologies')}>
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
              </Row>
              <Button variant="primary" type="submit">{editingId ? 'Update' : 'Create'}</Button>
            </Form>
            <div className="mb-3">Displaying {jobPostings.length} number of editable job postings.</div>
            <ul style={{ listStyleType: 'none' }}>
              {jobPostings.map((jobPosting) => (
                <li key={jobPosting.id} style={{ marginBottom: '15px' }}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{jobPosting.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{jobPosting.company_name}</Card.Subtitle>
                      <Button variant="info" onClick={() => handleEdit(jobPosting.id)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDelete(jobPosting.id)}>Delete</Button>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminJobPostings;
