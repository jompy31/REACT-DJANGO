import React, { useState, useRef } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SiOpenaigym } from 'react-icons/si';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import HeaderImage from '../../assets/IMAGO/Pics/Insidix-fond-TDM.jpg';
import video1 from '../../assets/IMAGO/Videos/carousel/Apps Vid 1 A.mp4';
import video2 from '../../assets/IMAGO/Videos/carousel/Apps Vid 1 B.mp4';
import video3 from '../../assets/IMAGO/Videos/carousel/Apps Vid 2 A.mp4';
import video4 from '../../assets/IMAGO/Videos/carousel/Apps Vid 2 C.mp4';
import video5 from '../../assets/IMAGO/Videos/carousel/Apps Vid 2 D.mp4';
import video6 from '../../assets/IMAGO/Videos/carousel/Apps Vid 4.mp4';
import Footer from "components/navigation/Footer"

const program = [
  {
    id: 1,
    icon: <SiOpenaigym />,
    title: 'CONNECTORS',
    path: '/technology',
    video: video6,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    icon: <SiOpenaigym />,
    title: 'SOLDER BUMP',
    path: '/technology',
    video: video2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    icon: <SiOpenaigym />,
    title: 'PCB',
    path: '/technology',
    video: video3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    icon: <SiOpenaigym />,
    title: 'BGA 21 UNITS',
    path: '/technology',
    video: video1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 5,
    icon: <SiOpenaigym />,
    title: 'IGBT',
    path: '/technology',
    video: video5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 6,
    icon: <SiOpenaigym />,
    title: 'BGA 21 UNITS',
    path: '/technology',
    video: video4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

function Application() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRefs = useRef([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleVideoClick = (videoIndex) => {
    setSelectedVideo(videoIndex);
    setIsFullScreen(true);
    setDialogOpen(true);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsFullScreen(false);
    setDialogOpen(false);
  };

  const handleMouseOver = (videoIndex) => {
    videoRefs.current[videoIndex]?.pause();
  };

  const handleMouseOut = (videoIndex) => {
    if (videoRefs.current[videoIndex]?.paused && !videoRefs.current[videoIndex]?.ended) {
      videoRefs.current[videoIndex]?.play();
    }
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const dialogStyle = {
    background: `url(${HeaderImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const contentStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className="video-grid">
      {selectedVideo !== null && isFullScreen && (
        <Dialog open={dialogOpen} onClose={handleCloseVideo} fullScreen hideBackdrop>
          <div style={dialogStyle} onClick={handleCloseVideo}>
            <DialogContent style={contentStyle}>
              <div style={{ alignSelf: 'flex-end' }}>
                <Close onClick={handleCloseVideo} style={{ cursor: 'pointer', color: 'white' }} />
              </div>
              <video
                ref={(ref) => (videoRefs.current[selectedVideo] = ref)}
                src={program[selectedVideo]?.video}
                controls
                autoPlay
                muted
                style={{ width: '100%', height: '80%' }}
              />
            </DialogContent>
          </div>
        </Dialog>
      )}

      {!isFullScreen && (
        <div>
          <br/><br/><br/><br/>
          <h2>APPLICATIONS</h2>
          <div className="mx-auto mt-12 grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none">
            {program.map((item, index) => (
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
                    ref={(ref) => (videoRefs.current[index] = ref)}
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
                  <Link to={item.path} className="btn sm">
                    EDIT <AiFillCaretRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Application;
