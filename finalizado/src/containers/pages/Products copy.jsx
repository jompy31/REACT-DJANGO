import React from 'react';
import Compact2 from '../../components/products/compact_2';
import Compact3 from '../../components/products/compact_3';
import Compact3XL from '../../components/products/compact_3XL';
import Table_Top from '../../components/products/tdm_table_top';
import Rt_3dSensor from '../../components/products/rt-3d-sensor';
import Software from '../../components/products/software';
import Find from '../../components/products/find_wanted';
import Applications from '../../components/products/application';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';

function showSection(sectionName) {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.classList.contains(sectionName)) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

const Gallery = () => {
  return (
    <>
      <div>
        <Navbar />
        {window.innerWidth > 768 && (
          <div className="buttons_nav space-y-2 md:space-y-0 md:flex md:flex-wrap">
            <button onClick={() => showSection('APPLICATIONS')} className="w-full md:w-auto md:mr-2 sm:mr-0 text-base md:text-xxs sm:text-xs">APPLICATIONS</button>
            <button onClick={() => showSection('TDM_Compact_3')} className="w-full md:w-auto md:mr-2 text-base md:text-xxs sm:text-xs">COMPACT 3</button>
            <button onClick={() => showSection('TDM_Compact_3-XL')} className="w-full md:w-auto md:mr-2 text-base md:text-xxs sm:text-xs">COMPACT 3-XL</button>
            <button onClick={() => showSection('TDM_TABLE_TOP')} className="w-full md:w-auto md:mr-2 text-base md:text-xxs sm:text-xs">TABLE TOP</button>
            <button onClick={() => showSection('TDM_COMPACT_2')} className="w-full md:w-auto md:mr-2 text-base md:text-xxs sm:text-xs">COMPACT 2</button>
            <button onClick={() => showSection('RT_3D_SENSOR')} className="w-full md:w-auto md:mr-2 text-base md:text-xxs sm:text-xs">RT-3D SENSOR</button>
            <button onClick={() => showSection('SOFTWARE&OPTIONS')} className="w-full md:w-auto md:mr-2 text-base md:text-xxs sm:text-xs">SOFTWARE & OPTIONS</button>
          </div>
        )}
        
        <br/><br/>
        
        <section className="TDM_Compact_3">
          <h2>TDM Compact 3</h2>
          <p>
            With the scanning and multi-scale option.
          </p>
          <Compact3 />
        </section>

        <section className="TDM_Compact_3-XL">
          <h2>TDM COMPACT 3-XL</h2>
          <p>
            With the scanning and multi-scale option.
          </p>
          <Compact3XL />
        </section>

        <section className="TDM_TABLE_TOP">
          <h2>TDM TABLE TOP</h2>
          <p>
            TDM TT does not require compressed air or exhaust.
          </p>
          <Table_Top />
        </section>

        <section className="TDM_COMPACT_2">
          <h2>TDM COMPACT 2</h2>
          <p>
            profile on the sample under test.
          </p>
          <Compact2 />
        </section>

        <section className="RT_3D_SENSOR">
          <h2>RT-3D SENSOR</h2>
          <p>
            complex of devices.
          </p>
          <Rt_3dSensor />
        </section>

        <section className="SOFTWARE&OPTIONS">
          <Software />
        </section>

        <section className="APPLICATIONS">
          <Applications />
        </section>

        <section className="find">
          <Find />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Gallery;
