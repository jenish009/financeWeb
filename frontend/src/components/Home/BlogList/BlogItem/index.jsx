import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../../common/Chip";
import "./styles.css";

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
    _id,
  },
}) => {
  // Create the postTitle by replacing spaces with hyphens and making it URL-friendly
  const postTitle = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link to={`/blog/${postTitle}/${_id}`} className="blogItem-wrap">
      <div className="blogItem-image">
        <img className="blogItem-cover" src={cover} alt="cover" />
        <Chip label={category} />
      </div>
      <div className="blogItem-content">
        <h3 className="blogItem-title">{title}</h3>
        <p className="blogItem-desc">{description}</p>
      </div>
      <footer className="blogItem-footer">
        <div className="blogItem-author">
          <img src={authorAvatar} alt="avatar" className="blogItem-avatar" />
          <div className="blogItem-author-info">
            <h6 className="blogItem-author-name">{authorName}</h6>
            <p className="blogItem-date">{createdAt}</p>
          </div>
        </div>
      </footer>
    </Link>
  );
};

export default BlogItem;
