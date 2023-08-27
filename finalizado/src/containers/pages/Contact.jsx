import React, { useState, useEffect } from 'react';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';
import { Link } from 'react-router-dom';
import DistImg from '../../assets/IMAGO/Pics/distributors-map.png'
import Contact_header from '../../components/contact/contact';
import Distributors from '../../components/contact/distributors';
import axios from 'axios';


function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [attachment, setAttachment] = useState(null); 
  const [validCaptcha, setValidCaptcha] = useState(false);
  const [captcha, setCaptcha] = useState('');

  const generateRandomCaptcha = () => {
    // Genera un captcha aleatorio con números y letras
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }
    return captcha;
  };
  const generateCaptcha = () => {
    // Lógica para generar un captcha aleatorio
    const randomCaptcha = generateRandomCaptcha();
    setCaptcha(randomCaptcha);
    setValidCaptcha(false);
  };
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleCaptchaChange = (e) => {
    const inputCaptcha = e.target.value;
    if (inputCaptcha === captcha) {
      setValidCaptcha(true);
    } else {
      setValidCaptcha(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validCaptcha) {
      alert("Please enter the correct captcha.");
      return;
    }
    const fullMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\n${message}`;

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', fullMessage);
    formData.append('from_email', 'consultas@iriquiqui.com'); // Cambiar por tu correo electrónico
    formData.append('recipient_list', 'jpbcserviciotecnico@gmail.com');
    if (attachment) {
      formData.append('attachments', attachment); // Append the attached file
    }

    sendEmail(formData);
  };
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };
  const sendEmail = (formData) => {
    axios
      .post('https://jompy31.pythonanywhere.com/send-email/', formData)
      .then((response) => {
        console.log(response.data);
        // Agregar cualquier mensaje de éxito o acción que desees aquí
      })
      .catch((error) => {
        console.error(error);
        // Manejar el error de manera apropiada
      });
  };


  return (
    <div>
      <Navbar />
      <div data-scroll-section className="pt-28 ">
        
      {/* <h1 className="text-2xl font-medium mb-4 text-center">Sales and Service Locations</h1> */}
      <Contact_header />
      <br/><br/><br/><br/><br/><br/>
      <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-6xl text-black font-bold tracking-tight pb-0 text-center"
            style={{ textShadow: '0 0 2px white', color: 'black' }}>
        Distributors
        </h1>
      <Distributors />
      <br/><br/><br/><br/><br/><br/>
        <div className="max-w-lg mx-auto text-center">
     
        <h1 className="text-2xl font-medium mb-4 text-center">Contact Us</h1>
          <p className="text-lg mb-4">
            PLEASE COMPLETE THE INFORMATION REQUESTED TO OBTAIN ADDITIONAL INFORMATION ON ANY OF OUR SERVICES OR PRODUCTS. IF YOU ARE REQUESTING A QUOTE FOR LABORATORY SERVICES, YOU MAY ALSO UPLOAD COMPONENT INFORMATION (A PICTURE OR ANY OTHER RELEVANT DATA).
          </p>
        </div>
        <div>
          <div className="mt-8 space-y-6">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="name" className="block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full shadow-sm sm:text-sm border rounded-md"
                      style={{
                        borderColor: '#000',             
                        outline: 'none',                 
                        transition: 'border-color 0.3s' 
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'blue'; 
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#000';  
                      }}
                    />

                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full shadow-sm sm:text-sm border rounded-md"
                      style={{
                        borderColor: '#000',             // Borde negro permanente
                        outline: 'none',                 // Elimina el contorno al hacer clic
                        transition: 'border-color 0.3s'  // Agrega una transición suave al cambio de color
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'blue';  // Cambia a azul cuando se enfoca
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#000';  // Vuelve al borde negro cuando pierde el foco
                      }}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 block w-full shadow-sm sm:text-sm border rounded-md"
                      style={{
                        borderColor: '#000',             
                        outline: 'none',                 
                        transition: 'border-color 0.3s' 
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'blue'; 
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#000';  
                      }}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-1 block w-full shadow-sm sm:text-sm border rounded-md"
                      style={{
                        borderColor: '#000',             
                        outline: 'none',                 
                        transition: 'border-color 0.3s' 
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'blue'; 
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#000';  
                      }}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-1 block w-full shadow-sm sm:text-sm border rounded-md"
                      style={{
                        borderColor: '#000',             
                        outline: 'none',                 
                        transition: 'border-color 0.3s' 
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'blue'; 
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#000';  
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 block w-full shadow-sm sm:text-sm border rounded-md"
                      style={{
                        borderColor: '#000',             
                        outline: 'none',                 
                        transition: 'border-color 0.3s' 
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'blue'; 
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#000';  
                      }}
                    ></textarea>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
                      Attachment
                    </label>
                    <input
                      type="file"
                      name="attachment"
                      id="attachment"
                      onChange={handleFileChange}
                      className="mt-1 block w-full shadow-sm sm:text-sm border rounded-md"
                      style={{
                        borderColor: '#000',             
                        outline: 'none',                 
                        transition: 'border-color 0.3s' 
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'blue'; 
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#000';  
                      }}
                    />
                  </div>
                 
                  <div className="col-span-2">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <img src={`https://dummyimage.com/100x40/000000/ffffff&text=${captcha}`} alt="Captcha" className="mr-2" />
                      <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={generateCaptcha}>
                        Refresh Captcha
                      </button>
                    </div>
                    <input
                      type="text"
                    //   value={captcha}
                      onChange={handleCaptchaChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                      required
                    />
                    {!validCaptcha && <p className="text-red-500">Please enter the correct captcha.</p>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={!validCaptcha}>
                      Submit
                    </button>
                  </div>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      disabled={!validCaptcha}
                      className="inline-flex justify-center py-4 px-8 border border-transparent shadow-sm text-sm font-large rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div className="max-w-lg mx-auto mt-8">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.9004304027377!2d5.695411315430348!3d45.17100317909955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478aaf18fc92559f%3A0x709642f0ed84eb2!2sInsidix!5e0!3m2!1sen!2sfr!4v1621536909954!5m2!1sen!2sfr"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
