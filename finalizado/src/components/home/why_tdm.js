import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiOpenaigym } from 'react-icons/si';
import SectionHead from './SectionHead';
import { AiFillCaretRight } from 'react-icons/ai';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';

const whytdm = [
  {
    id: 1,
    icon: <SiOpenaigym />,
    title: "Multi-Scale",
    info: "Full modularity and flexibility --Warpage measurement on µm scale from -65°C to 400°C --Independently controlled top/bottom heater banks --Fast heating and cooling ramp --Ultra high resolution camera for fine feature analysis --Sample drawer for easy sample loading",
    path: "https://www.linkedin.com/feed/update/urn:li:activity:6944835700521394176/",
    imageUrl: 'MultiScale', // Placeholder for the actual image URL
  },
  {
    id: 2,
    icon: <SiOpenaigym />,
    title: "3D Sensor",
    info: "Large size and large sample capability --Warpage measurement on µm scale of object up to 800 x 600 mm --Independently controlled top/bottom heater banks --Fast heating and cooling ramp --Ultra high resolution camera for fine feature analysis --Sample drawer for easy sample loading",
    path: "https://www.linkedin.com/feed/update/urn:li:activity:6944835700521394176/",
    imageUrl: 'Sensor', // Placeholder for the actual image URL
  },
  {
    id: 3,
    icon: <SiOpenaigym />,
    title: "Finge Projection",
    info: "Self-contained, fluid-free, and easily fits on a bench-top  --Warpage measurement on µm scale from room temperature to 300°C --Independently controlled top/bottom heater banks --Fast heating and cooling ramp --Ultra high resolution camera for refined feature analysis --Sample drawer for easy sample loading ",
    path: "https://www.linkedin.com/feed/update/urn:li:activity:6944835700521394176/",
    imageUrl: 'Fringes', // Placeholder for the actual image URL
  }
];

const Whytdm = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [images, setImages] = useState({});
  const token = useSelector(state => state.authentication.token);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    FileDataService.getAll(token)
      .then(response => {
        const imageMap = {};
        response.data.forEach(file => {
          if (file.name === 'MultiScale') {
            imageMap['MultiScale'] = file.file;
          } else if (file.name === 'Sensor') {
            imageMap['Sensor'] = file.file;
          } else if (file.name === 'Fringes') {
            imageMap['Fringes'] = file.file;
          }
        });
        setImages(imageMap);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="relative bg-transparent px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-transparent sm:h-2/3" />
      </div>
      <div className="relative mx-auto lg:mx-12 max-w-full">
        <div className="text-center">
          <SectionHead icon={<SiOpenaigym />} title="Why TDM?" />
          <p>We meet and surpass all deformation measurement standards for temperature cycling, moisture/reflow, coplanarity testing, warpage test methods, among others. Our advancements in 3D analysis and Projection Moiré have evolved into nanoscale detectability.</p>
        </div>
        <div className="mx-auto mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none">
          {whytdm.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${
                hoveredId === item.id ? 'transform scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={images[item.imageUrl]} alt={item.title} />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <Link to={item.path} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">{item.title}</p>
                  </Link>
                  <small>
                    <ol>
                      {item.info.split(/\s*--\s*/).map((infoItem, index) => (
                        <li key={index}>{infoItem}</li>
                      ))}
                    </ol>
                  </small>
                </div>
                <Link to={item.path} className="btn sm">
                  Learn More <AiFillCaretRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whytdm;
