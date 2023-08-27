import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import ProductDataService from '../../services/products';
import TodoDataService from '../../services/todos';
import moment from 'moment';

const CharacteristicsTable = (props) => {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const token = useSelector(state => state.authentication.token);
  const [characteristicsList, setCharacteristicsList] = useState([]);
  const [showCreateModalM, setShowCreateModalM] = useState(false);
  const [showEditModalM, setShowEditModalM] = useState(false);
  const [selectedCharacteristicM, setSelectedCharacteristicM] = useState(null);
  const [nameM, setNameM] = useState('');
  const [descriptionM, setDescriptionM] = useState('');

  const fetchCharacteristicsM = async () => {
    try {
      const response = await ProductDataService.getAllCharacteristics();
      setCharacteristicsList(response.data);
    } catch (error) {
      console.error('Error fetching characteristics:', error);
    }
  };
  
  const handleCloseEditModalM = () => {
    setShowEditModalM(false);
    setSelectedCharacteristicM(null);
    setNameM('');
    setDescriptionM('');
  };
  
  const handleCreateM = () => {
    setShowCreateModalM(true);
  };
  
  const handleCloseCreateModalM = () => {
    setShowCreateModalM(false);
    setNameM('');
    setDescriptionM('');
  };

  const handleEditM = (characteristic) => {
    setSelectedCharacteristicM(characteristic);
    setNameM(characteristic.name);
    setDescriptionM(characteristic.description);
    setShowEditModalM(true);
  };

  const handleDeleteM = async (id) => {
    try {
      await ProductDataService.deleteCharacteristic(id);
      fetchCharacteristicsM();
    } catch (error) {
      console.error('Error deleting characteristic:', error);
    }
  };

  const handleSubmitCreateM = async () => {
    const newCharacteristic = { name: nameM, description: descriptionM };
    try {
      await ProductDataService.createCharacteristic(newCharacteristic);
      setShowCreateModalM(false);
      fetchCharacteristicsM();
    } catch (error) {
      console.error('Error creating characteristic:', error);
    }
  };

  const handleSubmitEditM = async () => {
    const updatedCharacteristic = { name: nameM, description: descriptionM };
    try {
      await ProductDataService.updateCharacteristic(selectedCharacteristicM.id, updatedCharacteristic);
      setShowEditModalM(false);
      fetchCharacteristicsM();
    } catch (error) {
      console.error('Error updating characteristic:', error);
    }
  };

  useEffect(() => {
    fetchCharacteristicsM();
  }, []);

  
  const [editData, setEditData] = useState({
    id: null,
    name: '',
    description: '',
    characteristics: [],
  });
  // const [showEditModal, setShowEditModal] = useState(false);
  

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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductDataService.getAll(); // Update this to match your API endpoint
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCreate = () => {
    setSelectedCharacteristics([]); // Reset selected characteristics when opening the create modal
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleEdit = (product) => {
    setEditData({
      id: product.id,
      name: product.name,
      description: product.description,
      characteristics: product.characteristics, // Make sure this contains characteristic objects
    });
  
    setShowEditModal(true);
  };
  
  
  
const handleSaveEdit = async () => {
  try {
    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('description', editData.description);

    // Append each selected characteristic ID individually
    const selectedCharacteristicIds =  editData.characteristics.map(char => char.id);
    selectedCharacteristicIds.forEach(id => formData.append('characteristics', id));
    // editData.characteristics.forEach(char => {
    //   formData.append('characteristics', char.id);
    // });

    if (file) {
      formData.append('file', file);
    }
    if (file1) {
      formData.append('file1', file1);
    }

    console.log('Updating product with data:', formData);

    const response = await ProductDataService.uploadProduct(editData.id, formData, token);
    console.log('Server response:', response);

    setShowEditModal(false);
    // Fetch updated products list
    fetchProducts();
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

  
  
  const handleEditNameChange = (e) => {
    const newName = e.target.value;
    setEditData({ ...editData, name: newName });
    setName(newName); // Update the name state as well
  };
  
  const handleEditDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setEditData({ ...editData, description: newDescription });
    setDescription(newDescription); // Update the description state as well
  };
  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setShowEditModal(false);
    setName('');
    setDescription('');
  };

  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [characteristicOptions, setCharacteristicOptions] = useState([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);

  useEffect(() => {
    fetchCharacteristicsOptions();
  }, []);

  const fetchCharacteristicsOptions = async () => {
    try {
      const response = await ProductDataService.getAllCharacteristics();
      setCharacteristicOptions(response.data);
    } catch (error) {
      console.error('Error fetching characteristics:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Create a list of selected characteristics' IDs
      // const selectedCharacteristicIds = selectedCharacteristics.map(char => char.id);
  
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      // Get only the IDs of selected characteristics
      const selectedCharacteristicIds = selectedCharacteristics.map(char => char.id);

      // Append each selected characteristic ID individually
      selectedCharacteristicIds.forEach(id => formData.append('characteristics', id));
        
      if (file) {
        formData.append('file', file);
      }
      if (file1) {
        formData.append('file1', file1);
      }
  
      // Implement your create logic here using the ProductDataService
      const response = await ProductDataService.createProduct(formData, token);
  
      // Log the server response
      console.log('Server response:', response);
  
      // Optionally, reset form fields or close the modal here
      // ...
  
      // Fetch updated products list
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  
  const handleEditCharacteristicsChange = (e) => {
    const selectedCharacteristicStrings = Array.from(e.target.selectedOptions, option => option.value);
    const selectedCharacteristics = characteristicOptions.filter(char => selectedCharacteristicStrings.includes(JSON.stringify(char)));
  
    setEditData(prevEditData => ({ ...prevEditData, characteristics: selectedCharacteristics }));
  };
  
  
  
  

  const handleDelete = async (id) => {
    try {
      await ProductDataService.deleteProduct(id, token);
      // Fetch updated products list
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

  return (
    <div>
      <br/><br/><br/><br/><br/>
      <Button variant="primary" onClick={handleCreate}>Create Product</Button>
      <br/>
      <Button variant="primary" onClick={handleCreateM}>Create Characteristic</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Preview</th>
            <th>Features</th>
            <th>Description</th>
            <th>Created by:</th>
            <th>Created at:</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
              {product.file && (
                <a href={product.file} download style={{ color: 'black' }}>
                  {product.file.split('/').pop()} {/* Muestra el nombre del archivo */}
                </a>
              )}
              {product.file1 && (
                <a href={product.file1} download style={{ color: 'black' }}>
                  {product.file1.split('/').pop()} {/* Muestra el nombre del archivo */}
                </a>
              )}
            </td>
              <td>
                  {product.characteristics.map(characteristic => (
                    <div key={characteristic.id}>
                      <strong>{characteristic.name}</strong>: {characteristic.description}
                    </div>
                  ))}
                </td>
              <td>{product.description}</td>
              <td>{product.user}</td>
              <td>{formatDate(product.created_at)}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(product)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <br/><br/><br/><br/><br/>
      <Button variant="primary" onClick={handleCreateM}>Create Characteristic</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {characteristicsList.map(characteristic => (
            <tr key={characteristic.id}>
              <td>{characteristic.id}</td>
              <td>{characteristic.name}</td>
              <td>{characteristic.description}</td>
              <td>
                <Button variant="info" onClick={() => handleEditM(characteristic)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteM(characteristic.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Characteristic Modal */}
      <Modal show={showCreateModalM} onHide={handleCloseCreateModalM}>
        <Modal.Header closeButton>
          <Modal.Title>Create Characteristic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={nameM} onChange={(e) => setNameM(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={descriptionM} onChange={(e) => setDescriptionM(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModalM}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitCreateM}>Create</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Characteristic Modal */}
      {selectedCharacteristicM && (
        <Modal show={showEditModalM} onHide={handleCloseEditModalM}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Characteristic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={nameM} onChange={(e) => setNameM(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={descriptionM} onChange={(e) => setDescriptionM(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModalM}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmitEditM}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Create Product Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Label>File</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group controlId="formFile1">
              <Form.Label>File 1</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile1(e.target.files[0])} />
            </Form.Group>
            <Form.Group controlId="formCharacteristics">
              <Form.Label>Characteristics</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={selectedCharacteristics.map(char => JSON.stringify(char))}
                onChange={(e) =>
                  setSelectedCharacteristics(
                    Array.from(e.target.selectedOptions, option =>
                      JSON.parse(option.value)
                    )
                  )
                }
              >
                {characteristicOptions.map(char => (
                  <option
                    key={char.id}
                    value={JSON.stringify(char)}
                    disabled={selectedCharacteristics.some(
                      selectedChar => selectedChar.id === char.id
                    )}
                  >
                    {char.name}      <br/><br/><br/><br/><br/>
                    {char.description}
                  </option>
                ))}
              </Form.Control>
              <Button variant="primary" onClick={handleCreateM}>Create Characteristic</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
       <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={editData.name} onChange={handleEditNameChange} />
            </Form.Group>
            <Form.Group controlId="editFormDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={editData.description} onChange={handleEditDescriptionChange} />
            </Form.Group>
            {/* <Form.Group controlId="editFormCharacteristics">
            <Form.Label>Characteristics</Form.Label>
            <Form.Control
  as="select"
  multiple
  value={editData.characteristics.map(char => JSON.stringify(char))}
  onChange={handleEditCharacteristicsChange}
>
              {characteristicOptions.map(char => (
                <option
                  key={char.id}
                  value={JSON.stringify(char)}
                >
                  {char.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group controlId="formFile">
              <Form.Label>File</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group controlId="formFile1">
              <Form.Label>File 1</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile1(e.target.files[0])} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default CharacteristicsTable;