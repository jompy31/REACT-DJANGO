import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiOpenaigym } from 'react-icons/si';
import { AiFillCaretRight } from 'react-icons/ai';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';

const Programs = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [programs, setPrograms] = useState([]);
  const token = useSelector(state => state.authentication.token);

  useEffect(() => {
      fetchPrograms();
  }, []);

  const fetchPrograms = () => {
      // Fetch programs data from your server or data source
      // For now, I'll just use your example data
      const fetchedPrograms = [
          {
              id: 1,
              icon: <SiOpenaigym />,
              title: "High resolution asd 3D sensor based on phase shifting projection Moiré",
              info: "Camera resolution: 12 Mpixels --High Z resolution: <1µm -Surface amplitude up to 25mm --Step Height Measurement --Surface discontinuity measurement",
              path: "https://www.linkedin.com/feed/update/urn:li:activity:7011042841334276096/",
              
          },
          {
              id: 2,
              icon: <SiOpenaigym />,
              title: "Oven system and oven reflow",
              info: "Top and bottom heating --From -65°C to 400°C --Fast heating ramp (up to 6°C.s-1) --Fast cooling ramp (up to 3°C.s-1) --High temperature homogeneity",
              path: "https://www.linkedin.com/feed/update/urn:li:activity:7011042841334276096/",
             
          },
          {
              id: 3,
              icon: <SiOpenaigym />,
              title: "User friendly system",
              info: "Sample loading with a drawer --Motorized stage --Automatic calibration --Easy and fast post-processing --Advanced set of 3D software",
              path: "https://www.linkedin.com/feed/update/urn:li:activity:7011042841334276096/",
         
          }
      ];

      setPrograms(fetchedPrograms);
  };

    const [highResolutionImage, setHighResolutionImage] = useState('');
    const [ovenSystemImage, setOvenSystemImage] = useState('');
    const [userFriendlyImage, setUserFriendlyImage] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = () => {
        FileDataService.getAll(token)
            .then(response => {
                const highResolutionImg = response.data.find(file => file.name === 'High resolution');
                const ovenSystemImg = response.data.find(file => file.name === 'Oven system');
                const userFriendlyImg = response.data.find(file => file.name === 'user_friendly');
                if (highResolutionImg) {
                    setHighResolutionImage(highResolutionImg.file);
                }
                if (ovenSystemImg) {
                    setOvenSystemImage(ovenSystemImg.file);
                }
                if (userFriendlyImg) {
                    setUserFriendlyImage(userFriendlyImg.file);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="relative bg-transparent px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
            <div className="absolute inset-0">
                <div className="h-1/3 bg-transparent  sm:h-2/3" />
            </div>
            <div className="relative mx-auto lg:mx-12 max-w-full">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Technology Programs</h2>
                </div>
                <div className="mx-auto mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none">
                    {programs.map((item) => (
                        <div
                            key={item.id}
                            className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${
                                hoveredId === item.id ? 'transform scale-105' : ''
                            }`}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="flex-shrink-0">
                            {item.id === 1 && highResolutionImage && (
                                <img className="h-48 w-50 object-cover" src={highResolutionImage} alt={item.title} />
                              )}
                              {item.id === 2 && ovenSystemImage && (
                                <img className="h-48 w-50 object-cover" src={ovenSystemImage} alt={item.title} />
                              )}
                              {item.id === 3 && userFriendlyImage && (
                                <img className="h-48 w-50 object-cover" src={userFriendlyImage} alt={item.title} />
                              )}

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

export default Programs;
