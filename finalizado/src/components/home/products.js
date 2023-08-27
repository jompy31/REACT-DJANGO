import React, { useState, useEffect } from 'react';
import SectionHead from './SectionHead';
import Card from '../../UI/Card_';
import { FaTemperatureHigh } from 'react-icons/fa';
import { IoMdThermometer } from 'react-icons/io';
import { BsThermometerHalf } from 'react-icons/bs';
import { BiRuler } from 'react-icons/bi';
import { HiOutlineCamera, HiOutlineScale } from 'react-icons/hi';
import { RiScissorsCutFill } from 'react-icons/ri';
import { GiWireframeGlobe, GiProcessor } from 'react-icons/gi';
import FileDataService from '../../services/files';
import { useSelector } from 'react-redux';

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
        title: "Ultra high camera resolution",
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
];

const Products = () => {
    const [imageUrl, setImageUrl] = useState('');
    const token = useSelector(state => state.authentication.token);

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = () => {
        FileDataService.getAll(token)
            .then(response => {
                const chipsImage = response.data.find(file => file.name === 'Chips');
                if (chipsImage) {
                    setImageUrl(chipsImage.file);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <section className='values' style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container values__container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '110vh'}}>
                <div className="values__right ">
                    <br/>

                    <h2 style={{ color: 'white' }} >WARPAGE CAPABILITY AT A GLANCE</h2>
                    <p>
                        {/* WARPAGE CAPABILITY AT A GLANCE */}
                    </p>
                    <div className="values__wrapper">
                        {
                            values.map(({id, icon, title}) => {
                                return <Card key={id} className="values__value">
                                    <span>{icon}</span>
                                    <h4>{title}</h4>
                                    {/* <small>{desc}</small> */}
                                </Card>
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products;
