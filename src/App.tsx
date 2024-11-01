import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Container } from 'react-bootstrap';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import SetPassword from './components/SetPassword ';
import Home from './components/Home';
import EditUser from './components/Users/EditUser';


const App = () => {
  
  return (
    <Router>
      <Container>
        <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-list" element={<UserList/>} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/users" element={<UserList/>} />
          <Route path="/create-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<EditUser />} /> 
        </Routes>
      </Container>
    </Router>
  );
};

export default App;