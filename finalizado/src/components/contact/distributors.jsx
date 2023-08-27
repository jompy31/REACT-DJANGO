import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import headerimage from '../../assets/IMAGO/Pics/distributors-map.png';
import pinimage from '../../assets/IMAGO/Pics/pin.png';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import React, { useState, useEffect } from 'react';
import DistributorDataService from '../../services/files';

function Distributors() {
  const [expandedImage, setExpandedImage] = useState(null);
  const [distributors, setDistributors] = useState([]);
  const [showMap, setShowMap] = useState([]);

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = () => {
    DistributorDataService.getAllDistributor()
      .then(response => {
        setDistributors(response.data);
        setShowMap(Array(response.data.length).fill(false));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleToggleMap = (index) => {
    const updatedShowMap = [...showMap];
    updatedShowMap[index] = !updatedShowMap[index];
    setShowMap(updatedShowMap);
  };

  return (
    <main>
      <div className="relative px-6 lg:px-8" style={{ marginTop: '2%' }}>
        <div className="mx-auto max-w-full xl:mx-12 xl:pt-40 xl:pb-64 lg:pt-40 lg:pb-48 pt-24 pb-12">
          <div>
            <div
              className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden bg-white  lg:top-[calc(100%-45rem)] sm:top-[calc(100%-30rem)]"
              style={{ height: '124%', top: '-5.5%', left: '0', opacity: '1' }}
            >
              <img src={headerimage} className="w-full h-full object-cover" alt="Topography deformation and measurement" />
            </div>
          </div>
        </div>
      </div>

      <br /><br /><br /><br />
      
      {distributors.map((distributor, index) => (
      <React.Fragment key={index}>
        {/* <div className="bg-gray-100 rounded-lg shadow-black shadow-2xl p-8 hover:scale-105"> */}
        <div key={index} className="bg-gray-100 rounded-lg shadow-black shadow-2xl p-8 hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">{`FOR ${distributor.country}`}</h2>
          <h2 className="text-2xl font-bold mb-4">{distributor.name}</h2>
          <p className="mb-4">{distributor.country1}</p>
          <br /><br />
          <div className="relative shadow-md rounded-lg">
            <div className="absolute inset-x-0 bottom-0 flex justify-center items-center p-4 bg-gray-100 text-gold" style={{ transform: 'translateY(-100%)' }}>
              <a className="text-black flex items-center mx-2 hover:scale-150 hover:text-gold" style={{ marginRight: '10%' }}>
                <AccountCircleIcon
                  style={{ marginRight: '0.5rem', color: 'gold', transition: 'transform 0.3s, color 0.3s' }}
                  className="hover:scale-150 hover:text-gold"
                />
                <span className="hidden sm:inline text-sm md:text-base lg:text-lg xl:text-xl hover:text-gold">{distributor.contact_name}</span>
              </a>
              <a href={`tel:${distributor.phone_number}`} className=" text-black flex items-center mx-2 hover:scale-150 hover:text-gold" style={{ marginRight: '10%' }}>
                <PhoneIcon
                  style={{ marginRight: '0.5rem', color: 'gold', transition: 'transform 0.3s, color 0.3s' }}
                  className="hover:scale-150 hover:text-gold"
                />
                <span className="hidden sm:inline text-sm md:text-base lg:text-lg xl:text-xl hover:text-gold">{distributor.phone_number}</span>
              </a>
              <a href={`mailto:${distributor.email}`} className="text-black flex items-center mx-2 hover:scale-150 hover:text-gold">
                <EmailIcon
                  style={{ marginRight: '0.5rem', color: 'gold', transition: 'transform 0.3s, color 0.3s' }}
                  className="hover:scale-150 hover:text-gold"
                />
                <span className="text-black hidden sm:inline text-sm md:text-base lg:text-lg xl:text-xl hover:text-gold">EMAIL</span>
              </a>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-8"
              onClick={() => handleToggleMap(index)}
            >
              {showMap[index] ? 'Hide Map' : 'View on Google Maps'}
            </button>
          </div>
          {/* Expandable content */}
          {showMap[index] && (
            <div className="mt-4">
              <iframe
                title="Google Maps"
                src={`${distributor.address}`}
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded"
                onClick={() => handleToggleMap(index)}
              >
                Hide Map
              </button>
            </div>
          )}
        </div>
        
        <br />
        </React.Fragment>
      ))}

    </main>
  );
}

export default Distributors;
