import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';
import { Dialog, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import Products from '../../components/home/products';
import WhyTDM from '../../components/home/why_tdm'; 
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';
import './technology.css';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';


function Services() {
  const videoRef = useRef(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [HeaderImage, setHeaderImage] = useState('');
  const [VisionImage, setVisionImage] = useState('');
  const [Video, setVideo] = useState('');
  const token = useSelector(state => state.authentication.token);

  const handleVideoClick = () => {
    setIsVideoDialogOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoDialogOpen(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    FileDataService.getAll(token)
      .then(response => {
        const HeaderImage = response.data.find(file => file.name === 'SERVICES_3');
        const VisionImage = response.data.find(file => file.name === 'SERVICES_2');
        const Video = response.data.find(file => file.name === 'SERVICES_1');
        if (HeaderImage) {
          setHeaderImage(HeaderImage.file);
        }
        if (VisionImage) {
          setVisionImage(VisionImage.file);
        }
        if (Video) {
          setVideo(Video.file);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const dialogStyle = {
    background: `url(${HeaderImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };


  return (
    <div>
      <Navbar />
      <section className="about__story">
        <div className="container about__story-container">
          <div className="about__section-image">
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
               <img
                src={HeaderImage}
                alt="Video Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleVideoClick}
              />
            </div>
          </div>

          <div className="about__section-content">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Experience the unique capabilities and features of our TDM system
            </h2>
            <br/><br/>
            <p>
              Experience the unique capabilities and features of our TDM system with a free sample analysis today!
              Our lab service offers complete outsourcing of thermal deformation measurement testing and analysis,
              providing complementary expertise for highly complex issues and supplemental resources for large or
              time-sensitive projects.
            </p>
          </div>
        </div>
      </section>

      <section className="about__Vision">
        <div className="container about__vision-container">
          <div className="about__section-content">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Request your free sample testing now!</h2>
            <br/><br/>
            <p>
              We also offer consulting services to assist customers in developing predictive approaches based on
              non-destructive testing (NDT) technologies. Don't hesitate to take advantage of our services and
              experience the benefits of TDM technology. Request your free sample testing now!
            </p>
          </div>
          <div className="about__section-image">
            <img src={VisionImage} alt="Vision" />
          </div>
          <Link to="/calendar" className="btn xl" style={{ width: '80%', height: '100%', fontSize: '1.5rem'  }}>
            Request your free sample testing now! <AiFillCaretRight />
          </Link>
        </div>
      </section>

      <Products />
      <WhyTDM />

      <Footer />

      <Dialog open={isVideoDialogOpen} onClose={handleCloseVideo} fullScreen>
        <DialogContent style={dialogStyle}>
          <video
            ref={videoRef}
            src={Video}
            autoPlay
            controls
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Close onClick={handleCloseVideo} style={{ position: 'absolute', top: 20, right: 20, color: 'white' }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Services;