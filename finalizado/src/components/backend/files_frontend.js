import React, { useState, useEffect } from 'react';
import FileDataService from '../../services/files';
import moment from 'moment';
import FileViewer from 'react-file-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Form, Container } from 'react-bootstrap';
import './Files.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/navigation/Footer';

const Files = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'stretch', 
  };
  
  const handleButtonHover = (buttonIndex) => {
    setHoveredButton(buttonIndex);
  };

  const handleButtonLeave = () => {
    setHoveredButton(null);
  };

  const renderButton = (index, label, to) => {
    const isHovered = hoveredButton === index;
    const buttonStyle = {
      color: isHovered ? 'white' : 'blue',
      backgroundColor: isHovered ? 'blue' : 'white',
      border: '2px solid black',
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      transition: 'background-color 0.3s, border-color 0.3s',
      width: '100%',
      borderRadius: '10px', 
      margin: '5px 0', 
    };

    return (
      <Link
        key={index}
        to={to}
        className="nav-link"
        onMouseEnter={() => handleButtonHover(index)}
        onMouseLeave={handleButtonLeave}
      >
        <button className="nav-button" style={buttonStyle}>{label}</button>
      </Link>
    );
  };

  return (
    <Container>
      <br /><br /><br />
      <h1>Pages to modify</h1>

      <div className="button-container" style={buttonContainerStyle}>
        {renderButton(0, 'Home', '/files_home')}
        {renderButton(1, 'Technology', '/files_technology')}
        {renderButton(2, 'Products', '/files_products')}
        {renderButton(3, 'Aplications', '/files_application')}
        {renderButton(4, 'Services', '/files_services')}
        {renderButton(5, 'News', '/files_news')}
        {renderButton(6, 'Contacts', '/files_contact')}
      </div>
      <Footer />
    </Container>
  );
};

export default Files;
