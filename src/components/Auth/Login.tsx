// src/components/Auth/Login.tsx
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';
import { LoginResponse } from '../../types/apiTypes';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response: LoginResponse = await loginUser(credentials);
        localStorage.setItem('token', response.accessToken);

        dispatch(setUser(response.user)); // Dispatch user details to Redux
        console.log('Login response:', response);
        alert('Login successful!');
        navigate('/users');
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed!');
    }
};


  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
