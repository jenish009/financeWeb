import React, { useState, useEffect } from "react";
import axios from "axios";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/post/getLatestNews`)
      .then((response) => {
        setLatestNews(response.data.latestNews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="latest-news">
      <h2>Latest News</h2>
      {loading ? (
        <p>Loading latest news...</p>
      ) : (
        <ul>
          {latestNews.map((newsItem) => (
            <li key={newsItem.id}>{newsItem.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestNews;
