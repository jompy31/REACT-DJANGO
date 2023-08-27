import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import headerimage from '../../assets/IMAGO/Pics/distributors-map.png';
import pinimage from '../../assets/IMAGO/Pics/pin.png';
import PhoneIcon from '@mui/icons-material/Phone';
import FaxIcon from '@mui/icons-material/Fax';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';



function Contact_header() {
    const [expandedImage, setExpandedImage] = useState(null);

    const handleImageClick = (image) => {
      setExpandedImage(image);
    };
  
    const handleCloseImage = () => {
      setExpandedImage(null);
    };
  return (
    <main>
      <div className="relative px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-6xl text-black font-semibold tracking-tight pb-0 text-center">
          Sales and Service Locations
        </h1>
        {/* <br /> */}
        <div className="mx-auto max-w-full xl:mx-12 xl:pt-40 xl:pb-64 lg:pt-40 lg:pb-48 pt-24 pb-12">
          <div>
            <div>
            <div className="about__section-image" style={{ marginLeft: '-1.5%', marginTop: '-8.5%' }}>
            <img src={pinimage} alt="INSIDIX HEADQUARTERS" onClick={() => handleImageClick(pinimage)} />

          </div>

              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-6xl text-black font-semibold tracking-tight pb-0">
                Insidix <span> </span>
                <Typewriter
                  words={['Headquarters']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <h1
                className="text-2xl sm:text-2xl lg:text-2xl xl:text-2xl text-black font-semibold tracking-tight pb-16"
                style={{ marginLeft: '0%' }}
              >
                24 rue du drac 38180 Seyssins, france
              </h1>

            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-center items-center p-4 bg-blue-900 text-gold"  style={{ transform: 'translateY(180%)' }}>
                <a href="tel:+330438124280" className="text-white flex items-center mx-2 hover:scale-150 hover:text-gold" style={{ marginRight: '10%' }}>
                    <PhoneIcon
                    style={{ marginRight: '0.5rem', color: 'gold', transition: 'transform 0.3s, color 0.3s' }}
                    className="hover:scale-150 hover:text-gold"
                    />
                    <span className="hidden sm:inline text-sm md:text-base lg:text-lg xl:text-xl hover:text-gold">+33(0)438124280</span>
                </a>
                <a href="fax:+330438120322" className="text-white flex items-center mx-2 hover:scale-150 hover:text-gold" style={{ marginRight: '10%' }}>
                    <FaxIcon
                    style={{ marginRight: '0.5rem', color: 'gold', transition: 'transform 0.3s, color 0.3s' }}
                    className="hover:scale-150 hover:text-gold"
                    />
                    <span className="hidden sm:inline text-sm md:text-base lg:text-lg xl:text-xl hover:text-gold">+33(0)438120322</span>
                </a>
                <a href="mailto:insidix@insidix.com" className="text-white flex items-center mx-2 hover:scale-150 hover:text-gold">
                    <EmailIcon
                    style={{ marginRight: '0.5rem', color: 'gold', transition: 'transform 0.3s, color 0.3s' }}
                    className="hover:scale-150 hover:text-gold"
                    />
                    <span className="hidden sm:inline text-sm md:text-base lg:text-lg xl:text-xl hover:text-gold">insidix@insidix.com</span>
                </a>
                </div>

            <div
              className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden bg-white  lg:top-[calc(100%-45rem)] sm:top-[calc(100%-30rem)]"
              style={{ height: '124%', top: '-5.5%', left: '0', opacity: '0.2' }}
            >
              <img src={headerimage} className="w-full h-full object-cover" alt="Topography deformation and measurement" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact_header;
