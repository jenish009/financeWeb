import React, { useEffect, useState } from "react";
import Parser from "rss-parser";

const GoogleNewsFeed = () => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      const parser = new Parser();
      try {
        const feed = await parser.parseURL(
          `${process.env.REACT_APP_BACKEND_URL}/news/getAllNewsFeed`
        );
        setFeedData(feed.items);
      } catch (error) {
        console.error("Error fetching Google News RSS feed:", error);
      }
    };

    fetchRSSFeed();
  }, []);

  return (
    <div>
      <h2>News Feed</h2>
      <ul>
        {console.log("feedData", feedData)}
        {feedData.map((item) => (
          <li key={item.guid}>
            <a
              href={`/news/${item.title.toLowerCase().replace(/\s+/g, "-")}/${
                item.guid
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleNewsFeed;
