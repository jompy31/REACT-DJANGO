import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TodoDataService from '../../services/todos';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import Register from './register';
import { useSelector } from 'react-redux';
import Footer from '../../components/navigation/Footer';
import CurrentUserContext from './CurrentUserContext';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    staff_status: '',
    password: ''
  });
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    staff_status: '',
    password: ''
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [showCurrentUserModal, setShowCurrentUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  const [usersPerPage, setUsersPerPage] = useState(4);
  const [customUsersPerPage, setCustomUsersPerPage] = useState(4);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [storedData, setStoredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const token = useSelector(state => state.authentication.token);
  const user = useSelector(state => state.authentication.user);

  const location = useLocation();

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

  const getUserList = () => {
    TodoDataService.getUserList(token)
      .then((response) => {
        setUserList(response.data);
        setStoredData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (token) {
      getUserList();
    }
  }, [token]);

  useEffect(() => {
    const filteredData = userList.filter((user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.staff_status && user.staff_status.trim() !== '' && user.staff_status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setStoredData(filteredData);
  }, [userList, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [usersPerPage]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      staff_status: user.staff_status
    });
    setShowModal(true);
  };

  const handleSaveUser = () => {
    TodoDataService.updateUser(selectedUser.id, updatedUser, token)
      .then(() => {
        setShowModal(false);
        getUserList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = () => {
    TodoDataService.deleteUser(deleteUserId, token)
      .then(() => {
        setShowDeleteConfirmation(false);
        getUserList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleSaveNewUser = () => {
    TodoDataService.addUser(newUser, token)
      .then(() => {
        setShowAddUserModal(false);
        getUserList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleShowCurrentUser = (user) => {
    setCurrentUser(user);
    setShowCurrentUserModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
  };

  const handlePerPageChange = (e) => {
    setCustomUsersPerPage(parseInt(e.target.value, 10));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (sortConfig !== null && sortConfig.key !== null) {
      return [...storedData].sort((a, b) => {
        const key = sortConfig.key;
        const aValue = a[key] ? a[key].toString().toLowerCase() : '';
        const bValue = b[key] ? b[key].toString().toLowerCase() : '';

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else {
      return storedData;
    }
  };

  const renderUserList = () => {
    const currentUsers = sortedData().slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    );

    return currentUsers.map((user) => (
      <tr key={user.id}>
        <td style={{ padding: '0.5rem' }}>{user.first_name}</td>
        <td style={{ padding: '0.5rem' }}>{user.last_name}</td>
        <td style={{ padding: '0.5rem' }}>{user.email}</td>
        <td style={{ padding: '0.5rem' }}>{user.staff_status}</td>
        <td style={{ padding: '0.5rem' }}>{moment(user.created_at).format('YYYY-MM-DD')}</td>
        <td style={{ padding: '0.5rem' }}>
          <Button
            variant="primary"
            onClick={() => handleEditUser(user)}
            style={{
              backgroundColor: '#9ba4c2',
              color: '#ffffff',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6e78a6';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#9ba4c2';
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteUser(user.id)}
            style={{
              backgroundColor: '#f4a3a3',
              color: '#ffffff',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#c57070';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f4a3a3';
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(userList);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'userList.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    const columns = Object.keys(data[0]);
    const header = columns.join(';');
    const rows = data.map((user) => columns.map((column) => user[column]).join(';'));
    return header + '\n' + rows.join('\n');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <br/><br/><br/>
      {location.pathname !== '/register' && (
        <CurrentUserContext.Provider value={currentUser}>
          <div style={{ display: 'flex', width: '100%', marginTop: '8%' }}>
            <h1>Users</h1>
            {currentUser && currentUser.staff_status === 'administrator' && (

      
            <div
              className="header-buttons"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '50%',
                marginLeft: '45%',
              }}
            >
              <Link
                to="/register"
                className="btn btn-outline-primary mr-2"
                style={{
                  color: 'blue',
                  backgroundColor: 'white',
                  border: '2px solid black',
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}
              >
                Register
              </Link>
              <Button
                variant="outline-primary"
                onClick={handleDownloadCSV}
                style={{
                  color: 'blue',
                  backgroundColor: 'white',
                  border: '2px solid black',
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}
              >
                Download
              </Button>
            </div>
            )}
          </div>
        </CurrentUserContext.Provider>
      )}
       {currentUser && currentUser.staff_status === 'administrator' && (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Form.Group controlId="searchTerm" style={{ marginBottom: '10px' }}>
          <Form.Control
            type="text"
            placeholder="Search by name, email, or staff status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: '5px',
              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              transition: 'box-shadow 0.3s',
              outline: 'none',
              padding: '6px',
              width: '30%',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 6px rgba(0, 0, 255, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
            }}
          />
        </Form.Group>
        <Form onSubmit={handlePerPageChange} style={{ marginBottom: '10px' }}>
          <Form.Group controlId="usersPerPage">
            <Form.Label>Users Per Page:</Form.Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Control
                type="number"
                min="1"
                step="1"
                value={usersPerPage}
                onChange={(e) => setUsersPerPage(parseInt(e.target.value, 10))}
                style={{
                  borderRadius: '5px',
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  transition: 'box-shadow 0.3s',
                  outline: 'none',
                  padding: '6px',
                  marginLeft: '5px',
                  marginRight: '5px',
                  width: '50px',
                  textAlign: 'center',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 6px rgba(0, 0, 255, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
                }}
              />
              {/* <Button type="submit" variant="primary" style={{ marginLeft: '0%' }}>
                Apply
              </Button> */}
            </div>
          </Form.Group>
        </Form>
      </div>
        )} 
        {currentUser && currentUser.staff_status === 'administrator' && (
          <div style={{ width: '100%', height: '100%', overflowX: 'auto', maxWidth: '100vw' }}>
  <style>
    {`
      @media (max-width: 768px) {
        table {
          width: 100%;
        }
        th, td {
          padding: 8px;
          font-size: 14px;
        }
        th {
          font-weight: bold;
        }
        th:nth-child(1), td:nth-child(1) {
          display: none;
        }
        tr {
          border-bottom: 1px solid #ddd;
        }
      }
    `}
  </style>
  <Table
    striped
    bordered
    hover
    style={{ width: '100%', height: '100%', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', backgroundColor: 'white' }}
  >
    <thead>
      <tr>
        <th onClick={() => handleSort('first_name')} style={{ color: 'blue' }}>
          First Name
        </th>
        <th onClick={() => handleSort('last_name')} style={{ color: 'blue' }}>
          Last Name
        </th>
        <th onClick={() => handleSort('email')} style={{ color: 'blue' }}>
          Email
        </th>
        <th onClick={() => handleSort('staff_status')} style={{ color: 'blue' }}>
          Staff Status
        </th>
        <th onClick={() => handleSort('created_at')} style={{ color: 'blue' }}>
          Created At
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>{renderUserList()}</tbody>
  </Table>
</div>

      )}
      {currentUser && currentUser.staff_status === 'administrator' && (
      <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          <Button variant="primary" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </Button>
          <div className="page-info" style={{ margin: '0 5px' , marginTop: '5%'}}>
              Page {currentPage}
            </div>
          <Button
            variant="primary"
            disabled={currentPage === Math.ceil(storedData.length / usersPerPage)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
        {/* <div className="page-info">Page {currentPage}</div> */}
        
      </div>
      )}
      <Footer />

      <Modal show={showModal} onHide={handleCloseModal} centered className="modal-above-table">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser.first_name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser.last_name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="userType">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                value={updatedUser.staff_status}
                onChange={(e) => setUpdatedUser({ ...updatedUser, staff_status: e.target.value })}
              >
                <option value="customer">Customer</option>
                <option value="user">User</option>
                <option value="administrator">Administrator</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Body
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            width: '80%',
            margin: '0 auto',
            // Estilos para dispositivos móviles
            '@media(max-width: 767px)': {
              width: '100%',
              margin: '0',
              transform: 'none',
              maxHeight: '80vh',
            },
          }}
        >
          <Modal.Title>Delete User</Modal.Title>
          <p>Are you sure you want to delete this user?</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDeleteUser}
              style={{
                backgroundColor: '#f4a3a3',
                color: '#ffffff',
                transition: 'background-color 0.3s',
                marginLeft: '10px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c57070';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f4a3a3';
              }}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showCurrentUserModal} onHide={() => setShowCurrentUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Current User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <div>
              <p>First Name: {currentUser.first_name}</p>
              <p>Last Name: {currentUser.last_name}</p>
              <p>Email: {currentUser.email}</p>
              <p>Staff Status: {currentUser.staff_status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowCurrentUserModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register newUser={newUser} setNewUser={setNewUser} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveNewUser}>
            Save User
          </Button>
          <Button variant="primary" onClick={() => setShowAddUserModal(false)}>
            Close
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  );
};

export default UserList;
