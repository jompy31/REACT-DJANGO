import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResetPasswordUser = () => {
  const { reset_token } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [staffStatus, setStaffStatus] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://jompy31.pythonanywhere.com/api/reset_password_user/${reset_token}/`);

      if (response.status === 200) {
        console.log(response.data); // Agregar esta línea para ver la estructura de los datos recibidos

        const data = response.data;
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setCompany(data.company);
        setStaffStatus(data.staff_status);
        setNewPassword('');
      } else {
        console.log('Error fetching user data');
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Actualizamos los estados de los campos individuales
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'company':
        setCompany(value);
        break;
      case 'staffStatus':
        setStaffStatus(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      default:
        break;
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }
  
    try {
      const response = await axios.put(`https://jompy31.pythonanywhere.com/api/reset_password_user/${reset_token}/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        company: company,
        staff_status: staffStatus,
        password: newPassword,
      });
  
      if (response.status === 200) {
        console.log('User data changed successfully.');
        // Puedes redirigir al usuario a una página de éxito aquí
      } else {
        console.log('Error changing user data.');
      }
      navigate('/login');
    } catch (error) {
      console.log('Error changing user data', error);
    }
  };

  return (
    <div>
      <br/><br/><br/>
      <h1>User Data</h1>
      <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          border: '2px solid black',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px black',
          padding: '20px',
          width: '400px',
          margin: '0 auto'
        }}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label>Staff Status:</label>
          <select name="staffStatus" value={staffStatus} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select> */}
        </div>
        <div>
          <label>New Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button type="button" onClick={toggleShowConfirmPassword}>
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ResetPasswordUser;
