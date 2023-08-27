import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar la librería axios

const baseUrl = 'https://jompy31.pythonanywhere.com';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState({
    success: false,
    error: '',
  });
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetPassword = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email });

    try {
      await axios.post(`${baseUrl}/api/reset_password/`, body, config); // Enviar la solicitud HTTP al servidor
      setRequestStatus({ success: true, error: '' });
    } catch (err) {
      console.error(err);
      setRequestStatus({ success: false, error: 'Email not found in the database.' });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await resetPassword();
    navigate('/login');
  };

  if (requestStatus.success) {
    return <div>Password reset email sent successfully. Check your email for further instructions.</div>;
  }

  return (
    <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mt-3 mx-auto lg:mx-12 max-w-full">
        <h1>Request Password Reset:</h1>
        {requestStatus.error && <div className="text-red-500">{requestStatus.error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control mt-3 rounded-md border border-blue"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <button
            className="inline-flex ml-12 mt-3 items-center rounded-md border border-transparent bg-blue-button px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
