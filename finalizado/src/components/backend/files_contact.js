import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, InputGroup, FormControl, Modal  } from 'react-bootstrap';
import DistributorDataService from '../../services/files';
import { useDispatch, useSelector } from 'react-redux';

const Distributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [country1, setCountry1] = useState('');
  const [address, setAddress] = useState(''); // Nuevo campo address
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const token = useSelector(state => state.authentication.token);
  const [selectedDistributors, setSelectedDistributors] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = () => {
    DistributorDataService.getAllDistributor(token)
      .then(response => {
        setDistributors(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCreateDistributor = async () => {
    const data = {
      name: name,
      country: country,
      country1: country1,
      address: address, // Asigna el valor del nuevo campo address
      contact_name: contactName,
      phone_number: phone,
      email: email
    };

    try {
      const response = await DistributorDataService.createDistributor(data, token);
      setDistributors([...distributors, response.data]);
      clearForm();
    } catch (error) {
      console.error('Error creating distributor:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await DistributorDataService.deleteDistributor(selectedDistributors, token);
      setSelectedDistributors([]);
      fetchDistributors();
    } catch (error) {
      console.error('Error deleting distributors:', error);
    }
  };

  const toggleSelectDistributor = (distributorId) => {
    if (selectedDistributors.includes(distributorId)) {
      setSelectedDistributors(selectedDistributors.filter(id => id !== distributorId));
    } else {
      setSelectedDistributors([...selectedDistributors, distributorId]);
    }
  };

  const clearForm = () => {
    setName('');
    setCountry('');
    setCountry1('');
    setAddress('');
    setContactName('');
    setPhone('');
    setEmail('');
  };

  return (
    <Container>
      <br /><br /><br />
      <h1>Distributors</h1>
      <Button variant="primary" onClick={toggleModal}>Create Distributor</Button>

      {/* Modal */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Distributor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country1">
          <Form.Label>Specific Address</Form.Label>
          <Form.Control
            type="text"
            value={country1}
            onChange={e => setCountry1(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="contactName">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control
            type="text"
            value={contactName}
            onChange={e => setContactName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleCreateDistributor}>Create Distributor</Button>
      </Form>
      </Modal.Body>
      </Modal>
      {distributors.length > 0 ? (
         <div style={{ width: '100%', overflowX: 'auto' }}>
         <Table striped bordered hover style={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Country</th>
              <th>Specific Address</th>
              <th>Address</th>
              <th>Contact Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {distributors.map(distributor => (
              <tr key={distributor.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedDistributors.includes(distributor.id)}
                    onChange={() => toggleSelectDistributor(distributor.id)}
                  />
                </td>
                <td>{distributor.name}</td>
                <td>{distributor.country}</td>
                <td>{distributor.country1}</td>
                <td>{distributor.address}</td>
                <td>{distributor.contact_name}</td>
                <td>{distributor.phone_number}</td>
                <td>{distributor.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      ) : (
        <p>No distributors available.</p>
      )}
      {selectedDistributors.length > 0 && (
        <InputGroup className="mb-3">
          <Button variant="danger" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </InputGroup>
      )}
    </Container>
  );
};

export default Distributors;
