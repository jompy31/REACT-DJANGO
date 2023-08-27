import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import New from "../../components/News/News";

function News() {
  const token = useSelector(state => state.authentication.token);
  const user = useSelector(state => state.authentication.user);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      try {
        const parsedData = JSON.parse(currentUserData);
        setCurrentUser(parsedData);
      } catch (error) {
        console.error('Error parsing currentUser data:', error);
      }
    }
  }, []);
  

  return (
    <div>
      <Navbar />
      <br/><br/><br/><br/>
      {/* datos de redux:
      <p>Token: {token}</p>
      <p>Usuario: {user}</p>
      <br/><br/>
      datos de local storage:
      {currentUser && (
        <div>
          <p><strong>First Name:</strong> {currentUser.first_name}</p>
          <p><strong>Last Name:</strong> {currentUser.last_name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>User Type:</strong> {currentUser.staff_status}</p>
        </div>
      )} */}
      <New />
      <Footer />
    </div>
  );
}

export default News;
