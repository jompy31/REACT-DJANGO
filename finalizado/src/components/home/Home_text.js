import React, { useState, useRef, useEffect } from 'react';
import SectionHead from './SectionHead';

import { useSelector } from 'react-redux';
import FileDataService from '../../services/files';


const HomeText = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const token = useSelector(state => state.authentication.token);
  const handleMouseEnter = () => {
    setIsVideoPlaying(true);
  };

  const handleMouseLeave = () => {
    setIsVideoPlaying(false);
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };
  useEffect(() => {
    fetchBackgroundImage();
  }, []);

  const fetchBackgroundImage = () => {
    FileDataService.getAll(token)
      .then(response => {
        const backgroundImage = response.data.find(file => file.name === 'Video Summary');
        if (backgroundImage) {
          setBackgroundImageUrl(backgroundImage.file);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // className="hidden lg:flex lg:w-3/4 lg:mx-auto"
  return (
    <section className="flex justify-center items-center">
      <div className="hidden lg:flex lg:w-3/4 lg:mx-auto">
      {/* <div style={{ display: 'flex', width: '80%', margin: '0 auto' }}> */}
        <div style={{ flex: 1, marginRight: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <video
              ref={videoRef}
              src={backgroundImageUrl}
              alt='Values_Video'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              autoPlay
              loop
              muted={true} 
              controls={isVideoPlaying}
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={toggleFullScreen}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {/* <div className='main__header-right-container'> */}
            {/* <SectionHead title='Summary' /> */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex flex-1 justify-between bg-white p-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900">Summary</h2>
                </div>
              </div>
              <div className="flex flex-1 flex-col bg-white p-6">
                <p>
                  Improve your measurement accuracy and reliability with TDM by Insidix's advanced warpage measurement system. Our cutting-edge technology utilizes phase shifting Projection Moiré, advanced 3D sensors, and temperature chambers that can endure extreme temperatures ranging from -65°C to 400°C.
                </p>
                <br/>
                <p>
                  Our state-of-the-art system is perfect for various industries including semiconductor, medical, automotive, aerospace, and electronics. So, whether you need to conduct research and development, quality and reliability testing, process development, or failure analysis studies, our system is the ideal solution for your needs.
                </p>
                <br/>
                <p>
                  Don't settle for subpar measurement accuracy and reliability. Contact TDM by Insidix today to learn more about our innovative warpage measurement system.
                </p>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-1/2 mx-auto lg:hidden">
        {/* Renderiza contenido para pantallas medianas y pequeñas */}
        <div className="flex-1 md:mr-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <video
              ref={videoRef}
              src={backgroundImageUrl}
              alt="Values_Video"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              autoPlay
              loop
              muted={!isVideoPlaying}
              controls={isVideoPlaying}
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={toggleFullScreen}
            />
          </div>
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex flex-1 justify-between bg-white p-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900">Summary</h2>
              </div>
            </div>
            <div className="flex flex-1 flex-col bg-white p-6">
              <p>
                Improve your measurement accuracy and reliability with TDM by Insidix's advanced warpage measurement system. Our cutting-edge technology utilizes phase shifting Projection Moiré, advanced 3D sensors, and temperature chambers that can endure extreme temperatures ranging from -65°C to 400°C.
              </p>
              <br/>
              <p>
                Our state-of-the-art system is perfect for various industries including semiconductor, medical, automotive, aerospace, and electronics. So, whether you need to conduct research and development, quality and reliability testing, process development, or failure analysis studies, our system is the ideal solution for your needs.
              </p>
              <br/>
              <p>
                Don't settle for subpar measurement accuracy and reliability. Contact TDM by Insidix today to learn more about our innovative warpage measurement system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeText;
