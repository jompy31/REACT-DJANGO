import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TodoDataService from '../services/todos';
import Alert from 'react-bootstrap/Alert';
import Gif from '../assets/IMAGO/GIF/cambio_pagina.gif';

const UserList1 = (props) => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserList = () => {
    if (props.token) {
      TodoDataService.getUserList(props.token)
        .then((response) => {
          setUserList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getUserList();
  }, [props.token]);

  useEffect(() => {
    if (userList.length > 0 && props.user) {
      const currentUser = userList.find((user) => user.email === props.user);
      setCurrentUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [userList, props.user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  const containerStyle = {
    backgroundImage: `url(${Gif})`,
    background: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    height: '25vh',
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
  };
  // const containerStyle = {
  //   backgroundImage: `url(${Gif})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   height: '100vh',
  //   width: '100vw',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   color: 'white', // Letras de color blanco
  // };
  const titleStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const textStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    marginBottom: '10px',
  };

  return (
    <div id="loading-bg">
    <div class="loading-logo">
      <img src="/cambio_pagina.gif" height="50" alt="Logo" />
   
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to TDM by INSIDIX</h1>
      {currentUser && (
        <div>
          <p style={textStyle}><strong>First Name:</strong> {currentUser.first_name}</p>
          <p style={textStyle}><strong>Last Name:</strong> {currentUser.last_name}</p>
          <p style={textStyle}><strong>Email:</strong> {currentUser.email}</p>
          <p style={textStyle}><strong>User Type:</strong> {currentUser.staff_status}</p>
        </div>
      )}
    </div>
    </div>
  </div>
  );
};

export default UserList1;
