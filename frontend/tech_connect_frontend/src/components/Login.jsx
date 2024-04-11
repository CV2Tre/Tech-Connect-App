import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(false); // State for remember login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // Save remember login preference in localStorage if checked
        if (rememberLogin) {
          localStorage.setItem('remember_login', 'true');
        } else {
          localStorage.removeItem('remember_login');
        }

        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Check localStorage for remember login preference on component mount
  useEffect(() => {
    const rememberLoginPref = localStorage.getItem('remember_login');
    if (rememberLoginPref === 'true') {
      setRememberLogin(true);
    }
  }, []);

  return (
    <div style={{ margin: '40px auto', maxWidth: '400px', lineHeight: '1.6', fontSize: '18px', color: '#444', padding: '0 10px' }}>
      <Container fluid>
        <Row className="justify-content-center">
          <Col>
            <div
              className="login-form p-5 rounded shadow-lg"
              style={{
                backgroundColor: '#ffffff',
                color: '#444',
                borderRadius: '20px',
                width: '100%',
              }}
            >
              <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>
                Login
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername" className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control-lg rounded-pill mb-3"
                    style={{
                      backgroundColor: '#f1f3f5',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-lg rounded-pill mb-3"
                    style={{
                      backgroundColor: '#f1f3f5',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberLogin}
                    onChange={(e) => setRememberLogin(e.target.checked)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-lg rounded-pill px-5 mt-3"
                  style={{
                    backgroundColor: '#6c757d',
                    borderColor: '#6c757d',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    width: '100%',
                  }}
                >
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginComponent;
