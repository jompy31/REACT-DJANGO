import React, { useState } from 'react';
import { Dialog, DialogContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import { Image, ZoomIn, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import Nepcom from '../../assets/IMAGO/Pics/NewsLetter-Auto.png';
import CTE from '../../assets/IMAGO/pdf/CTE.pdf';
import Summed_up from '../../assets/IMAGO/Videos/TDM-Summer-up.mp4';
import PCB from '../../assets/IMAGO/Videos/S_PCb Lnkn Post 400s.mp4';

const posts = [
  {
    title: 'Nepcon Japan January 25-27 2023',
    href: '#',
    category: { name: 'Article', href: '#', color: 'bg-indigo-100 text-indigo-800' },
    description: 'From January 25th thru the 27th, we will be taking part in the 37th Nepcon Japan electronics tech show.',
    content: {
      type: 'image',
      url: Nepcom,
    },
    datetime: '2023-01-27',
  },
  {
    title: 'CTE Measurement with TDM Systems',
    href: '#',
    category: { name: 'Article', href: '#', color: 'bg-indigo-100 text-indigo-800' },
    description: 'Please read about TDM’s ability to measure the Coefficient of Thermal Expansion (CTE).',
    content: {
      type: 'pdf',
      url: CTE,
    },
    datetime: '2023-01-27',
  },
  {
    title: 'TDM Technology Summed Up!',
    href: '#',
    category: { name: 'Article', href: '#', color: 'bg-indigo-100 text-indigo-800' },
    description: 'Learn about our Topography Deformation Measurement Systems. Learn about our Topography Deformation Measurement Systems.',
    content: {
      type: 'video',
      url: Summed_up,
    },
    datetime: '2023-01-27',
  },

];

function MyComponent() {
  const [showImage, setShowImage] = useState(false);
  const [showMagnify, setShowMagnify] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleImageClick = () => {
    setShowImage(true);
  };

  const handleMouseMove = (e) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
    setShowMagnify(true);
  };

  const handleMouseLeave = () => {
    setShowMagnify(false);
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  const handleDownload = (url) => {
    window.location.href = url;
  };

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpand = (index) => {
    setExpandedIndex(index);
  };

  const handleClose = () => {
    setExpandedIndex(-1);
  };

  return (
    <div>
      <div className="bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Recent publications</h2>
          </div>
          <div className="mt-12 grid gap-16 md:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post, index) => (
              <div
                key={post.title}
                className={`max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden ${
                  expandedIndex === index ? 'transform scale-105' : ''
                }`}
                onClick={() => handleExpand(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex-shrink-0" style={{ height: '300px' }}>
                  {post.content.type === 'image' && (
                    <div
                      className="h-60 w-100 bg-cover "
                      style={{ backgroundImage: `url(${post.content.url})` }}
                      onClick={handleImageClick}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      {showMagnify && (
                        <div
                          className="absolute rounded-full h-12 w-12 bg-white bg-opacity-75 flex items-center justify-center"
                          style={{ top: mouseY + 10, left: mouseX + 10 }}
                        >
                          <ZoomIn fontSize="large" />
                        </div>
                      )}
                    </div>
                  )}
                  {post.content.type === 'pdf' && (
                    <div
                    className="w-full h-full"
                    style={{
                      position: 'relative',
                      paddingBottom: '82%',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      title={post.title}
                      src={`${post.content.url}#toolbar=0&navpanes=0&view=Fit`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                  )}
                  {post.content.type === 'video' && (
                    <div className="h-50 w-80 bg-gray-200 flex items-center justify-center">
                      <video
                        src={`${post.content.url}#toolbar=0&navpanes=0&view=Fit`}
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
                  {post.content.type === 'pdf' && (
                    <div className="mt-4">
                      <button
                        className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                        onClick={() => handleDownload(post.content.url)}
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
      {showImage && (
        <Dialog open={true} onClose={handleCloseImage} maxWidth="md" fullWidth>
          <DialogContent>
            <div style={{ textAlign: 'right' }}>
              <Close onClick={handleCloseImage} style={{ cursor: 'pointer' }} />
            </div>
            <img src={Nepcom} alt="Nepcon Japan" style={{ width: '100%', height: 'auto' }} />
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={expandedIndex !== -1} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {expandedIndex !== -1 && (
            <div>
              <Typography variant="h5" component="div" gutterBottom>
                {posts[expandedIndex].title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {posts[expandedIndex].description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {posts[expandedIndex].content.type === 'pdf' && (
                  <a href={posts[expandedIndex].content.url} target="_blank" rel="noopener noreferrer">
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
