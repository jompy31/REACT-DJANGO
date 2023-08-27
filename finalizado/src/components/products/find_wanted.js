import React from 'react';
import Image from '../../assets/IMAGO/chips.jpg';
import SectionHead from './SectionHead';
import { GiCutDiamond } from 'react-icons/gi';
// import { values } from '../data';
import Card_ from '../../UI/Card_';
import { Link } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai'
import { FaTemperatureHigh } from 'react-icons/fa';
import { IoMdThermometer } from 'react-icons/io';
import { BsThermometerHalf } from 'react-icons/bs';
import { BiRuler } from 'react-icons/bi';
import { HiOutlineCamera } from 'react-icons/hi';
import { RiScissorsCutFill } from 'react-icons/ri';
import { GiWireframeGlobe } from 'react-icons/gi';
import { HiOutlineScale } from 'react-icons/hi';
import { GiProcessor } from 'react-icons/gi';


const values = [
  {
      id: 1,
      icon: <FaTemperatureHigh/>,
      title: "-65 to 400°C",
  },
  {
      id: 2,
      icon: <IoMdThermometer/>,
      title: "Top and bottom heating",
  },
  {
      id: 3,
      icon: <BsThermometerHalf/>,
      title: "Heating ramp up to +6°C/s",
  },
  {
      id: 4,
      icon: <BiRuler/>,
      title: "Z resolution <1µm",
  },
  {
      id: 5,
      icon: <HiOutlineCamera/>,
      title: "Ultra high camera resolution ",
  },
  {
      id: 6,
      icon: <RiScissorsCutFill/>,
      title: "Measurement of discontinuities",
  },
  {
      id: 7,
      icon: <GiWireframeGlobe/>,
      title: "Full field acquisition in <1s",
  },
  {
      id: 8,
      icon: <HiOutlineScale/>,
      title: "Samples up to 800mm x 600mm",
  },
  {
      id: 9,
      icon: <GiProcessor/>,
      title: "Automatic post processing",
  }
]

const Values = () => {
  return (
    <section
      className='values'
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className='container values__container'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >



            <Card_ className='values__value'>
            <h2 style={{ color: 'white' }}>Didn't find what you wanted?</h2>
          <p style={{ color: 'white' }}>Request information or quote</p> 
              {/* <h4>CONTACT US</h4> */}
              <Link to="/contact" className="btn sm">
                  CONTACT US<AiFillCaretRight />
                </Link>
            </Card_>
      </div>
    </section>
  );
};

export default Values;
