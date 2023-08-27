import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const baseUrl = 'https://jompy31.pythonanywhere.com';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });
  const [newPasswordDisplay, setNewPasswordDisplay] = useState('');

  const { uid, token } = useParams();

  const { new_password, re_new_password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

   const body = JSON.stringify({ uid, token, new_password, re_new_password });

    console.log('Reset Password Request:', body);
    console.log('UID- TOKEN Request:', uid, token);

    try {
      await axios.post(`${baseUrl}/auth/users/reset_password_confirm/`, body, config);

      setNewPasswordDisplay(new_password);
      setRequestSent(true);
      navigate('/');
    } catch (err) {
      console.log('Error:', err.response.data);
    }
  };

  if (requestSent) {
    return navigate('/');
  }

  return (
    <div className='container mt-5'>
      <br />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='New Password'
            name='new_password'
            value={new_password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='Confirm New Password'
            name='re_new_password'
            value={re_new_password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          Reset Password
        </button>
      </form>
      {newPasswordDisplay && <p>New password: {newPasswordDisplay}</p>}
    </div>
  );
};

export default ResetPasswordConfirm;
