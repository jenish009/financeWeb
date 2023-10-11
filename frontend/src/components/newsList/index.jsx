import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // Updated CSS file name

const NewsItem = ({ news }) => {
  return (
    <div className="news-container">
      {news.map((newsObj, index) => (
        <div key={index} className="newsItem">
          <img
            src={newsObj.cover}
            alt={newsObj.title}
            className="newsItem-img" // Added class name
          />
          <div className="newsItem-content">
            <h3 className="newsItem-title"> {newsObj.title}</h3>
            <p className="newsItem-date">Published on: {newsObj.createdAt}</p>
            <p className="newsItem-description"> {newsObj.description}</p>
            <Link
              to={`/news/${newsObj.title.toLowerCase().replace(/\s+/g, "-")}/${
                newsObj._id
              }`}
              className="newsItem-link" // Added class name
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsItem;
