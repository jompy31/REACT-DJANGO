import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../assets/IMAGO/Pics/Logo (1).png';
import { Link, useNavigate } from 'react-router-dom';
import TodoDataService from '../../services/todos'; // Importar el servicio TodoDataService
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../../redux/actions/authActions';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const login = () => {
    TodoDataService.login({ username: username, password: password }) // Llamar al método de login del servicio TodoDataService
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Guardar el token en el localStorage
        localStorage.setItem('user', username); // Guardar el nombre de usuario en el localStorage
        setUsername('');
        setPassword('');
        setError('');

        dispatch(setAuthentication(token, username));

        // Show /current_user for 4 seconds
        navigate('/current_user');
        setTimeout(() => {
          window.location.reload();
          setTimeout(() => {
            navigate('/');
          }, 4000);
        }, 0);
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error;
          setError(errorMessage);
        } else {
          setError('An error occurred. Please try again.'); // Mensaje genérico para otros errores
        }
      });
  };

  return (
    <div>
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
            <Card.Text className="pt-2 text-white" style={{ textShadow: '1px 1px 2px black' }}>
              <strong style={{ fontSize: '170%' }}>Welcome to INSIDIX!</strong>
              <br />
              <strong style={{ fontSize: '100%' }}>
                Please sign in to your account and start using the new features
              </strong>
            </Card.Text>
            <br />
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="username">
                    <Form.Label className="pt-2 text-white" style={{ textShadow: '1px 1px 2px black' }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                  <Form.Group controlId="password">
                    <Form.Label className="pt-2 text-white" style={{ textShadow: '1px 1px 2px black' }}>
                      Password
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          borderRadius: '0.5rem',
                          border: '1px solid blue',
                        }}
                      />
                      <button
                        type="button" // Cambia el tipo a "button"
                        className="input-group-text border-0 bg-transparent"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <div
                className="d-flex align-items-center justify-content-between mt-1 mb-4"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="me-2 text-white"
                    style={{ textShadow: '1px 1px 2px black' }}
                  />
                  <Link to="/reset_password" className="d-flex align-items-center">
                    <p style={{ color: 'gold' }}>Forgot Password?</p>
                  </Link>
                </div>
                <Link to="/signup" className="d-flex align-items-center">
                  <p style={{ color: 'green' }}>Register to enter in TDM events</p>
                </Link>
                <Button
                  variant="primary"
                  type="button" // Cambia el tipo a "button"
                  onClick={login}
                  style={{ color: 'white', textShadow: '1px 1px 2px black' }}
                >
                  Login
                </Button>
                {error && <div className="error">{error}</div>}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
