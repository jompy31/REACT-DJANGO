import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiOpenaigym } from 'react-icons/si';
import SectionHead from './SectionHead';
import Card from '../../UI/Card';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';

const program = [
  {
    id: 1,
    icon: <SiOpenaigym />,
    title: 'TDM COMPACT 3',
    path: '/products#TDM_COMPACT_3',
    description: 'The TDM Compact 3 is a versatile instrument for a wide array of applications in the areas of process development, failure analysis, reliability, and quality control.',
    imageName: 'CPT3',
  },
  {
    id: 2,
    icon: <SiOpenaigym />,
    title: 'TDM COMPACT 3-XL',
    path: '/products#TDM_COMPACT_3-XL',
    description: 'The TDM XL complements the TDM Compact.',
    imageName: 'CPT3XL',
  },
  {
    id: 3,
    icon: <SiOpenaigym />,
    title: 'TDM TABLE TOP',
    path: '/products#TDM_TABLE_TOP',
    description: 'The TDM Table Top is an affordable solution for the lab environment. It is compact, self-contained, fluid-free, and easily fits on a bench-top.',
    imageName: 'Tabletop',
  },
  {
    id: 4,
    icon: <SiOpenaigym />,
    title: 'TDM Compact 2',
    path: '/products#TDM_COMPACT_2',
    description: 'The TDM Compact 2 is a versatile instrument for various applications in process development, failure analysis, reliability, and quality control.',
    imageName: 'Compact',
  },
];

export default function Product() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const token = useSelector(state => state.authentication.token);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = () => {
    FileDataService.getAll(token)
      .then(response => {
        const fetchedPrograms = response.data.filter(file => program.some(p => p.imageName === file.name));
        setPrograms(fetchedPrograms);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLearnMore = (programItem) => {
    setSelectedProgram(programItem);
  };

  const handleClose = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="relative w-full max-w-screen-xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <SectionHead
        title="Warpage Measurement TDM Systems"
        description="Choose from a wide range of programs to suit your needs"
      />
      <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-4 lg:max-w-none">
        {programs.map((programItem) => {
          const programInfo = program.find(p => p.imageName === programItem.name);
          return (
            <div
              key={programItem.id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 sm:h-auto"
                  src={programItem.file}
                  alt={programItem.name}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">{programInfo.title}</p>
                </div>
                <div className="mt-4">
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-sm"
                    style={{
                      textDecoration: 'none',
                    }}
                    onClick={() => handleLearnMore(programInfo)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedProgram && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="z-20 bg-white rounded-lg p-6">
            <button
              className="text-blue-500 hover:text-gray-700 focus:outline-none"
              style={{ float: 'right' }}
              onClick={handleClose}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedProgram.title}</h2>
            <div className="overflow-y-auto max-h-80">
              <p>{selectedProgram.description}</p>
            </div>
            <br />
            <Link
              to={selectedProgram.path}
              className="text-white bg-blue-900 hover:bg-blue-600 rounded-md px-4 py-2 text-sm"
              style={{ textDecoration: 'none' }}
            >
              Learn More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
