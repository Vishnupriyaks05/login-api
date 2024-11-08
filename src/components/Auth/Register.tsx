import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/api';
import { setUser } from '../../features/userSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      
      // Assuming response contains the new user data
      dispatch(setUser(response.user)); // Dispatch the setUser action with user data

      alert('Registration successful!');
      navigate('/login'); // Redirect to Login page
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed!');
    }
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            name="firstName" 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            name="lastName" 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control 
            type="text" 
            name="phone" 
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
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
