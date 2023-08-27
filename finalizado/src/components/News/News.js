import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


function MyComponent() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpand = (index) => {
    setExpandedIndex(index);
  };

  const handleClose = () => {
    setExpandedIndex(-1);
  };

  const [newsPosts, setNewsPosts] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);

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
      return (
        <iframe
          src={`${content}#toolbar=0&navpanes=0&view=Fit`}
          title="PDF Preview"
          width="100%"
          height="400"
          frameBorder="0"
        />
      );
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

  const toggleSelectNews = (postId) => {
    // Toggle selection of a news post
    if (selectedNews.includes(postId)) {
      setSelectedNews(selectedNews.filter(id => id !== postId));
    } else {
      setSelectedNews([...selectedNews, postId]);
    }
    
  };
  const handleDownload = (url) => {
    window.location.href = url;
  };


  return (
    <div>
      <div className="bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Recent publications</h2>
          </div>
          <div className="mt-12 grid gap-16 md:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {newsPosts.map((post, index) => (
              <div
                key={post.title}
                className={`max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden`}
                onClick={() => handleExpand(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex-shrink-0" style={{ height: '300px' }}>
                  {post.content_type === 'image' && (
                    <div
                      className="h-60 w-100 bg-cover "
                      style={{ backgroundImage: `url(${post.content})` }}
                    />
                  )}
                {post.content_type === 'pdf' && (
                  <div
                    className="w-full h-full"
                    style={{
                      position: 'relative',
                      paddingBottom: '82%',
                      overflow: 'hidden',
                    }}
                  >
                    <object
                      data={`${post.content}#toolbar=0&navpanes=0&view=Fit`}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                    >
                      <p>Your browser cannot display the PDF file. You can <a href={`${post.content}`} style={{ color: 'black' }}>download it here</a>.</p>
                    </object>
                  </div>
                )}


                  {post.content_type === 'video' && (
                    <div className="h-50 w-80 bg-gray-200 flex items-center justify-center">
                      <video
                        src={`${post.content}#toolbar=0&navpanes=0&view=Fit`}
                        controls
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline">
                    <span
                      className={`inline-block px-2 py-1 leading-none ${
                        post.category ? post.category.color : 'text-gray-600 bg-gray-200'
                      } rounded-full uppercase tracking-wide text-xs font-semibold`}
                    >
                      {post.category ? post.category.name : 'Uncategorized'}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-gray-600">{post.description}</p>
                  <div className="mt-4">
                    <Link
                      to={post.href}
                      className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Read more<span aria-hidden="true"> →</span>
                    </Link>
                  </div>
                  {post.content_type === 'pdf' && (
                    <div className="mt-4">
                      <button
                        className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                        onClick={() => handleDownload(post.content)}
                      >
                        Download PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={expandedIndex !== -1} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {expandedIndex !== -1 && (
            <div>
              <Typography variant="h5" component="div" gutterBottom>
                {newsPosts[expandedIndex].title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {newsPosts[expandedIndex].description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {newsPosts[expandedIndex].content_type === 'pdf' && (
                  <a href={newsPosts[expandedIndex].content} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                )}
              </Typography>
              
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default MyComponent;
