import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { FaXmark, FaBars } from 'react-icons/fa6';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { link: 'Home', path: 'home' },
    { link: 'Previous Projects', path: 'cases' },
    { link: 'About', path: 'about' },
    { link: 'Inspection Schedule', path: 'product' },
    { link: 'Complaint Form', path: 'form' },
  ];

  return (
    <header className='w-full bg-neutralSilver md:bg-transparent fixed top-0 left-0'>
      <nav className={`py-4 lg:px-14 px-4 ${isSticky ? 'sticky top-0 left-0 border bg-neutralSilver duration-300' : ''}`}>
        <div className='flex justify-between items-center text-base gap-8'>
          <RouterLink to='/' className='text-2xl font-semibold flex items-center'>
            <span className='text-[#263238]'>RuTAG Project</span>
          </RouterLink>

          <ul className='md:flex space-x-12 hidden'>
            {navItems.map(({ link, path }) => (
              <li className='block cursor-pointer text-base text-gray-900 hover:text-brandPrimary' key={path}>
                <Link to={path} smooth={true} duration={500} offset={-100}>{link}</Link>
              </li>
            ))}
          </ul>

          <div className='space-x-12 hidden lg:flex items-center'>
            <RouterLink to='/login' className='hidden lg:flex items-center text-brandPrimary hover:text-gray-900'>Login</RouterLink>
            <button className='bg-brandPrimary text-white px-4 py-2 transition-all duration-300 rounded-lg hover:bg-neutralDGray'>Sign Up</button>
          </div>

          <div className='md:hidden'>
            <button onClick={toggleMenu} className='focus:outline-none text-neutralDGray focus:text-gray-500'>
              {isMenuOpen ? <FaXmark className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${isMenuOpen ? 'block fixed top-0 left-0 right-0' : 'hidden'}`}>
          {navItems.map(({ link, path }) => (
            <Link className='block text-base text-white hover:text-neutralDGray' key={path} to={path} smooth={true} duration={500} offset={-100}>
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
