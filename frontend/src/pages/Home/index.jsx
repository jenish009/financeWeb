import React, { useState, useEffect } from 'react';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/Home/BlogList';
import SearchBar from '../../components/Home/SearchBar';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './styles.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const blogsPerPage = 9;

  useEffect(() => {
    let debounceTimeout;
    setLoading(true);

    const fetchBlogs = () => {
      setLoading(true);

      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/post/getPosts?searchFilter=${searchKey}&page=${currentPage}&limit=${blogsPerPage}`)
        .then((response) => {
          setBlogs(response.data.posts);
          setTotalPages(response.data.totalPages);
          setLoading(false); // Set loading to false here
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setBlogs([]); // Initialize blogs as an empty array on error
          setLoading(false); // Set loading to false here
        });
    };

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(fetchBlogs, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchKey, currentPage]);

  const handleSearchBar = () => {
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchKey('');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage === currentPage) {
      return; // Prevent API call if the page didn't change
    }
    // Update the currentPage state immediately
    setLoading(true);
    setCurrentPage(newPage);
    window.scrollTo(0, 0)
  };

  return (
    <div>
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {loading ? (
        <div className="loading-container">
          <BeatLoader color={'#0f52ba'} loading={loading} size={20} />
        </div>
      ) : (
        <>
          <BlogList blogs={blogs} />
          {blogs.length === 0 && <EmptyList />}

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
