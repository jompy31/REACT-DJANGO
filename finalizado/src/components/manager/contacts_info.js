import { Table, Button, Modal, Form, Toast } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TodoDataService from '../../services/todos';
import './ContactsInfo.css';
import Footer from '../../components/navigation/Footer';

const ContactsInfo = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedLead, setEditedLead] = useState({
    name: '',
    email: '',
    description: '',
    priority: '',
    status: '',
    number: '',
    comment: '',
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    description: '',
    priority: '',
    status: '',
    number: '',
  });
  const [errorToast, setErrorToast] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedLeadComments, setSelectedLeadComments] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [leadsPerPage, setLeadsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [deleteToastMessage, setDeleteToastMessage] = useState('');
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
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      loadLeads();
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [leadsPerPage]);

  const loadLeads = () => {
    TodoDataService.getAllLeads(localStorage.getItem('token'))
      .then(response => {
        const updatedLeads = response.data.map(lead => {
          const lastComment = lead.comments.length > 0 ? lead.comments[lead.comments.length - 1] : null;

          return {
            ...lead,
            lastComment,
          };
        });

        setLeads(updatedLeads);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    TodoDataService.deleteLead(id, localStorage.getItem('token'))
      .then(response => {
        loadLeads();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
    setEditedLead({
      name: lead.name,
      email: lead.email,
      description: lead.description,
      priority: lead.priority,
      status: lead.status,
      number: lead.number,
      comment: '',
    });
  };

  const handleSave = () => {
    const updatedLead = {
      ...selectedLead,
      name: editedLead.name,
      email: editedLead.email,
      description: editedLead.description,
      priority: editedLead.priority,
      status: editedLead.status,
      number: editedLead.number,
    };

    TodoDataService.updateLead(selectedLead.id, updatedLead, localStorage.getItem('token'))
      .then(response => {
        if (editedLead.comment) {
          const commentData = {
            lead: selectedLead.id,
            comment: editedLead.comment,
          };
          return TodoDataService.createCommentlead(commentData, localStorage.getItem('token'));
        } else {
          return Promise.resolve();
        }
      })
      .then(() => {
        setShowModal(false);
        loadLeads();
      })
      .catch(error => {
        console.error(error);
        showErrorToast('An error occurred while saving changes.');
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedLead((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLead(null);
    setEditedLead({
      name: '',
      email: '',
      description: '',
      priority: '',
      status: '',
      number: '',
      comment: '',
    });
  };

  const handleCreateLead = () => {
    setShowCreateModal(true);
  };

  const handleNewLeadInputChange = (event) => {
    const { name, value } = event.target;
    setNewLead(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveNewLead = () => {
    if (!newLead.name || !newLead.email || !newLead.description || !newLead.priority || !newLead.status || !newLead.number) {
      showErrorToast('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newLead.email)) {
      showErrorToast('Invalid email format.');
      return;
    }

    const leadData = {
      ...newLead,
      number: newLead.number,
    };

    TodoDataService.createLead(leadData, localStorage.getItem('token'))
      .then(response => {
        setShowCreateModal(false);
        setNewLead({
          name: '',
          email: '',
          description: '',
          priority: '',
          status: '',
          number: '',
        });
        loadLeads();
      })
      .catch(error => {
        console.error(error);
        const errorMessage = error.response?.data?.error || 'An error occurred';
        showErrorToast(errorMessage);
      });
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewLead({
      name: '',
      email: '',
      description: '',
      priority: '',
      status: '',
      number: '',
    });
  };

  const showErrorToast = (message) => {
    setErrorToast(message);
    setTimeout(() => {
      setErrorToast(null);
    }, 5000);
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(leads, ['name', 'email', 'description', 'priority', 'status', 'number']);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data, fields) => {
    const columns = fields;
    const header = columns.join(';');
    const rows = data.map((lead) => columns.map((column) => lead[column]).join(';'));
    return header + '\n' + rows.join('\n');
  };

  const handleLastCommentClick = (lead) => {
    TodoDataService.getLeadComments(lead.id, localStorage.getItem('token'))
      .then(response => {
        setSelectedLeadComments(response.data);
        setSelectedLeadId(lead.id);
        setShowCommentsModal(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteComment = (commentId) => {
    if (!selectedLeadId) {
      console.error('No lead selected.');
      return;
    }

    TodoDataService.deleteComment(selectedLeadId, commentId, localStorage.getItem('token'))
      .then(response => {
        setSelectedLeadComments(comments => comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => {
        console.error(error);
        showErrorToast('An error occurred while deleting the comment.');
      });
  };

  const handleDeleteConfirmation = (lead) => {
    setSelectedLead(lead);
    setDeleteToastMessage(`Are you sure you want to delete ${lead.name}?`);
    setShowDeleteToast(true);
  };

  const handleDeleteConfirmationClose = () => {
    setShowDeleteToast(false);
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLeadsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setLeadsPerPage(value);
  };

  return (
    <div style={{ width: '100%' }}>
      <br/><br/><br/><br/>
      <h1>Customers</h1>
      
      <div
          className="header-buttons"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50%',
            marginLeft: '50%',
            marginTop: '-3%'
          }}
        >
        <Button variant="primary" onClick={handleCreateLead} style={{
            color: 'blue',
            backgroundColor: 'white',
            border: '2px solid black',
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            transition: 'background-color 0.3s, border-color 0.3s',
          }}>New Customer</Button>
        <Button variant="primary" onClick={handleDownloadCSV} style={{
                  color: 'blue',
                  backgroundColor: 'white',
                  border: '2px solid black',
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}>Download</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Form.Group controlId="searchTerm" style={{ marginBottom: '10px' }}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
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
        <Form.Group controlId="leadsPerPage" style={{ marginBottom: '10px' }}>
          <Form.Label>Customers per Page:</Form.Label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Control
              as="input"
              type="number"
              min="1"
              value={leadsPerPage}
              onChange={handleLeadsPerPageChange}
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
          </div>
        </Form.Group>
      </div>
      <div style={{ overflowX: 'auto' }}>
      <Table striped bordered hover className="leads-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Last Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.map(lead => (
            <React.Fragment key={lead.id}>
              <tr>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.number}</td>
                <td>{lead.description}</td>
                <td>{lead.priority}</td>
                <td>{lead.status}</td>
                <td>
                  {lead.lastComment && (
                    <Button variant="link" onClick={() => handleLastCommentClick(lead)}>
                      View
                    </Button>
                  )}
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteConfirmation(lead)} className="action-button">Delete</Button>
                  <Button variant="primary" onClick={() => handleEdit(lead)} className="action-button">Edit</Button>
                </td>
              </tr>
              {selectedLead === lead && selectedLeadComments.length > 0 && (
                <tr>
                  <td colSpan="8" style={{ padding: "0" }}>
                    <Table bordered hover className="comments-table">
                      <thead>
                        <tr>
                          <th>Comment</th>
                          <th>User</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedLeadComments.map(comment => (
                          <tr key={comment.id}>
                            <td>{comment.comment}</td>
                            <td>{comment.user}</td>
                            <td>
                              <Button variant="danger" onClick={() => handleDeleteComment(comment.id)} className="action-button">Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      </div>
      <div>
        {totalPages > 1 && (
          <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="primary"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ marginRight: '5px' }}
            >
              Previous
            </Button>
            <div className="page-info" style={{ margin: '0 5px' }}>
              Page {currentPage}
            </div>
            <Button
              variant="primary"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              style={{ marginLeft: '5px' }}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Modal de edición (Edit Lead) */}
      <Modal show={showModal} onHide={handleCloseModal} centered className="modal-above-table">
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedLead.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedLead.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editedLead.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={editedLead.priority}
                onChange={handleInputChange}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={editedLead.status}
                onChange={handleInputChange}
              >
                <option value="">Select status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="winner">Winner</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="number">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={editedLead.number}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={editedLead.comment}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de creación (Create New Lead) */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered className="modal-above-table">
        <Modal.Header closeButton>
          <Modal.Title>Create New Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newLead.name}
                onChange={handleNewLeadInputChange}
              />
            </Form.Group>
            <Form.Group controlId="newEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newLead.email}
                onChange={handleNewLeadInputChange}
              />
            </Form.Group>
            <Form.Group controlId="newDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newLead.description}
                onChange={handleNewLeadInputChange}
              />
            </Form.Group>
            <Form.Group controlId="newPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={newLead.priority}
                onChange={handleNewLeadInputChange}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={newLead.status}
                onChange={handleNewLeadInputChange}
              >
                <option value="">Select status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="winner">Winner</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={newLead.number}
                onChange={handleNewLeadInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNewLead}>
            Create Lead
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCommentsModal} onHide={() => setShowCommentsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLeadComments.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Comment</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedLeadComments.map(comment => (
                  <tr key={comment.id}>
                    <td>{comment.comment}</td>
                    <td>{comment.user}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteComment(comment.id)} className="action-button">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No comments available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowCommentsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast de error */}
      {errorToast && (
        <Toast
          show={errorToast}
          onClose={() => setErrorToast(null)}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            minWidth: '200px',
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{errorToast}</Toast.Body>
        </Toast>
      )}

      {/* Toast de confirmación de eliminación */}
      <Toast show={showDeleteToast} onClose={handleDeleteConfirmationClose} style={{ position: 'fixed', top: '50%', right: '50%', background: 'white' }}>
        <Toast.Header>
          <strong className="mr-auto">Confirm Delete</strong>
        </Toast.Header>
        <Toast.Body>
          {deleteToastMessage}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button variant="secondary" onClick={handleDeleteConfirmationClose} style={{ marginRight: '5px' }}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDelete(selectedLead.id)}>
              Delete
            </Button>
          </div>
        </Toast.Body>
      </Toast>
      <Footer />
    </div>
  );
};

export default ContactsInfo;
