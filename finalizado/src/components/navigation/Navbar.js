import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/IMAGO/Pics/Logo (1).png';
import { FiHome, FiX, FiMenu, FiPackage, FiMonitor, FiSettings, FiBell, FiBookOpen, FiPhone, FiServer, FiLayers, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaUser, FaSignOutAlt, FaFolder } from 'react-icons/fa';
import { Popover, Transition } from '@headlessui/react';
import DotLoader from 'react-spinners/DotLoader';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { setAuthentication } from '../../redux/actions/authActions';

import { AuthContext } from '../login/AuthContext';

const Navbar = ({ logout, setIsSidebar }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const token = useSelector(state => state.authentication.token);
  const user = useSelector(state => state.authentication.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [showCurrentUserModal, setShowCurrentUserModal] = useState(false);
  
  const fetchCurrentUserData = () => {
    const currentUser = localStorage.getItem('currentUser');
    setCurrentUser(JSON.parse(currentUser));
  };
  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      dispatch(setAuthentication(storedToken, storedUser));
    }
    setLoading(false);
  }, []);

  function scrollFunction() {
    if (document.getElementById('navbar')) {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('navbar').classList.add('shadow-navbar');
        document.getElementById('navbar').classList.add('bg-white');
      } else {
        document.getElementById('navbar').classList.remove('shadow-navbar');
        document.getElementById('navbar').classList.remove('bg-white');
      }
    }
  }

  const handleCurrentUser = () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setShowCurrentUserModal(true);
    }
  };


  const solutions = [
    {
      name: 'Technology',
      description: 'Measure actions your users take',
      href: '/technology',
      icon: FiMonitor,
    },
    {
      name: 'Products',
      description: 'Create your own targeted content',
      href: '/products',
      icon: FiPackage,
      subOptions: [
        {
          name: 'Systems',
          description: 'Explore our systems',
          href: '/products',
          icon: FiServer,
        },
        {
          name: 'Applications',
          description: 'Discover our applications',
          href: '/application',
          icon: FiLayers,
        },
      ],
    },
    {
      name: 'Services',
      description: 'Keep track of your growth',
      href: '/services',
      icon: FiSettings,
    },
    {
      name: 'News',
      description: 'Stay updated with the latest news',
      href: '/news',
      icon: FiBell,
    },
    {
      name: 'Blog',
      description: 'Read our latest blog posts',
      href: '/blog',
      icon: FiBookOpen,
    },
    {
      name: 'Contact',
      description: 'Get in touch with us',
      href: '/contact',
      icon: FiPhone,
    },
  ];

  const handleProductsMenuMouseEnter = () => {
    setShowProductsMenu(true);
  };

  const handleProductsMenuMouseLeave = () => {
    setShowProductsMenu(false);
  };

  const handleSubOptionsMouseEnter = () => {
    setShowSubOptions(true);
  };

  const handleSubOptionsMouseLeave = () => {
    setShowSubOptions(false);
  };

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.clear();
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
    window.location.reload();
  };

  useEffect(() => {
    let timer;
    if (showProductsMenu) {
      timer = setTimeout(() => {
        setShowProductsMenu(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showProductsMenu]);

  return (
    <nav
      id="navbar"
      className="bg-white transition duraction-300 easy-in-out fixed inset-x-0 top-0 w-full h-15vh z-50"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl font-bold text-blue-500">
            <img src={logo} alt="Topography Deformation Measurement Technology (TDM) Logo" width={200} height={200} className="" />
          </Link>
        </div>

        {/* Menu en pantallas medianas y grandes */}
        <div className="-ml-4 -mt-2 hidden lg:flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
          {solutions.map((item, index) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => {
                if (item.name === 'Products') {
                  setShowProductsMenu(true);
                }
              }}
              onMouseLeave={() => {
                if (item.name === 'Products') {
                  setShowProductsMenu(false);
                  setShowSubOptions(false);
                }
              }}
              style={{ zIndex: showProductsMenu ? 999 : 'auto' }}
            >
              <NavLink
                to={item.href}
                className="text-xl inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-blue-500 transition duration-300 ease-in-out mx-4"
                activeclassname="border-blue-500"
              >
                {item.name}
              </NavLink>
              {item.name === 'Products' && showProductsMenu && item.subOptions && (
                <div
                  className="absolute left-0 mt-2 py-2 bg-white border border-gray-200 rounded-md shadow-lg"
                  onMouseEnter={() => {
                    setShowProductsMenu(true);
                    setShowSubOptions(true);
                  }}
                  onMouseLeave={() => {
                    setShowSubOptions(false);
                  }}
                  style={{ zIndex: showSubOptions ? 999 : 'auto', margin: 0 }} // Agregamos margin: 0
                >
                  {item.subOptions.map((subOption) => (
                    <NavLink
                      key={subOption.name}
                      to={subOption.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      activeclassname="bg-blue-500 text-white"
                      onMouseEnter={() => {
                        setShowSubOptions(true);
                      }}
                      onMouseLeave={() => {
                        setShowSubOptions(false);
                      }}

                      style={{ padding: '0.5rem 1rem', margin: 0 }} // Ajustamos padding y margin a 0
                    >
                      <subOption.icon className="mr-2 h-5 w-5 text-blue-500" />
                      {subOption.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          {user !== null ? (
            <>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                        ${open ? 'text-blue-500' : 'text-black'}
                        nav-link flex items-center focus:outline-none px-3 py-2 text-sm font-small leading-6
                        border-b-2 border-white hover:border-blue-500 transition duration-300 ease-in-out mx-4
                      `}
                    >
                      {user} 
                      {open ? (
                        <FiChevronUp className="ml-1 w-5 h-5" />
                      ) : (
                        <FiChevronDown className="ml-1 w-5 h-5" />
                      )}
                    </Popover.Button>

                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Popover.Panel
                        static
                        className="absolute z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
                      >
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleCurrentUser}
                          >
                            <FaUser className="mr-2 h-5 w-5 text-blue-500" />
                            Profile
                          </button>
                            {currentUser && currentUser.staff_status === 'user' && (
                                <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/files"}>
                                <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                                Files
                              </Link>
                            )}
                            {currentUser && currentUser.staff_status === 'administrator' && (
                                <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/files"}>
                                <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                                Files
                              </Link>
                            )}
                          {/* <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/files"}>
                            <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                            Files
                          </Link> */}
                          {currentUser && currentUser.staff_status === 'administrator' && (
                                <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/user"}>
                                <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                                User
                              </Link> 
                            )}
                          {/* <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/user"}>
                            <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                            Usuario
                          </Link> */}
                          <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/calendar"}>
                            <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                            Calendar
                          </Link>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleLogout}
                          >
                            <FaSignOutAlt className="mr-2 h-5 w-5 text-blue-500" />
                            Logout
                          </button>
 
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </>
          ) : (
            <>
              {user === null && (
                <Link
                  to="/login"
                  className="inline-flex ml-12 items-center rounded-md border border-transparent bg-blue-button px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                  <DotLoader className="ml-3 -mr-1 h-5 w-5" loading={loading} size={20} color="#fff" />
                </Link>
              )}
            </>
          )}
        </div>

        {/* Icono del menú en dispositivos móviles */}
        <div className="-ml-4 -mt-2 lg:hidden flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2 max-w-screen-sm mx-auto">
          <button
            onClick={handleMobileMenuClick}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring"
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <FiMenu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

        </div>
      </div>

      {/* Menú desplegable en dispositivos móviles */}
      <Transition
        show={isMobileMenuOpen}
        as={React.Fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute top-16 inset-x-0 transform origin-top-right transition duration-300 ease-in-out lg:hidden z-40">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
              {solutions.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className="block rounded-md py-2 px-3 text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 transition duration-150 ease-in-out"
                  activeclassname="text-blue-500"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </NavLink>
              ))}


              
              {user !== null ? (

              <div className="py-1">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleCurrentUser}
                >
                  <FaUser className="mr-2 h-5 w-5 text-blue-500" />
                  Profile
                </button>
                  {currentUser && currentUser.staff_status === 'user' && (
                      <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/files"}>
                      <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                      Files
                    </Link>
                  )}
                  {currentUser && currentUser.staff_status === 'administrator' && (
                      <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/files"}>
                      <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                      Files
                    </Link>
                  )}
                {/* <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/files"}>
                  <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                  Files
                </Link> */}
                {currentUser && currentUser.staff_status === 'administrator' && (
                      <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/user"}>
                      <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                      User
                    </Link> 
                  )}
                {/* <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/user"}>
                  <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                  Usuario
                </Link> */}
                <Link className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"/calendar"}>
                  <FaFolder className="mr-2 h-5 w-5 text-blue-500" />
                  Calendar
                </Link>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2 h-5 w-5 text-blue-500" />
                  Logout
                </button>

              </div>
              ) : (
                <>
                  {user === null && (
                    <Link
                      to="/login"
                      className="inline-flex ml-12 items-center rounded-md border border-transparent bg-blue-button px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Login
                      <DotLoader className="ml-3 -mr-1 h-5 w-5" loading={loading} size={20} color="#fff" />
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Transition>

      {/* Modal de perfil del usuario */}
      {showCurrentUserModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <div className="flex justify-end">
              <button
                onClick={() => setShowCurrentUserModal(false)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div>
              {currentUser && (
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold" style={{ paddingRight: '20px' }}>First Name:</td>
                      <td>{currentUser.first_name}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold" style={{ paddingRight: '20px' }}>Last Name:</td>
                      <td>{currentUser.last_name}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold" style={{ paddingRight: '20px' }}>Email:</td>
                      <td>{currentUser.email}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold" style={{ paddingRight: '20px' }}>User Type:</td>
                      <td>{currentUser.staff_status}</td>
                    </tr>
                  </tbody>
                </table>

              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
