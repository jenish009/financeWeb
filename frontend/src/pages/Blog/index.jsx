import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Chip from "../../components/common/Chip";
import EmptyList from "../../components/common/EmptyList";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/post/getPostById?id=${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);
  const currentURL = window.location.href;

  return (
    <>
      {blog && (
        <>
          <Helmet>
            <meta
              name="title"
              content={`${blog.title} FinancialHub.info`.slice(0, 65)}
            />
            <meta name="description" content={blog.description.slice(0, 165)} />
            <meta name="keywords" content={blog.subCategory.join(",")} />
            <meta
              property="og:title"
              content={`${blog.title} FinancialHub.info`.slice(0, 65)}
            />
            <meta
              property="og:description"
              content={blog.description.slice(0, 165)}
            />
            <meta property="og:image" content={blog.cover} />
            <meta property="og:url" content={currentURL} />
            <meta name="twitter:card" content={blog.cover} />
            <meta
              property="twitter:title"
              content={`${blog.title} FinancialHub.info`.slice(0, 65)}
            />
            <meta
              property="twitter:description"
              content={blog.description.slice(0, 165)}
            />
            <meta name="twitter:image" content={blog.cover} />
            <meta name="twitter:site" content={currentURL} />
            <link rel="canonical" href={currentURL} />
            <title>
              {blog && `${blog.title} FinancialHub.info`.slice(0, 65)}
            </title>{" "}
          </Helmet>
        </>
      )}
      {loading ? (
        <div className="loading-container">
          <BeatLoader color={"#0f52ba"} loading={loading} size={20} />
        </div>
      ) : blog ? (
        <div className="blog-wrap">
          <Link className="blog-goBack" to="/">
            <span> &#8592;</span> <span>Go Back</span>
          </Link>

          <header>
            <p className="blog-date">Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className="blog-subCategory">
              {blog.subCategory.map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img
            className="blog-thumbnail"
            width="100%"
            height="100%"
            src={blog.cover}
            alt="cover"
          />
          <p className="blog-desc-p">{blog.description}</p>

          <div className="blog-content">
            {Array.isArray(blog.content) &&
              blog.content.map((item, index) => {
                if (item.p) {
                  return (
                    <p
                      key={index}
                      className="blog-content-p"
                      dangerouslySetInnerHTML={{ __html: item.p }}
                    />
                  );
                } else if (item.h2) {
                  return (
                    <h2
                      key={index}
                      className="blog-content-h2"
                      dangerouslySetInnerHTML={{ __html: item.h2 }}
                    />
                  );
                } else if (item.img) {
                  return (
                    <img
                      key={index}
                      src={item.img}
                      className="blog-content-img"
                      alt={`Content Image ${index}`}
                    />
                  );
                } else if (item.h3) {
                  return (
                    <h3 key={index} className="blog-content-h3">
                      {item.h3}
                    </h3>
                  );
                }
              })}

            {/* Add the author info here */}
            <div className="author-info">
              <img
                src={blog.authorAvatar}
                alt="Author Avatar"
                className="author-logo"
                width="40"
                height="40"
              />
              <p className="author-name">{blog.authorName}</p>
            </div>
          </div>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
