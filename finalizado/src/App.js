import React, { createContext, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Error404 from '../src/containers/errors/Error404';
import Home from '../src/containers/pages/Home';
import Technology from '../src/containers/pages/Technology';
import Products from '../src/containers/pages/Products';
import Services from '../src/containers/pages/Services';
import News from '../src/containers/pages/News';
import Blog from '../src/components/manager/manage_blog';
import Contact from '../src/containers/pages/Contact';
import Calendar from '../src/components/backend/calendar';
import Login from '../src/components/login/login';
import Sidebar from '../src/components/navigation/sidebar';
import Navbar from '../src/components/navigation/Navbar';
import Contacts from '../src/components/manager/contacts_info';
import Signup from '../src/components/login/signup';
import WhyTDM from '../src/components/home/why_tdm';
import Application from '../src/components/products/application';
import ManageBlog from '../src/components/manager/manage_blog copy.js';
import ResetPassword from '../src/components/home/reset_password';
import ResetPasswordConfirm from '../src/components/home/ResetPasswordConfirm';
import ResetPasswordUser from './components/login/resetpassworduser';
import { AuthProvider } from './components/login/AuthContext';
import TodoDataService from './services/todos';
import UserList1 from './components/CurrentUser';
import { Provider } from 'react-redux';
import Files from '../src/components/backend/files';
import Files_frontend from '../src/components/backend/files_frontend.js';
import UserList from './components/backend/usuarios';
import store from './redux/store';
import  Register from './components/backend/register';

import { Helmet } from 'react-helmet';
import Files_home from './components/backend/files_home';
import Files_technology from './components/backend/files_technology';
import Files_products from './components/backend/files_products';
import Files_services from './components/backend/files_services';
import Files_news from './components/backend/files_news';
import Files_contact from './components/backend/files_contact';
import Files_aplication from './components/backend/files_aplications';


// Componente ScrollToTop para desplazarse al principio de la página en cada cambio de ruta
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const AuthContext = createContext();

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (user = null) => {
    TodoDataService.login(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(e => {
        console.log('login', e);
        setError(e.toString());
      });
  };

  const logout = () => {
    setToken('');
    setUser('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.clear();
    window.location.reload();
  };

  const signup = (user = null) => {
    TodoDataService.signup(user)
      .then(response => {
        login(user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      })
      .catch(e => {
        console.log(e);
        setError(e.toString());
      });
  };

  return (
    <Provider store={store}>
    <AuthProvider value={{ token, login, logout }}>
      <Router>
        <ScrollToTop /> {/* Agregar el componente ScrollToTop */}
        <Sidebar isSidebar={isSidebar} />
        <Navbar user={user} token={token} logout={logout} setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>TDM is the expert in Topography, Deformation, Measurement.- Home</title>
                  <meta name="description" content="TDM is an expert in Topography, Deformation, and Measurement. We offer services to assess, simulate, and predict the behavior of complex devices under thermal stress. Request information, schedule free sample testing, and explore our services." />
                  {/* Agrega otras metaetiquetas SEO aquí, por ejemplo: */}
                  <meta name="keywords" content="Topography, Deformation, Measurement, Experts, Services, Free Sample Testing, Complex Devices, Thermal Stress, Simulation, Prediction." />
                </Helmet>
                <Home />
              </>
            }
          />
          <Route
            path="/technology"
            element={
              <>
                <Helmet>
                  <title>TDM is the expert in Topography, Deformation, Measurement - Tecnology</title>
                  <meta name="description" content="Explore the advanced TDM (Topography Deformation Measurement) technology for various applications in process development, failure analysis, reliability, and quality control. TDM utilizes a patented method to perform 3D measurements of complex objects under thermal stress, helping engineers understand, simulate, and predict behavior during product development. Learn how major electronics and semiconductor companies use TDM for quality control and R&D purposes" />
                  {/* Agrega otras metaetiquetas SEO aquí, por ejemplo: */}
                  <meta name="robots" content="index, follow" />
                  <meta name="keywords" content="TDM, Topography Deformation Measurement, 3D Measurements, Thermal Stress, Product Development, Failure Analysis, Reliability, Quality Control, Electronics, Semiconductor, R&D, Patented Method, Versatile Technology, High-resolution Sensors, Scanning Imaging, Multi-Scale." />
                </Helmet>
                <Technology />
              </>
            }
          />
           <Route
            path="/products"
            element={
              <>
                <Helmet>
                  <title>TDM is the expert in Topography, Deformation, Measurement - Products</title>
                  <meta name="description" content="Explore our range of advanced TDM products, including Compact 2, Compact 3, Compact 3-XL, TDM Table Top, RT-3D Sensor, and Software & Options. These cutting-edge instruments offer scanning and multi-scale options, making them versatile tools for various applications in product development and quality control. Discover how TDM technology enables engineers to perform 3D measurements of complex objects under thermal stress, simulate behavior, and predict performance." />
                  <meta name="keywords" content="TDM Products, Compact 2, Compact 3, Compact 3-XL, TDM Table Top, RT-3D Sensor, Software & Options, Scanning, Multi-Scale, 3D Measurements, Thermal Stress, Product Development, Quality Control, Simulate Behavior, Predict Performance, Cutting-edge Instruments." />
                </Helmet>
                <Products />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Helmet>
                  <title>TDM is the expert in Topography, Deformation, Measurement - Services </title>
                  <meta name="description" content="Experience the unique capabilities and features of our TDM (Topography Deformation Measurement) system with free sample analysis and consulting services. Our lab service offers complete outsourcing of thermal deformation measurement testing and analysis, providing expertise for complex issues and supplemental resources for large or time-sensitive projects. Request your free sample testing now and explore the benefits of TDM technology." />
                  <meta name="keywords" content="TDM, Topography Deformation Measurement, Thermal Deformation Measurement, Lab Service, Free Sample Analysis, Consulting Services, Non-Destructive Testing, NDT, Predictive Approaches, Complex Issues, Supplemental Resources, TDM Technology, Request Free Sample Testing, Benefits of TDM." />
                </Helmet>
                <Services />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <Helmet>
                  <title>TDM is the expert in Topography, Deformation, Measurement  - News</title>
                  <meta name="description" content="Discover the latest publications from TDM, featuring articles on Nepcon Japan electronics tech show, Coefficient of Thermal Expansion (CTE) measurement with TDM systems, and an overview of Topography Deformation Measurement Systems. Explore insightful content with images, videos, and PDFs to learn about the unique capabilities of our TDM technology." />
                  <meta name="keywords" content="TDM, Topography Deformation Measurement, Nepcon Japan, Electronics Tech Show, Coefficient of Thermal Expansion, CTE Measurement, TDM Systems, Articles, Publications, Images, Videos, PDFs, Technology, Unique Capabilities." />
                </Helmet>
                <News />
              </>
            }
          />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route
            path="/blog"
            element={
              <>
                <Helmet>
                  <title>TDM Blog - Discover the Latest News and Insights</title>
                  <meta name="description" content="Explore the TDM blog for the latest news, insights, and updates. Read articles, view images, watch videos, and interact with the TDM community. Join us now!" />
                  <meta name="keywords" content="TDM Blog, News, Insights, Articles, Images, Videos, Community, Updates, Technology" />
                </Helmet>
                <Blog />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Helmet>
                  <title>Tu Sitio Web - Contacto</title>
                  <meta name="description" content="Contáctanos para obtener más información o resolver cualquier consulta." />
                </Helmet>
                <Contact />
              </>
            }
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route path="/current_user" element={<UserList1 token={token} user={user}/>} />
          <Route path="/register" element={<Register signup={signup} />} />
          <Route path="/customer" element={  <>
                <Helmet>
                  <title>TDM Blog - Discover the Latest News and Insights</title>
                  <meta name="description" content="Explore the TDM blog for the latest news, insights, and updates. Read articles, view images, watch videos, and interact with the TDM community. Join us now!" />
                  <meta name="keywords" content="TDM Blog, News, Insights, Articles, Images, Videos, Community, Updates, Technology" />
                </Helmet>
                <Contacts token={token} user={user} /></>} />
          <Route path="/whytdm" element={<WhyTDM />} />
          <Route path="/application" element={<Application />} />
          <Route path="/manage_blog" element={<ManageBlog token={token} user={user} />} />
          <Route exact path="/reset_password" element={<ResetPassword />} />
          <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          {/* <Route exact path="/resetpassworduser" element={<ResetPasswordUser />} /> */}
          <Route exact path="/reset_password_user/:reset_token" element={<ResetPasswordUser />} />
          
          <Route path="/files" element={<Files/>} />
          <Route path="/files_frontend" element={<Files_frontend/>} />
          <Route path="/files_home" element={<Files_home/>} />
          <Route path="/files_technology" element={<Files_technology/>} />
          <Route path="/files_products" element={<Files_products/>} />
          <Route path="/files_services" element={<Files_services/>} />
          <Route path="/files_news" element={<Files_news/>} />
          <Route path="/files_contact" element={<Files_contact/>} />
          <Route path="/files_application" element={<Files_aplication/>} />
          
          <Route path="/user" element={<UserList/>} />
          
        </Routes>
      </Router>
    </AuthProvider>
    </Provider>
  );
}

export default App;
