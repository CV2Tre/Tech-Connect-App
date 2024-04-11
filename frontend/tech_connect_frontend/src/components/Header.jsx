// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './Navigation';
function Header() {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/jobs?category=${category}`);
  };

  return (
    <Container>
      <Navigation />
      <main>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20vh',
            marginBottom: '2rem',
          }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Tech Connect</h1>
          <p style={{ fontSize: '1.5rem', color: '#666' }}>
            Find your next tech job opportunity
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* You can add your other components here */}
        </div>
      </main>
    </Container>
  );
}

export default Header;
