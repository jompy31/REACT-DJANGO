import React, { useState, useEffect } from 'react';
import TodoDataService from '../../services/todos';
import { Modal, Form, Button, OverlayTrigger, Tooltip, Card, Row, Col, Popover, Image, Alert } from 'react-bootstrap';
import { AiOutlinePlus, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillChatFill, BsTrash } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/navigation/Footer';

const ManageBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [showDeletePopover, setShowDeletePopover] = useState(false);
  const [deletePopoverTarget, setDeletePopoverTarget] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const token = useSelector(state => state.authentication.token);
  const user = useSelector(state => state.authentication.user);
  

  useEffect(() => {
    fetchBlogPosts();
}, []);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const likedBlogPosts = blogPosts.filter(blogPost =>
      blogPost.likes.some(like => like.user === userId)
    );
    setLikedPosts(likedBlogPosts);
  }, [blogPosts]);

  const fetchBlogPosts = () => {
    TodoDataService.getAllBlogPosts()
        .then(response => {
            setBlogPosts(response.data);
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
        });
};
  const createBlogPost = () => {
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('image', image);

    const token = localStorage.getItem('token');
    TodoDataService.createBlogPost(data, token)
      .then(() => {
        fetchBlogPosts(token);
        setTitle('');
        setContent('');
        setImage(null);
      })
      .catch(error => {
        console.error('Error creating blog post:', error);
      });
  };

  const openEditModal = (id) => {
    const selectedBlog = blogPosts.find(blogPost => blogPost.id === id);
    if (selectedBlog) {
      setSelectedBlogId(id);
      setTitle(selectedBlog.title);
      setContent(selectedBlog.content);
      setImage(null);
      setIsModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setSelectedBlogId(null);
    setTitle('');
    setContent('');
    setIsModalOpen(false);
  };

  const updateBlogPost = () => {
    if (selectedBlogId) {
      const data = new FormData();
  
      data.append('title', title);
      data.append('content', content);
  
      if (image && typeof image === 'object') {
        data.append('image', image);
      }
  
      const token = localStorage.getItem('token');
      console.log('Data to be sent:', Object.fromEntries(data.entries()));

      TodoDataService.updateBlogPost(selectedBlogId, data, token)
        .then(() => {
          fetchBlogPosts(token);
          closeEditModal();
        })
        .catch(error => {
          console.error('Error updating blog post:', error);
        });
    }
  };
  

  const deleteBlogPost = (id) => {
    const token = localStorage.getItem('token');
    TodoDataService.deleteBlogPost(id, token)
      .then(() => {
        fetchBlogPosts(token);
        setShowDeletePopover(false);
      })
      .catch(error => {
        console.error('Error deleting blog post:', error);
      });
  };

  const handleCommentChange = (event, blogPostId) => {
    const { value } = event.target;
    const modifiedBlogPosts = blogPosts.map(blogPost => {
      if (blogPost.id === blogPostId) {
        return {
          ...blogPost,
          comment: value
        };
      }
      return blogPost;
    });
    setBlogPosts(modifiedBlogPosts);
  };

  const createComment = (blogPostId, comment) => {
    const data = {
      blog_post: blogPostId,
      user: localStorage.getItem('userId'),
      content: comment
    };

    const token = localStorage.getItem('token');
    TodoDataService.createComment(data, token)
      .then(() => {
        fetchBlogPosts(token);
        const modifiedBlogPosts = blogPosts.map(blogPost => {
          if (blogPost.id === blogPostId) {
            return {
              ...blogPost,
              comment: ''
            };
          }
          return blogPost;
        });
        setBlogPosts(modifiedBlogPosts);
      })
      .catch(error => {
        console.error('Error creating comment:', error);
      });
  };

  const deleteComment = (blogPostId, commentId) => {
    const token = localStorage.getItem('token');
    TodoDataService.deleteComment(blogPostId, commentId, token)
      .then(() => {
        fetchBlogPosts(token);
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  const toggleLike = (blogPostId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const likedBlogPost = blogPosts.find(blogPost => blogPost.id === blogPostId);

    if (likedBlogPost.likes.some(like => like.user === userId)) {
      TodoDataService.deleteLike(blogPostId, userId, token)
        .then(() => {
          fetchBlogPosts(token);
        })
        .catch(error => {
          console.error('Error deleting like:', error);
        });
    } else {
      TodoDataService.createLike(blogPostId, userId, token)
        .then(() => {
          fetchBlogPosts(token);
        })
        .catch(error => {
          console.error('Error creating like:', error);
        });
    }
  };

  const openImageModal = (blogPost) => {
    setSelectedImage(blogPost);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  const toggleComments = (blogPostId) => {
    setShowComments(prevState => ({
      ...prevState,
      [blogPostId]: !prevState[blogPostId]
    }));
  };

  const renderLikesTooltip = (likes) => (
    <Tooltip id="likes-tooltip" style={{ fontSize: '12px', background: 'rgba(255, 255, 255, 1)', color: '#000', borderRadius: '8px' }}>
    {likes.map(like => (
      <div key={like.user}>{like.user}</div>
    ))}
  </Tooltip>
  );

  const handleDeletePopover = (event, blogPostId) => {
    setDeleteId(blogPostId);
    setDeletePopoverTarget(event.target);
    setShowDeletePopover(true);
  };

  const closeDeletePopover = () => {
    setShowDeletePopover(false);
  };

  const renderDeletePopover = (blogPostId) => (
<Popover id="delete-popover" style={{ background: 'white', borderRadius: '8px' }}>
  <Popover.Body>
    <div style={{ textAlign: 'center' }}>
      <p>Are you sure you want to delete?</p>
      <Button variant="danger" onClick={() => deleteBlogPost(blogPostId)}>
        <BsTrash size={14} style={{ verticalAlign: 'middle' }} /> Delete
      </Button>{' '}
      <Button variant="secondary" onClick={closeDeletePopover}>Close</Button>
    </div>
  </Popover.Body>
</Popover>
  );

  const renderBlogPostModal = (blogPost) => (
    <Modal
      show={isImageModalOpen}
      onHide={closeImageModal}
      centered
      // Style the modal to maintain maximum width on small screens and mobile devices
      style={{
        width: '100%', // Set the initial width to 90%
        maxWidth: '100%', // Set the maximum width to 1200px
        '@media (max-width: 768px)': {
          width: '95%', // On devices with screen width <= 768px, set width to 95%
        },
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{blogPost.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', top: '20%' }}>
        <div style={{ textAlign: 'left', width: '100%' }}>
          <Image src={blogPost.image} alt="Blog Post Image" fluid style={{ marginBottom: '20px', maxHeight: '300px' }} />
          <pre style={{ whiteSpace: 'pre-wrap' }}>{blogPost.content}</pre>
          <p style={{ marginTop: '10px' }}>Author: {blogPost.author}</p>
        </div>
      </Modal.Body>
    </Modal>
  );

  return (
    <div style={{ width: '100%', minHeight: '100vh', overflow: 'auto', padding: '20px' }}>
      {/* <h1 style={{ fontWeight: 'bold', textAlign: 'left' }}>Manage Blog</h1> */}
      <br/><br/><br/>

      {user !== null && (
        <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: '1' }}>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <AiOutlinePlus size={24} />
          </Button>
        </div>
      )}

      <div>
        <h2 style={{ fontSize: '20px', textAlign: 'left' }}>Blog Posts</h2>
        <Row>
          {blogPosts.map(blogPost => (
            <Col key={blogPost.id} md={12} style={{ marginBottom: '20px' }}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Card.Img
                variant="top"
                as={Image} // Use Image component here
                src={blogPost.image}
                alt="Blog Post Image"
                fluid // Add fluid property to make the image responsive
                style={{ objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => openImageModal(blogPost)}
              />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginLeft: '10px',
                    }}
                  >
                   
                      {/* <OverlayTrigger
                        placement="left"
                        overlay={renderDeletePopover(blogPost.id)}
                        show={showDeletePopover && deleteId === blogPost.id}
                        target={deletePopoverTarget}
                        onHide={closeDeletePopover}
                      >
                        <Button variant="danger" onClick={(e) => handleDeletePopover(e, blogPost.id)} style={{ fontSize: '10px', padding: '4px' }}>
                          <BsTrash size={14} style={{ verticalAlign: 'middle' }} />
                        </Button>
                      </OverlayTrigger>
                   
                    <OverlayTrigger
                      placement="left"
                      overlay={<Tooltip id="comment-tooltip">Comments</Tooltip>}
                    >
                       {user !== null && (
                      <Button variant="link" onClick={() => toggleComments(blogPost.id)} style={{ fontSize: '10px', padding: '4px', marginTop: '5px' }}>
                        <MdMessage size={20} style={{ verticalAlign: 'middle' }} />
                      </Button>
                       )}
                    </OverlayTrigger> */}
                  </div>
                </div>
                <Card.Body>
                  <Card.Title style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'left' }}>{blogPost.title}</Card.Title>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', textAlign: 'left' }}>
                    <pre style={{ fontSize: '14px', whiteSpace: 'pre-wrap', marginBottom: '5px' }}>{blogPost.content}</pre>
                    <p style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>Author: {blogPost.author}</p>
                  </div>
                  
                    <Button variant="primary" onClick={() => openEditModal(blogPost.id)}>
                      Edit
                    </Button>
                  
                </Card.Body>
                <Card.Footer>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <h4>
                      <OverlayTrigger placement="top" overlay={renderLikesTooltip(blogPost.likes)}>
                        <span style={{ cursor: 'pointer' }}>
                          {likedPosts.some((post) => post.id === blogPost.id) ? (
                            <AiFillHeart size={20} onClick={() => toggleLike(blogPost.id)} />
                          ) : (
                            <AiOutlineHeart size={20} onClick={() => toggleLike(blogPost.id)} />
                          )}
                        </span>
                      </OverlayTrigger>
                    </h4>
                    
                    {showComments[blogPost.id] && (
                      <div style={{ marginLeft: '10px', fontSize: '12px', background: 'rgba(255, 255, 255, 1)', color: '#000', borderRadius: '8px' }}>
                        {blogPost.comments.map((comment) => (
                          <div key={comment.id} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <p style={{ fontSize: '12px', marginBottom: '5px' }}>{comment.content}</p>
                                <p style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>{comment.user}</p>
                              </div>
                              
                              <Button
                              variant="danger"
                              onClick={() => deleteComment(blogPost.id, comment.id)}
                              style={{
                                fontSize: '10px',
                                transform: 'scale(0.5)' // Escala el botón a la mitad del tamaño original
                              }}
                            >
                              <BsTrash size={14} style={{ verticalAlign: 'middle' }} />
                            </Button>
                              
                            </div>
                          </div>
                        ))}
                       
                          <div>
                            <Form.Control
                              as="textarea"
                              value={blogPost.comment}
                              onChange={(event) => handleCommentChange(event, blogPost.id)}
                              placeholder="Write a comment..."
                            />
                            <Button variant="primary" onClick={() => createComment(blogPost.id, blogPost.comment)}>
                              Comment
                            </Button>
                          </div>
                        
                      </div>
                    )}
                    <OverlayTrigger
                      placement="left"
                      overlay={<Tooltip id="comment-tooltip">Comments</Tooltip>}
                    >
                      <Button
                        variant="link"
                        onClick={() => toggleComments(blogPost.id)}
                        style={{ fontSize: '10px', padding: '4px', marginLeft: '2%', marginBottom: '2%' }}
                      >
                        <BsFillChatFill size={40} style={{ verticalAlign: 'middle' }} />
                      </Button>
                    </OverlayTrigger>
                  </div>
                  <small className="text-muted">Author: {blogPost.author}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={isModalOpen} onHide={closeEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlogId ? 'Edit Blog Post' : 'Create Blog Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
              {image && (
                <div>
                  <h4>Preview:</h4>
                  <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', marginBottom: '10px' }} />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {selectedBlogId ? (
            <Button variant="primary" onClick={updateBlogPost}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={createBlogPost}>
              Create
            </Button>
          )}
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
      {selectedImage && renderBlogPostModal(selectedImage)}
    </div>
  );
};

export default ManageBlog;
