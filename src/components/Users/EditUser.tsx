// src/components/Users/EditUser.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { fetchUser, updateUser } from '../services/api';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem('token'); // Get your token from context or props

  useEffect(() => {
    if (!id) {
      console.error('User ID not found');
      return;
    }

    const getUser = async () => {
      if (!token) {
        console.error('Token not found');
        // You might want to redirect or show a message here
        return;
      }
      try {
        const response = await fetchUser(id, token);
        setUser(response.data as User); // Type assertion here
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value } as User);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && id) {
      if (!token) {
        console.error('Token not found');
        return;
      }
      try {
        await updateUser(Number(id), user, token);
        alert('User updated successfully!');
        navigate('/user-list');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  
  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Edit User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default EditUser;
