import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // Updated CSS file name

const NewsItem = ({ news }) => {
  const groupedNews = groupNewsByDate(news);

  return (
    <>
      {groupedNews.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h2 className="newsItem-title">Published on {group.date}</h2>
          <div className="news-container">
            {group.articles.map((newsObj, index) => (
              <div key={index} className="newsItem">
                <img
                  src={newsObj.cover}
                  alt={newsObj.title}
                  className="newsItem-img" // Maintain the existing class name
                />
                <div className="newsItem-content">
                  <h3 className="newsItem-title"> {newsObj.title}</h3>
                  <p className="newsItem-date">
                    Published on: {newsObj.createdAt}
                  </p>
                  <p className="newsItem-description"> {newsObj.description}</p>

                  <div>
                    <Link
                      to={`/news/${newsObj.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${newsObj._id}`}
                      className="newsItem-link" // Maintain the existing class name
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const groupNewsByDate = (news) => {
  const groupedNews = [];
  let currentDate = null;
  let currentGroup = null;

  news.forEach((newsObj) => {
    const date = newsObj.createdAt.split("T")[0];
    if (date !== currentDate) {
      currentGroup = {
        date,
        articles: [],
      };
      groupedNews.push(currentGroup);
      currentDate = date;
    }
    currentGroup.articles.push(newsObj);
  });

  return groupedNews;
};

export default NewsItem;
