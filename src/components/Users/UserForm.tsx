// src/components/Users/UserForm.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { createUser, updateUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface UserFormProps {
    user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const [formData, setFormData] = useState<User>({
    first_name: user ? user.first_name : '',
    last_name: user ? user.last_name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
  });

  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser(user.id!, formData, token);
      } else {
        await createUser(formData, token);
      }
      alert('Check your email to set your password.'); // Show alert
      navigate('/user-list'); // Navigate back to the user list after creating/updating
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Container>
      <h1>{user ? 'Edit User' : 'Create User'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">{user ? 'Update User' : 'Create User'}</Button>
      </Form>
    </Container>
  );
};

export default UserForm;
