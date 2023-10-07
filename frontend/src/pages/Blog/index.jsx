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
          <img src={blog.cover} alt="cover" />
          <p className="blog-desc">{blog.description}</p>

          {/* Content section */}
          <div className="blog-content">
            <h3>Content:</h3>
            <p>{blog.content}</p>

            {/* Author information */}
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
