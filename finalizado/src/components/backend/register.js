import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../assets/IMAGO/logo.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';
import TodoDataService from '../../services/todos';

const validateEmail = (email) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    re_password: '',
    company: '',
    staff_status: '',
  });

  const { first_name, last_name, email, password, re_password, company, staff_status } = formData;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password || !re_password || !company || !staff_status) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email.');
      return;
    }

    if (password !== re_password) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      console.log(formData);
      const response = await TodoDataService.signup(formData);
      console.log(response.data);
      // Aquí puedes manejar la respuesta del servidor después del registro exitoso

      // Reset form data
      setFormData({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: '',
        company: '',
        staff_status: '',
      });

      // Navigate to usuario
      navigate('/user');
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error en caso de que el registro falle
      toast.error(
        <div>
          Register failed. Try again or verify in the user list
        </div>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="auth-wrapper d-flex align-center justify-center pa-4"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(20%, 7%)',
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <Card className="auth-card pa-4 pt-7" style={{ maxWidth: '50%' }}>
          <Card.Body>
            <div className="d-flex justify-content-center" style={{ marginBottom: '2rem' }}>
              <img src={logo} alt="INSIDIX Logo" style={{ maxWidth: '100%' }} />
            </div>
            <Card.Title className="font-weight-semibold text-2xl text-uppercase">
              {/* INSIDIX */}
            </Card.Title>

            <Card.Text className="pt-2">
              <strong style={{ fontSize: '170%' }}>Register Users for INSIDIX!</strong>
              <br />
              <strong style={{ fontSize: '100%' }}>
                
              </strong>
            </Card.Text>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={first_name}
                      onChange={onChange}
                      required
                      style={{
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid blue',
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={last_name}
                      onChange={onChange}
                      required
                      style={{
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid blue',
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                      style={{
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid blue',
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={onChange}
                      minLength="6"
                      required
                      style={{
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid blue',
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="re_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="re_password"
                        value={re_password}
                        onChange={onChange}
                        minLength="6"
                        required
                        style={{
                          borderRadius: '0.5rem',
                          border: '1px solid blue',
                        }}
                      />
                      <button
                        type="button" // Cambia el tipo a "button"
                        className="input-group-text border-0 bg-transparent"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                      </button>
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      value={company}
                      onChange={onChange}
                      required
                      style={{
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid blue',
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="staff_status">
                    <Form.Label>Staff Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="staff_status" 
                      value={staff_status}
                      onChange={onChange}
                      required
                      style={{
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid blue',
                      }}
                    >
                      <option value="user">User</option>
                      <option value="administrator">Administrator</option>
                      <option value="customer">Customer</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex align-items-center justify-content-center mt-1 mb-4">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!email || !first_name || !last_name || !password || !re_password || !company || !staff_status}
                >
                  Register
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default Signup;
