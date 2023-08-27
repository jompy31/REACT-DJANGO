import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom'
import headerimage from '../../assets/IMAGO/Pics/fondoheader.jpg'
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';

const navigation = {

  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/insidix/',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            d="M20.25 0H3.75C1.677 0 0 1.677 0 3.75v16.5C0 22.323 1.677 24 3.75 24h16.5c2.073 0 3.75-1.677 3.75-3.75V3.75C24 1.677 22.323 0 20.25 0zM7.688 19.125h-3.75V9.375h3.75v9.75zm-1.875-11.625h-.025c-1.983 0-3.326-1.359-3.326-3.047 0-1.766 1.414-3.031 3.575-3.031 2.16 0 3.327 1.266 3.35 3.031 0 1.688-1.342 3.047-3.575 3.047zM20.25 19.125h-3.75v-5.109c0-1.219-.438-2.047-1.532-2.047-.828 0-1.313.563-1.531 1.109-.078.188-.1.453-.1.719v5.328h-3.75V9.375h3.525v1.531h.05c.491-.922 1.688-1.891 3.476-1.891 3.725 0 4.405 2.45 4.405 5.625v6.609z"
          />
        </svg>
      ),
    },
    
  
    
  ],
}


function Header() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const token = useSelector(state => state.authentication.token);

  useEffect(() => {
    fetchBackgroundImage();
  }, []);

  const fetchBackgroundImage = () => {
    FileDataService.getAll(token)
      .then(response => {
        const backgroundImage = response.data.find(file => file.name === 'Background Header');
        if (backgroundImage) {
          setBackgroundImageUrl(backgroundImage.file);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <main>
      <Container
      className="background-container"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, width: '100%', height: '100%' }}
    >
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-full xl:mx-12 xl:pt-40 xl:pb-64 lg:pt-40 lg:pb-48 pt-24 pb-12">
          <div>
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-6xl text-white font-semibold tracking-tight pb-0">
                TDM is the EXPERT in <span> </span>
                <Typewriter
                  words={['Topography', 'Deformation', 'Measurement']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-6xl text-white font-semibold tracking-tight pb-16 md:pl-4">
                TECHNOLOGY
              </h1>
              <p className="mt-16 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl leading-8 text-white md:pl-4">
                Assessing, Simulating, and predicting the behavior of complex devices under thermal stress.
                Request
                <span className="mx-1 text-md sm:text-lg font-medium leading-8 text-white transition duration-300 ease-in-out border-b-2 border-transparent hover:border-gold-button">
                  <Link to="/products"> INFORMATION -</Link>
                </span>
                <span className="text-md sm:text-lg font-medium leading-8 text-white transition duration-300 ease-in-out border-b-2 border-transparent hover:border-gold-button">
                  <Link to="/calendar"> SCHEDULE FREE SAMPLE TESTING -</Link>
                </span>
                <span className="mx-1 text-md sm:text-lg font-medium leading-8 text-white transition duration-300 ease-in-out border-b-2 border-transparent hover:border-gold-button">
                  <Link to="/services"> SERVICES</Link>
                </span>
              </p>
              <div
                className="absolute bottom-0 left-0 flex space-x-6 xl:mx-20 mx-6"
                style={{ top: '95%', left: '0%' }}
              >
                {navigation.social.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-900 hover:text-gray-800">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            {/* <div
              className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden bg-white lg:top-[calc(100%-45rem)] sm:top-[calc(100%-30rem)]"
              style={{ height: '124%', top: '-5.5%', left: '0', opacity: '1' }}
            >
              <img src={headerimage} className="w-full h-full object-cover" alt="Topography deformation and measurement" />
            </div> */}
          </div>
        </div>
      </div>
      </Container>
    </main>
  );
}

export default Header;