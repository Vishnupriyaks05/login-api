import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPassword } from '../services/api';
import { selectCurrentUser, setUser } from '../features/userSlice'; // Import the action
import { AppDispatch } from '../store/store'; // Import your store's dispatch type

type AxiosError = {
  response?: {
    data: {
      message: string;
    };
  };
};

const isAxiosError = (error: any): error is AxiosError => {
  return error && error.response && typeof error.response.data.message === 'string';
};

const SetPassword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email');
  const token = query.get('token');

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>(); // Use the dispatch hook

  // Get the current user from the Redux state
  const currentUser = useSelector(selectCurrentUser);


  useEffect(() => {
    if (!email || !token) {
      setMessage('Invalid password setup link.');
    }
  }, [email, token]);

  const handlePasswordChange = async () => {
    if (!email || !token) {
      setMessage('Invalid password setup link.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
  
    const requestData = { email, token, newPassword };
    setLoading(true);
  
    try {
      const response = await setUserPassword(requestData);
      setMessage(response.message);
  
      // Update the user state with the new email, keeping existing properties
      if (currentUser) {
        dispatch(setUser({ ...currentUser, email })); // Spread currentUser to include all properties
      } // Should work now
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Error setting password.');
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <h1>Set Your Password</h1>
      <label>
        New Password:
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button onClick={handlePasswordChange} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetPassword;
