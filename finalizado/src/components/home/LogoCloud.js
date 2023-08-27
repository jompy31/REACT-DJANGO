import React, { useState, useEffect } from 'react';

export default function LogoCloud() {
  const data = [
    { label: 'No. Companies trusting TDM', value: 215 },
    { label: 'TDM Members', value: 200 },
    { label: 'TDM Projects Approved', value: 165 },
    { label: 'Projects Completed', value: 91 },
    { label: 'No. Countries with TDM Systems', value: 20 },
  ];

  const [counters, setCounters] = useState(data.map(() => 0));
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    if (hoverIndex !== null) {
      setCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[hoverIndex] = 0;
        return newCounters;
      });
    }
  }, [hoverIndex]);

  useEffect(() => {
    const incrementCounters = () => {
      setCounters((prevCounters) => {
        return prevCounters.map((counter, index) => {
          const targetValue = data[index].value;
          const increment = Math.ceil(targetValue / 50); // Ajusta la velocidad de incremento aquí
          const newValue =
            counter + increment <= targetValue ? counter + increment : targetValue;
          return newValue;
        });
      });
    };

    const interval = setInterval(incrementCounters, 50); // Ajusta la velocidad de la animación aquí

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div className="bg-transparent">
      <br/><br/><br/><br/>
      <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 w-screen ">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5 max-w-screen-xl mx-auto ">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex justify-center md:col-span-2 lg:col-span-1 rounded-lg p-4 m-2 w-full border border-blue-900 bg-white ${
                hoverIndex === index ? 'cursor-pointer expanded' : ''
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="text-center">
                <p className="text-8xl font-bold text-gold-500">{counters[index]}</p>
                <p className="text-md font-bold text-gold-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}
