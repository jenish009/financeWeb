import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Chip from "../../components/common/Chip";
import EmptyList from "../../components/common/EmptyList";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";

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

  return (
    <>
      <Link className="blog-goBack" to="/">
        <span> &#8592;</span> <span>Go Back</span>
      </Link>

      {loading ? (
        <div className="loading-container">
          <BeatLoader color={"#0f52ba"} loading={loading} size={20} />
        </div>
      ) : blog ? (
        <div className="blog-wrap">
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
          <img className="blog-thumbnail" src={blog.cover} alt="cover" />
          <p className="blog-desc-p">{blog.description}</p>

          <div className="blog-content">
            {Array.isArray(blog.content) &&
              blog.content.map((item, index) => {
                if (item.p) {
                  return (
                    <p key={index} className="blog-content-p">
                      {item.p}
                    </p>
                  );
                } else if (item.h2) {
                  return (
                    <h2 key={index} className="blog-content-h2">
                      {item.h2}
                    </h2>
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
                  ); // Handle other content types if needed
                }
              })}

            {/* Add the author info here */}
            <div className="author-info">
              <img
                src={blog.authorAvatar}
                alt="Author Avatar"
                className="author-logo"
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
