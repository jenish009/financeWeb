import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-left">
        <h2>Stay Connected</h2>
        <p>
          Subscribe to our newsletter for updates and the latest financial
          insights from financialHub.info. Stay informed about:
        </p>
        <ul className="footer-topic-list">
          <li>S"The ABCs of Investing: A Beginner's Guide"</li>
          <li>Business Strategies</li>
          <li>Startup Success Stories</li>
          <li>Personal Finance Tips</li>
        </ul>
        <form className="newsletter-form">
          <input type="email" placeholder="Your Email" />
          <button className="subscribe-button">Subscribe</button>
        </form>
      </div>
      <div className="footer-right">
        <div className="social-icons">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="contact-info">
          <p>Email: admin@financialhub.info</p>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2023 Financial Insights Hub. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
