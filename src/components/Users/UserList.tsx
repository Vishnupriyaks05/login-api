// src/components/Users/UserList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { deleteUser, fetchUsers } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem('token') || ''; // Get your token from context or props
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers(token);
        const usersData = response.data as User[];
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, [token]);

  if (!users.length) {
    return <div>No users found.</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id, token);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreateUser = () => {
    navigate('/create-user'); // Navigate to the UserForm for creating a new user
  };

  return (
    <Container>
      <h1>User List</h1>
      <Button variant="primary" onClick={handleCreateUser} style={{ marginBottom: '20px' }}>
        Create New User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/edit-user/${user.id}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
