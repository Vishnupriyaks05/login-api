import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setUserPassword } from './services/api';

// Define a type for Axios error handling
type AxiosError = {
  response?: {
    data: {
      message: string;
    };
  };
};

// Type guard to check for Axios errors
const isAxiosError = (error: any): error is AxiosError => {
  return error && error.response && typeof error.response.data.message === 'string';
};

const SetPassword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email');
  const token = query.get('token');

  const [newPassword, setNewPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!email || !token) {
      setMessage('Invalid password setup link.');
      console.log("Invalid link");
    }
  }, [email, token]);

  const handlePasswordChange = async () => {
    if (!email || !token) {
      setMessage('Invalid password setup link.');
      return;
    }

    const requestData = { email, token, newPassword };
    console.log('Sending password change request:', requestData);

    try {
      // Define the expected response type
      const response = await setUserPassword(requestData);
      
      // Safely access the message from the response
      setMessage(response.message);
    } catch (error: unknown) {
      // Use the custom type guard for error handling
      if (isAxiosError(error)) {
        // Handle Axios error
        setMessage(error.response?.data?.message || 'Error setting password.');
      } else if (error instanceof Error) {
        // Handle other types of errors
        setMessage(error.message);
      } else {
        // Handle unexpected errors
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h1>Set Your Password</h1>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handlePasswordChange}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetPassword;
