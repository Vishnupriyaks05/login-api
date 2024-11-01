// src/components/Home.tsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <h1>Welcome to User Management System</h1>
      <p>Please login or register to continue.</p>
      <Link to="/login">
        <Button variant="primary" className="me-2">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="secondary">Register</Button>
      </Link>
    </Container>
  );
};

export default Home;
