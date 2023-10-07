import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners'; // Import BeatLoader

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/post/getPostById?id=${id}`)
      .then((response) => {
        setBlog(response.data); // Update the state with the fetched data
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error
      });
  }, [id]);

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>

      {loading ? ( // Display loading indicator while loading is true
        <div className='loading-container'>
          <BeatLoader color={'#0f52ba'} loading={loading} size={20} />
        </div>
      ) : blog ? (
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className='blog-subCategory'>
              {blog.subCategory.map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img src={blog.cover} alt='cover' />
          <p className='blog-desc'>{blog.description}</p>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
