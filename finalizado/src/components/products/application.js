import React, { useState, useRef, useEffect } from 'react';
import FileDataService from '../../services/files';
import moment from 'moment';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Files = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [program, setProgram] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRefs = useRef([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const token = useSelector(state => state.authentication.token);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  

  const allowedFileNames = ['CONNECTORS VIDEO', 'SOLDER BUMP VIDEO', 'PCB VIDEO', 'BGA 21 UNITS VIDEO', 'BGA 21 UNITS_2 VIDEO', 'IGBT VIDEO'];

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    const token = localStorage.getItem('token');
    FileDataService.getAll(token)
      .then(response => {
        const allowedFiles = response.data.filter(file => allowedFileNames.includes(file.name));
        setFiles(allowedFiles);
        const programData = allowedFiles.map(file => ({
          id: file.id,
          video: file.file,
          title: file.name,
          description: '',
          path: `technology`,  // Replace with your desired path
        }));
        setProgram(programData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProgram = program.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVideoClick = (videoIndex) => {
    setSelectedVideo(videoIndex);
    setDialogOpen(true);

    const videoElement = videoRefs.current[videoIndex];
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }
  };

  return (
    <div>
      <h2>APPLICATIONS</h2>
      <div className="mx-auto mt-12 grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none">
      {filteredProgram.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${
              hoveredId === item.id ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleVideoClick(index)}
          >
            <div className="flex-shrink-0">
              <video
                ref={el => (videoRefs.current[index] = el)} // Store video element in ref
                src={item.video}
                autoPlay
                muted
                loop
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
              <div className="flex-1">
                <Link to={item.path} className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">{item.title}</p>
                </Link>
                <small>
                  <ol>
                    {item.description.split(/\s*--\s*/).map((descItem, index) => (
                      <li key={index}>{descItem}</li>
                    ))}
                  </ol>
                </small>
              </div>
              <Link to="/technology" className="btn sm">
                Learn More <AiFillCaretRight />
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
