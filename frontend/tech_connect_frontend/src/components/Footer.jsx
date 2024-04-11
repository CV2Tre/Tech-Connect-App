import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer
      className="footer mt-auto py-3"
      style={{
        backgroundColor: '#f2f2f2',
        color: '#333',
        position: 'fixed',
        bottom: '0',
        width: '100%',
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Tech Connect App. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;