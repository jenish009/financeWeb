import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Chip from "@/components/common/Chip";
import EmptyList from "@/components/common/EmptyList";
import "./NewsDetails.css";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet"; // Import Helmet for managing meta tags
import { Link } from "react-router-dom";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/news/getNewsById?id=${id}`)
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);
  const currentURL = "#";

  return (
    <>
      {news && (
        <Helmet>
          <meta
            name="title"
            content={`${news.title} FinancialHub.info`.slice(0, 65)}
          />
          <meta name="description" content={news.description.slice(0, 165)} />
          <meta name="keywords" content={news.topics.join(",")} />
          <meta
            property="og:title"
            content={`${news.title} FinancialHub.info`.slice(0, 65)}
          />
          <meta
            property="og:description"
            content={news.description.slice(0, 165)}
          />
          <meta property="og:image" content={news.cover} />
          <meta property="og:url" content={currentURL} />
          <meta name="twitter:card" content={news.cover} />
          <meta
            property="twitter:title"
            content={`${news.title} FinancialHub.info`.slice(0, 65)}
          />
          <meta
            property="twitter:description"
            content={news.description.slice(0, 165)}
          />
          <meta name="twitter:image" content={news.cover} />
          <meta name="twitter:site" content={currentURL} />
          <link rel="canonical" href={currentURL} />

          <title>{`${`${news.title} FinancialHub.info`.slice(0, 65)}`}</title>
        </Helmet>
      )}
      {loading ? (
        <div className="loading-container">
          <BeatLoader color={"#0f52ba"} loading={loading} size={20} />
        </div>
      ) : news ? (
        <div className="news-details-wrap">
          <header>
            <Link className="news-goBack" to="/">
              <span> &#8592;</span> <span>Go Back</span>
            </Link>
            <p className="news-date">Published {news.createdAt}</p>
            <h1 className="news-title">{news.title}</h1>
            <div className="news-categories">
              {news.categories &&
                news.categories.map((category, i) => (
                  <div key={i} className="news-category">
                    <Chip label={category} />
                  </div>
                ))}
            </div>
          </header>
          <img
            className="news-thumbnail"
            src={news.cover}
            width="100%"
            height="100%"
            alt="news cover"
          />
          <p className="news-description">{news.description}</p>

          <div className="news-content">
            {Array.isArray(news.content) &&
              news.content.map((item, index) => {
                if (item.p) {
                  return (
                    <p
                      key={index}
                      className="news-content-p"
                      dangerouslySetInnerHTML={{ __html: item.p }}
                    />
                  );
                } else if (item.h2) {
                  return (
                    <h2
                      key={index}
                      className="news-content-h2"
                      dangerouslySetInnerHTML={{ __html: item.h2 }}
                    />
                  );
                } else if (item.img) {
                  return (
                    <img
                      key={index}
                      src={item.img}
                      className="news-content-img"
                      alt={`Content Image ${index}`}
                    />
                  );
                } else if (item.h3) {
                  return (
                    <h3
                      key={index}
                      className="news-content-h3"
                      dangerouslySetInnerHTML={{ __html: item.h3 }}
                    />
                  );
                }
              })}
          </div>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default NewsDetails;
