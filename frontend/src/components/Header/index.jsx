import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

import './styles.css';

const Header = () => {
  // Get the current location (route)
  const location = useLocation();

  return (
    <header className='home-header'>
      <nav className='navbar'>
        <ul className='nav-list'>
          <li className='nav-item'><Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li className='nav-item'><Link to='/blog' className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
          <li className='nav-item'><Link to='/about' className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
          <li className='nav-item'><Link to='/contact' className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        </ul>
      </nav>
      <div className='header-content'>
        {/* <h2>Financial Insights Hub</h2> */}
        <h1>
          <span className="highlight">“</span> FinanceWise365.com <span className="highlight">”</span>
        </h1>
        <p>
        Empowering Your Financial Journey<br />  with Expert Insights and Practical Tips.
        </p>
        <div className="buttons">
          <button className="header-button">Subscribe</button>
          <button className="header-button">Read More</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
