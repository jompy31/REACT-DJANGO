import React, { useState } from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import { IoMdThermometer } from 'react-icons/io';
import { BsThermometerHalf } from 'react-icons/bs';
import { BiRuler } from 'react-icons/bi';
import { HiOutlineCamera } from 'react-icons/hi';
import { RiScissorsCutFill } from 'react-icons/ri';
import { GiWireframeGlobe } from 'react-icons/gi';
import { HiOutlineScale } from 'react-icons/hi';
import { GiProcessor } from 'react-icons/gi';
import Productvue from '../../components/products/Productvue';
import Compact2 from '../../components/products/compact_2';
import Compact3 from '../../components/products/compact_3';
import Compact3XL from '../../components/products/compact_3XL';
import Table_Top from '../../components/products/tdm_table_top';
import Rt_3dSensor from '../../components/products/rt-3d-sensor';
import Software from '../../components/products/software';
import Options from '../../components/products/options';
import Find from '../../components/products/find_wanted';
import Applications from '../../components/products/application';
import HeaderImage from '../../assets/IMAGO/Pics/Insidix-fond-TDM.jpg';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';
import Header from "../dashboard/Header";

const Manage_product = () => {
  const [currentSection, setCurrentSection] = useState(null);

  const sections = [
    { name: 'APPLICATIONS', component: Applications },
    { name: 'TDM_Compact_3', component: Compact3 },
    { name: 'TDM_Compact_3-XL', component: Compact3XL },
    { name: 'TDM_TABLE_TOP', component: Table_Top },
    { name: 'TDM_COMPACT_2', component: Compact2 },
    { name: 'RT_3D_SENSOR', component: Rt_3dSensor },
    { name: 'SOFTWARE&OPTIONS', component: Software },
  ];

  const handleSectionClick = (sectionName) => {
    if (currentSection === sectionName) {
      setCurrentSection(null);
    } else {
      setCurrentSection(sectionName);
    }
  };

  const isSectionExpanded = (sectionName) => {
    return currentSection === sectionName;
  };

  return (
    <>
      <div>
        <Navbar />
        <br/><br/><br/><br/>
        <Header title="Products" subtitle="Managing the Products list" />
        <div className="grid grid-cols-3 gap-4">
            
          {sections.map((section) => (
            <div
              key={section.name}
              className={`p-4 border border-gray-200 ${
                isSectionExpanded(section.name) ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleSectionClick(section.name)}
            >
              <h2 className="text-lg font-bold">{section.name}</h2>
              <div className="flex justify-end mt-4">
          <button className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            EDIT
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            DELETE
          </button>
        </div>
            </div>
          ))}
        </div>
        {sections.map((section) => (
          <div
            key={section.name}
            className={`fixed top-0 left-0 z-50 w-full h-full bg-white overflow-y-auto ${
              isSectionExpanded(section.name) ? 'block' : 'hidden'
            }`}
          >
            <div className="p-4">
              <h2 className="text-lg font-bold">{section.name}</h2>
              {section.component && <section.component />}
              <button
                className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600"
                onClick={() => setCurrentSection(null)}
              >
                Cerrar (x)
              </button>
            </div>
          </div>
        ))}
        <Footer />
      </div>
    </>
  );
};

export default Manage_product;
