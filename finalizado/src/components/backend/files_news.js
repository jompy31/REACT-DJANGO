import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, InputGroup, FormControl, Modal  } from 'react-bootstrap';
import FileDataService from '../../services/files';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf';

const FilesNews = () => {
  const [newsPosts, setNewsPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('image');
  const [contentFile, setContentFile] = useState(null);
  const [selectedNews, setSelectedNews] = useState([]); // To store selected news post IDs
  const token = useSelector(state => state.authentication.token);
  const [numPages, setNumPages] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to handle form submission
  const handleFormSubmit = () => {
    // ... Your form submission logic ...
    toggleModal(); // Close the modal after form submission
  };

  useEffect(() => {
    fetchNewsPosts();
  }, []);

  const fetchNewsPosts = () => {
    FileDataService.getAllPost()
      .then(response => {
        setNewsPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderPreview = (contentType, content) => {
    if (contentType === 'image') {
      return <img src={content} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />;
    } else if (contentType === 'pdf') {
      return <span>PDF Preview</span>; // You can add a PDF viewer here
    } else if (contentType === 'video') {
      return (
        <video width="300" height="200" controls>
          <source src={content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <span>No preview available</span>;
    }
  };

  const handleCreateNews = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('content_type', contentType);
    formData.append('content', contentFile);

    try {
      const response = await FileDataService.createNewsPost(formData, token);
      setNewsPosts([...newsPosts, response.data]);
      setTitle('');
      setCategory('');
      setDescription('');
      setContentType('image');
      setContentFile(null);
    } catch (error) {
      console.error('Error creating news post:', error);
    }
  };

  const handleDeleteSelected = async () => {
    // Deleting selected news posts
    try {
      await FileDataService.deleteNewsPost(selectedNews, token);
      // Clear the selectedNews array and refresh news posts
      setSelectedNews([]);
      fetchNewsPosts();
    } catch (error) {
      console.error('Error deleting news posts:', error);
    }
  };

  const toggleSelectNews = (postId) => {
    // Toggle selection of a news post
    if (selectedNews.includes(postId)) {
      setSelectedNews(selectedNews.filter(id => id !== postId));
    } else {
      setSelectedNews([...selectedNews, postId]);
    }
  };


  return (
    <Container>
      <br/><br/><br/>
      <h1>News Posts</h1>
      <Button variant="primary" onClick={toggleModal}>Create News</Button>

      {/* Modal */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="contentType">
          <Form.Label>Content Type</Form.Label>
          <Form.Control
            as="select"
            value={contentType}
            onChange={e => setContentType(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="file"
            onChange={e => setContentFile(e.target.files[0])}
          />
        </Form.Group>
        <Button onClick={handleCreateNews}>Create News</Button>
      </Form>
      </Modal.Body>
      </Modal>

      {newsPosts.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Content Type</th>
              <th>Download</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {newsPosts.map(post => (
              <tr key={post.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedNews.includes(post.id)}
                    onChange={() => toggleSelectNews(post.id)}
                  />
                </td>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.description}</td>
                <td>{post.content_type}</td>
                <td>
                  <a href={post.content} download>
                    Download
                  </a>
                </td>
                <td>{renderPreview(post.content_type, post.content)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No news posts available.</p>
      )}
      {selectedNews.length > 0 && (
        <InputGroup className="mb-3">
          <Button variant="danger" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </InputGroup>
      )}
    </Container>
  );
};

export default FilesNews;
