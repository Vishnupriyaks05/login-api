// src/components/Users/UserList.tsx
import React, { useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, selectUsers } from '../../features/userSlice';
import { deleteUser, fetchUsers } from '../../services/api';
import { User } from '../../types/apiTypes'; // Adjust the import based on your file structure

const UserList: React.FC = () => {
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers(token);
        const usersData: User[] = response.data; // Expecting response to have a data property
        dispatch(setUsers(usersData)); // Dispatch to Redux
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, [token, dispatch]);

  if (!users.length) {
    return <div>No users found.</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id, token);
      const updatedUsers = users.filter((user) => user.id !== id);
      dispatch(setUsers(updatedUsers));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreateUser = () => {
    navigate('/create-user');
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
