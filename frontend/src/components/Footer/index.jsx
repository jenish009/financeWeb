import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className='footer'>
    <div className='footer-content'>
      <div className='footer-left'>
        <h2>Stay Connected</h2>
        <p>Subscribe to our newsletter for updates.</p>
        <form className='newsletter-form'>
          <input type='email' placeholder='Your Email' />
          <button className='subscribe-button'>Subscribe</button>
        </form>
      </div>
      <div className='footer-right'>
        <div className='social-icons'>
          <a href='#'><i className='fab fa-facebook'></i></a>
          <a href='#'><i className='fab fa-twitter'></i></a>
          <a href='#'><i className='fab fa-instagram'></i></a>
        </div>
        <div className='contact-info'>
          <p>Email: info@example.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>
      </div>
    </div>
    <div className='footer-bottom'>
      <p>&copy; 2023 Financial Insights Hub. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
    