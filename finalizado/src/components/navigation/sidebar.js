import React, { useState, useEffect } from "react";
import SideNav, { Toggle, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiUserCheck, FiEdit, FiCalendar, FiBookOpen, FiPhone, FiMail, FiMonitor, FiPackage, FiSettings, FiBell } from "react-icons/fi";
import { VisibilityOutlined as VisibilityOutlinedIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
import "./sidebar.css";

function Sidebar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const fetchCurrentUserData = () => {
    const currentUser = localStorage.getItem('currentUser');
    setCurrentUser(JSON.parse(currentUser));
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.staff_status === 'administrator') {
      setIsSidebarVisible(true);
    } else {
      setIsSidebarVisible(false);
    }
  }, [currentUser]);

  const solutions = [
    {
      name: 'Manage Team',
      description: 'Admin the the 3 kind of users',
      href: '/user',
      icon: FiUsers,
    },
    {
      name: 'Customer',
      description: 'Customer information',
      href: '/customer',
      icon: FiUserCheck,
    },
    {
      name: 'Files',
      description: 'Edit Files to share',
      href: '/files',
      icon: FiEdit,
    },
    {
      name: 'Calendar',
      description: 'Edit Calendar',
      href: '/calendar',
      icon: FiCalendar,
    },
    {
      name: 'Blog',
      description: 'Read our latest blog posts',
      href: '/manage_blog',
      icon: FiBookOpen,
    },
    {
      name: 'Media Website',
      description: 'Modify language, zone time',
      href: '/files_frontend',
      icon: FiSettings,
    },
  ];

  

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  if (!isSidebarVisible) {
    return null;
  }

  return (
    <div className={`sidebar ${isSidebarExpanded ? '' : 'sidebar-collapsed'}`} style={{ background: isSidebarExpanded ? 'white' : 'transparent', color: 'blue', float: 'right' }}>
      <div style={{ flex: 1 }}></div>
      <SideNav
        style={{ background: isSidebarExpanded ? 'white' : 'transparent', color: 'blue' }}
        expanded={isSidebarExpanded} // Cambio aquí: usar directamente el valor de isSidebarExpanded
        onToggle={toggleSidebar} // Eliminar esta línea, ya no es necesaria
        onSelect={selected => {
          console.log(selected);
          navigate(selected);
        }}
      >
        <Toggle className="sidebar-toggle">
          {isSidebarExpanded ? (
            <VisibilityOutlinedIcon style={{ color: 'blue' }} />
          ) : (
            <VisibilityOffIcon style={{ color: 'blue' }} />
          )}
        </Toggle>
        {isSidebarExpanded && (
          <SideNav.Nav defaultSelected='home'>
            {solutions.map((solution, index) => (
              <NavItem key={`solution-${index}`} eventKey={solution.href} style={{ marginBottom: '20px' }}> 
                <NavIcon>
                  {isSidebarExpanded && (
                    <solution.icon size={22} style={{ color: 'blue' }} />
                  )}
                </NavIcon>
                <NavText className={isSidebarExpanded ? "" : "collapsed"} style={{ color: 'black' }}>
                  {solution.name}
                </NavText>
              </NavItem>
            ))}
            <NavItem>
              <NavText style={{ borderTop: '1px solid white' }}></NavText>
            </NavItem>
            {/* {reports.map((report, index) => (
              <NavItem key={`report-${index}`} eventKey={report.href}>
                <NavIcon>
                  {isSidebarExpanded && (
                    <report.icon size={18} style={{ color: 'blue' }} />
                  )}
                </NavIcon>
                <NavText className={isSidebarExpanded ? "" : "collapsed"} style={{ color: 'black' }}>
                  {report.name}
                </NavText>
              </NavItem>
            ))}
            <NavItem>
              <NavText style={{ borderTop: '1px solid white' }}></NavText>
            </NavItem> */}
            {/* {settings.map((setting, index) => (
              <NavItem key={`setting-${index}`} eventKey={setting.href}>
                <NavIcon>
                  {isSidebarExpanded && (
                    <setting.icon size={18} style={{ color: 'blue' }} />
                  )}
                </NavIcon>
                <NavText className={isSidebarExpanded ? "" : "collapsed"} style={{ color: 'black' }}>
                  {setting.name}
                </NavText>
              </NavItem>
            ))} */}
          </SideNav.Nav>
        )}
      </SideNav>
    </div>
  );
}

export default Sidebar;
