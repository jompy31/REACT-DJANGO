import { connect } from 'react-redux';
import logo from '../../assets/IMAGO/Pics/Logo (1).png';
import { Link } from 'react-router-dom';

const navigation = {
  solutions: [
    { name: 'Schedulle a test', href: '/calendar' },
    { name: 'Why TDM', href: '/whytdm' },
  ],
  support: [{ name: 'Contact us', href: '/contact' }],
  company: [
    { name: 'Technology', href: '/technology' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'News', href: '/news' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'BGA 21 Units', href: '/application' },
    { name: 'Solder Bump', href: '/application' },
    { name: 'Connectors', href: '/application' },
    { name: 'IGBT', href: '/application' },
    { name: 'PCB', href: '/application' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            d="M20.25 0H3.75C1.677 0 0 1.677 0 3.75v16.5C0 22.323 1.677 24 3.75 24h16.5c2.073 0 3.75-1.677 3.75-3.75V3.75C24 1.677 22.323 0 20.25 0zM7.688 19.125h-3.75V9.375h3.75v9.75zm-1.875-11.625h-.025c-1.983 0-3.326-1.359-3.326-3.047 0-1.766 1.414-3.031 3.575-3.031 2.16 0 3.327 1.266 3.35 3.031 0 1.688-1.342 3.047-3.575 3.047zM20.25 19.125h-3.75v-5.109c0-1.219-.438-2.047-1.532-2.047-.828 0-1.313.563-1.531 1.109-.078.188-.1.453-.1.719v5.328h-3.75V9.375h3.525v1.531h.05c.491-.922 1.688-1.891 3.476-1.891 3.725 0 4.405 2.45 4.405 5.625v6.609z"
          />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

function Footer() {
  return (
    <footer className="bg-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img src={logo} width={250} height={250} className="" alt="Logo" />
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:flex">
              <div className="md:w-1/2">
              <h3 className="text-lg font-bold text-gray-900">Contact</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <div className="md:w-1/2">
              <h3 className="text-lg font-bold text-gray-900">Visit Us</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:flex">
              <div className="md:w-1/2">
              <h3 className="text-lg font-bold text-gray-900">Application</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <br/>
              <div className="md:w-1/2">
              <h3 className="text-lg font-bold text-gray-900">Company</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 Shox Computer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}



export default Footer;
