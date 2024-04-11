import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function TechConnectForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      category: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formTechName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formTechDescription">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formTechCategory">
        <Form.Label column sm="2">
          Category
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Submit</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default TechConnectForm;
