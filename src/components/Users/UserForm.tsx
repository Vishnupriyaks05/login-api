// src/components/Users/UserForm.tsx
import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { createUser, updateUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, selectUsers } from '../../features/userSlice';
import { User, UserFormProps } from '../../types/apiTypes';

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';
  const users = useSelector(selectUsers);

  const [formData, setFormData] = React.useState<Partial<User>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        // Update logic
        const updatedUser: User = {
          id: user.id, // Ensure id is correctly assigned
          first_name: formData.first_name || '',
          last_name: formData.last_name || '',
          email: formData.email || '',
          phone: formData.phone || '',
        };

        const result = await updateUser(updatedUser.id, updatedUser, token);
        dispatch(setUsers(users.map(u => (u.id === updatedUser.id ? result : u))));
      } else {
        // Create logic
        const newUser: User = {
          id: -1, // Temporary ID until saved; adjust as necessary based on your API
          first_name: formData.first_name || '',
          last_name: formData.last_name || '',
          email: formData.email || '',
          phone: formData.phone || '',
        };

        const createdUser = await createUser(newUser, token);
        dispatch(setUsers([...users, createdUser]));
      }
      alert('Check your email to set your password.');
      navigate('/user-list');
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
