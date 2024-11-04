// src/components/Users/EditUser.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { fetchUser, updateUser } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, selectUsers } from '../../features/userSlice'; // Import actions and selectors

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); // Get your token from context or props

  // Select users from Redux store
  const users = useSelector(selectUsers);
  const user = users.find(user => user.id === Number(id)); // Find the user to edit based on ID

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
        // Fetch the user if not found in Redux store
        if (!user) {
          const response = await fetchUser(id, token);
          dispatch(setUsers([...users, response])); // Update Redux store with fetched user
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, [id, token, user, dispatch, users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      // Update user data in Redux directly
      const updatedUser = { ...user, [e.target.name]: e.target.value };
      dispatch(setUsers(users.map(u => (u.id === user.id ? updatedUser : u)))); // Update the user in the list
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