import React, { useState, useEffect } from 'react';
import FileDataService from '../../services/files';
import moment from 'moment';
import FileViewer from 'react-file-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Form, Container } from 'react-bootstrap';
import './Files.css';

const Files_technology = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [previewFileUrls, setPreviewFileUrls] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filesPerPage, setFilesPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useSelector(state => state.authentication.token);
  const user = useSelector(state => state.authentication.user);
  

  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const [showCurrentUserModal, setShowCurrentUserModal] = useState(false);

  const fetchCurrentUserData = () => {
    const currentUser = localStorage.getItem('currentUser');
    setCurrentUser(JSON.parse(currentUser));
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  useEffect(() => {
    fetchFiles();
  }, []);

  const allowedFileNames = ['First', 'Second', 'Third', 'High resolution', 'Oven system', 'user_friendly'];

  const fetchFiles = () => {
    const token = localStorage.getItem('token');
    FileDataService.getAll(token)
      .then(response => {
        setFiles(response.data);
        const urls = {};
        response.data.forEach(file => {
          urls[file.id] = file.file;
        });
        setPreviewFileUrls(urls);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleFileNameChange = (event) => {
    setSelectedFileName(event.target.value);
  };

  const handleUpload = () => {
    const token = localStorage.getItem('token');

    // Verificar si se ha seleccionado un archivo
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    // Verificar si el nombre del archivo está permitido
    if (!allowedFileNames.includes(selectedFileName)) {
      console.log('File name not allowed');
      return;
    }

    // Verificar si el archivo ya existe y mostrar mensaje de confirmación
    const existingFile = files.find(file => file.name === selectedFileName);
    if (existingFile) {
      const confirmOverwrite = window.confirm('The file already exists. Do you want to overwrite it?');
      if (!confirmOverwrite) {
        return;
      }
      // Eliminar el archivo existente antes de subir el nuevo
      handleDelete(existingFile.id);
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', selectedFileName);

    FileDataService.uploadFile(formData, token)
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        fetchFiles(); // Actualizar la lista de archivos después de la subida exitosa
        setSelectedFile(null); // Limpiar el archivo seleccionado
        setFileName(''); // Limpiar el nombre del archivo
        setSelectedFileName(''); // Limpiar el nombre de archivo seleccionado
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    FileDataService.deleteFile(id, token)
      .then(response => {
        console.log('File deleted successfully:', response.data);
        fetchFiles(); // Actualizar la lista de archivos después de la eliminación exitosa
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
  };

  const handleCheckboxChange = (event, fileId) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, fileId]);
    } else {
      setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter(file => file !== fileId));
    }
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allFileIds = files.map(file => file.id);
      setSelectedFiles(allFileIds);
    } else {
      setSelectedFiles([]);
    }
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

  const getFileExtension = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    return extension;
  };

  const handleDeleteSelected = () => {
    selectedFiles.forEach(fileId => {
      handleDelete(fileId);
    });
    setSelectedFiles([]);
    setSelectAll(false);
  };

  const handleDownloadSelected = () => {
    selectedFiles.forEach(fileId => {
      const file = files.find(file => file.id === fileId);
      if (file) {
        downloadFile(file.file, file.name);
      }
    });
  };

  const downloadFile = (url, fileName) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        // Crear un objeto URL para el blob
        const blobURL = URL.createObjectURL(blob);

        // Crear un enlace temporal
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = fileName;

        // Simular clic en el enlace
        link.click();

        // Limpiar el objeto URL y el enlace temporal
        URL.revokeObjectURL(blobURL);
        link.remove();
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  };

  const handleDownload = (fileId) => {
    const file = files.find(file => file.id === fileId);
    if (file) {
      downloadFile(file.file, file.name);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilesPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setFilesPerPage(value);
    setCurrentPage(1);
  };

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const filteredFiles = files.filter(file =>
    allowedFileNames.includes(file.name) &&
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPreviewComponent = (fileUrl) => {
    const fileExtension = getFileExtension(fileUrl);

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return <img src={fileUrl} alt="Preview" className="preview-image" style={{ width: '50%', float: 'right' }} />;
    } else if (fileExtension === 'pdf') {
      return (
        <embed src={fileUrl} type="application/pdf" width="100%" height="100%" />
      );
    } else if (fileExtension === 'mp4') {
      return (
        <video controls className="preview-video" style={{ width: '100%' }}>
          <source src={fileUrl} type="video/mp4" />
        </video>
      );
    } else {
      return <p>No preview available</p>;
    }
  };
  const handleAdditionalFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    setSelectedFileName(''); // Clear the selected file name for custom names
  };

  const handleUploadAdditionalFile = () => {
    const token = localStorage.getItem('token');

    // Verificar si se ha seleccionado un archivo
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    // Verificar si el nombre del archivo está vacío
    if (!selectedFileName) {
      console.log('Please enter a file name');
      return;
    }

    // Verificar si el archivo ya existe y mostrar mensaje de confirmación
    const existingFile = files.find(file => file.name === selectedFileName);
    if (existingFile) {
      const confirmOverwrite = window.confirm('The file already exists. Do you want to overwrite it?');
      if (!confirmOverwrite) {
        return;
      }
      // Eliminar el archivo existente antes de subir el nuevo
      handleDelete(existingFile.id);
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', selectedFileName);

    FileDataService.uploadFile(formData, token)
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        fetchFiles(); // Actualizar la lista de archivos después de la subida exitosa
        setSelectedFile(null); // Limpiar el archivo seleccionado
        setFileName(''); // Limpiar el nombre del archivo
        setSelectedFileName(''); // Limpiar el nombre de archivo seleccionado
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };


  return (
    <Container>
      <br /><br /><br />
      <h1>Technology Files</h1>
      {currentUser && currentUser.staff_status === 'administrator' && (
        <>
          <div className="upload-container">
            <input type="file" onChange={handleFileChange} />
            <select value={selectedFileName} onChange={handleFileNameChange}>
              <option value="">Select File</option>
              {allowedFileNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
            <button className="upload-button" onClick={handleUpload}>Upload</button>
          </div>
        </>
      )}

      
      <div className="search-container">
        <Form.Group controlId="searchTerm" style={{ marginBottom: '10px' }}>
          <Form.Control
            type="text"
            placeholder="Search by file name"
            value={searchTerm}
            onChange={handleSearch}
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
      </div>
      <div className="files-per-page-container">
        <Form.Group controlId="filesPerPage" style={{ marginBottom: '10px' }}>
          <Form.Label>Files per Page:</Form.Label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Control
              type="number"
              min="1"
              value={filesPerPage}
              onChange={handleFilesPerPageChange}
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
        <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
      </div>

      {filteredFiles.length > 0 ? (
        <>
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
        <Button variant="primary" onClick={handleDownloadSelected} style={{
            color: 'blue',
            backgroundColor: 'white',
            border: '2px solid black',
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            transition: 'background-color 0.3s, border-color 0.3s',
          }}>Download Selected</Button>
         {currentUser && currentUser.staff_status === 'administrator' && (
          <Button variant="primary" onClick={handleDeleteSelected}  style={{
            color: 'blue',
            backgroundColor: 'white',
            border: '2px solid black',
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            transition: 'background-color 0.3s, border-color 0.3s',
          }}>Delete Selected</Button>
          )}
          </div>
          <div style={{ overflowX: 'auto' }}>
          <Table striped bordered hover className="files-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>File name</th>
                <th>Created by:</th>
                <th>Created at:</th>
                <th>Download</th>
                <th style={{ textAlign: 'center' }}>Preview</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map(file => (
                
                <tr key={file.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={event => handleCheckboxChange(event, file.id)}
                    />
                  </td>
                  <td>
                    <a
                      href={file.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'black' }}
                    >
                      {file.name}
                    </a>
                  </td>
                  <td>{file.user}</td>
                  <td>{formatDate(file.created_at)}</td>
                  <td>
                    <button className="download-button" onClick={() => handleDownload(file.id)}>
                      Download
                    </button>
                  </td>
                  <td style={{ width: '50%', textAlign: 'right' }}>
                    {previewFileUrls[file.id] && (
                      <div className="file-preview">
                        <div style={{ textAlign: 'center' }}></div>
                        {getPreviewComponent(previewFileUrls[file.id])}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          {totalPages > 1 && (
            <div className="pagination-container">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant="primary"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <div className="page-info" style={{ margin: '0 5px' }}>Page {currentPage}</div>
                <Button
                  variant="primary"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

        </>
      ) : (
        <p>No files available.</p>
      )}
    </Container>
  );
};

export default Files_technology;
