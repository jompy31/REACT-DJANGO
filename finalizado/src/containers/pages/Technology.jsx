import React, { useState, useEffect } from 'react';
import './technology.css';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';
import TechnologyBot from '../../components/home/technology_bot';
import Products from '../../components/home/products';
import Whytdm from '../../components/home/why_tdm';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';

function Technology() {
    const [expandedImage, setExpandedImage] = useState(null);
    const [storyImage, setStoryImage] = useState('');
    const [visionImage, setVisionImage] = useState('');
    const [missionImage, setMissionImage] = useState('');
    const token = useSelector(state => state.authentication.token);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = () => {
        FileDataService.getAll(token)
            .then(response => {
                const firstImage = response.data.find(file => file.name === 'First');
                const secondImage = response.data.find(file => file.name === 'Second');
                const thirdImage = response.data.find(file => file.name === 'Third');
                if (firstImage) {
                    setStoryImage(firstImage.file);
                }
                if (secondImage) {
                    setVisionImage(secondImage.file);
                }
                if (thirdImage) {
                    setMissionImage(thirdImage.file);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleImageClick = (image) => {
        setExpandedImage(image);
    };

    const handleCloseImage = () => {
        setExpandedImage(null);
    };

    return (
        <div>
            <Navbar />
            <section className="about__story">
                <div className="container about__story-container">
                    <div className="about__section-image">
                        <img src={storyImage} alt="Our_Story_Image" onClick={() => handleImageClick(storyImage)} />
                        {expandedImage === storyImage && (
                            <div className="expanded-image">
                                <img src={storyImage} alt="Expanded_Image" />
                                <button className="close-button" onClick={handleCloseImage}>X</button>
                            </div>
                        )}
                    </div>
                    <div className="about__section-content">
                        <h1>Technology</h1>
                        <p>If you're looking for an advanced instrument that can support various applications in process development,
                            failure analysis, reliability, and quality control, consider the versatile TDM (Topography Deformation Measurement)
                            technology. TDM utilizes a patented method to perform 3D measurements of complex objects under thermal stress,
                            allowing engineers to understand, simulate, and predict the behavior of packages and boards during reflow, a critical
                            aspect of product development.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about__Vision">
                <div className="container about__vision-container">
                    <div className="about__section-content">
                        <p>With TDM, the development and process engineer can improve the reliability of their products, from simple components
                            to highly complex packaging. In contrast, the failure analysis engineer can accurately identify the root causes of
                            observed failures during operations. The TDM system has a powerful operating system with a sophisticated optical set-up
                            and a unique heating/cooling sequence capable of analyzing 3D topography under thermal stress, revealing faults that
                            could arise during normal production and use.
                        </p>
                        <p>TDM is consistent with any existing topography tool on the market and can be easily integrated into all types of
                            equipment. In addition, major companies in electronics and semiconductors have chosen TDM for quality control and
                            R&D purposes, thanks to its innovative patented technology and features like sub-room chambers, scanning mode, and
                            multi-scale.
                        </p>
                    </div>
                    <div className="about__section-image">
                        <img src={visionImage} alt="Our_Vision_Image" onClick={() => handleImageClick(visionImage)} />
                        {expandedImage === visionImage && (
                            <div className="expanded-image">
                                <img src={visionImage} alt="Expanded_Image" />
                                <button className="close-button" onClick={handleCloseImage}>X</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="about__mission">
                <div className="container about__mission-container">
                    <div className="about__section-image">
                        <img src={missionImage} alt="Our_Mission_Image" onClick={() => handleImageClick(missionImage)} />
                        {expandedImage === missionImage && (
                            <div className="expanded-image">
                                <img src={missionImage} alt="Expanded_Image" />
                                <button className="close-button" onClick={handleCloseImage}>X</button>
                            </div>
                        )}
                    </div>
                    <div className="about__section-content">
                        <p>
                            Customers have commended TDM for its high-resolution sensors, patented Multi-Scale, Scanning imaging, and the
                            system's versatility and user-friendliness, making it a standout system for anyone looking to enhance their product
                            development and quality control processes.
                        </p>
                    </div>
                </div>
            </section>
            <TechnologyBot />
            <Whytdm />
            <Products />
            <Footer />
        </div>
    );
}

export default Technology;
