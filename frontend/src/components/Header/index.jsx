import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Header = () => {
  const location = useLocation();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState(""); // State for the subscribe success message

  const handleSubscribeClick = () => {
    setIsSubscribed(!isSubscribed);
    setEmail("");
    setSubscribeMessage(""); // Reset the message
  };

  const handleReadMore = () => {
    setIsSubscribed(false);
  };

  const callApi = () => {
    if (email) {
      fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSubscribeMessage("subscribed!"); // Set the subscribe success message
          setIsSubscribed(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <header className="home-header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contactUs"
              className={location.pathname === "/contactUs" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/privacyPolicy"
              className={location.pathname === "/privacyPolicy" ? "active" : ""}
            >
              Policy
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header-content">
        <h1>
          <span className="highlight">“</span> FinancialHub.info{" "}
          <span className="highlight">”</span>
        </h1>
        <p>
          Empowering Your Financial Journey
          <br /> with Expert Insights and Practical Tips.
        </p>
        <div className="buttons">
          <button className="header-button" onClick={handleSubscribeClick}>
            Subscribe
          </button>
          {/* <button className="header-button" onClick={handleReadMore}>
            Read More
          </button> */}
        </div>
        {isSubscribed && (
          <div className="subscribe-textbox">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="arrow"
              onClick={() => {
                callApi(); // Call the API when the arrow is clicked
              }}
            >
              &#9655;
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
