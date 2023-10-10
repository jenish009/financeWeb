import React, { useState, useEffect } from "react";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/Home/BlogList";
import SearchBar from "../../components/Home/SearchBar";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import "./styles.css";
import NewsList from "../../components/newsList/index";
import { Helmet } from "react-helmet"; // Import Helmet for managing meta tags

const Home = () => {
  const [data, setData] = useState({ news: [], blogs: [] });
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState("news");

  const blogsPerPage = 9;

  useEffect(() => {
    let debounceTimeout;
    let isMounted = true;

    const fetchData = () => {
      setLoading(true);

      const apiUrl =
        mode === "news"
          ? `${process.env.REACT_APP_BACKEND_URL}/post/getNews`
          : `${process.env.REACT_APP_BACKEND_URL}/post/getPosts`;

      axios
        .get(
          `${apiUrl}?searchFilter=${searchKey}&page=${currentPage}&limit=${blogsPerPage}`
        )
        .then((response) => {
          if (isMounted) {
            setData((prevData) => ({
              ...prevData,
              [mode]: response.data.posts,
            }));
            setTotalPages(response.data.totalPages);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (isMounted) {
            setData((prevData) => ({ ...prevData, [mode]: [] }));
            setLoading(false);
          }
        });
    };

    isMounted = true;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(fetchData, 300);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [searchKey, currentPage, mode]);

  const handleSearchBar = () => {
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchKey("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      setCurrentPage(1);
    }
  };

  let newsData = [
    {
      id: 1,
      title: "Breaking News 1",
      date: "October 12, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://drive.google.com/uc?id=1M1qqGtcw2WIbXgimrR4-D_a1VKmGnA6Y",
    },
    {
      id: 2,
      title: "Latest Updates 2",
      date: "October 11, 2023",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://drive.google.com/uc?id=1M1qqGtcw2WIbXgimrR4-D_a1VKmGnA6Y",
    },
    {
      id: 3,
      title: "In-depth Analysis 3",
      date: "October 10, 2023",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://drive.google.com/uc?id=1M1qqGtcw2WIbXgimrR4-D_a1VKmGnA6Y",
    },
    {
      id: 2,
      title: "Latest Updates 2",
      date: "October 11, 2023",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://drive.google.com/uc?id=1M1qqGtcw2WIbXgimrR4-D_a1VKmGnA6Y",
    },
    {
      id: 3,
      title: "In-depth Analysis 3",
      date: "October 10, 2023",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://drive.google.com/uc?id=1M1qqGtcw2WIbXgimrR4-D_a1VKmGnA6Y",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>
          FinancialHub - Your Source for Financial News and Insights
        </title>
        <meta
          name="description"
          content="Stay informed on the latest financial news and trends with our daily blog. Get insights and advice from experts on investing, personal finance, and more. FinancialHub is your trusted source for financial information."
        />
        <meta
          name="keywords"
          content="finance, financial news, investing, personal finance, experts, blog"
        />
        <meta
          property="og:title"
          content="FinancialHub - Your Source for Financial News and Insights"
        />
        <meta property="og:image" content="%PUBLIC_URL%/author.jpg" />
        <meta property="og:url" content="%PUBLIC_URL%" />
      </Helmet>
      <div className="round-button-navigationbar">
        <div
          className={`round-button ${
            mode === "news" ? "active-round-button" : ""
          }`}
          onClick={() => handleModeChange("news")}
        >
          <div className="round-button-img-container">
            <img src="/assets/images/news.jpg" alt="News" className="logo" />
          </div>
        </div>
        <div
          className={`round-button ${
            mode === "blogs" ? "active-round-button" : ""
          }`}
          onClick={() => handleModeChange("blogs")}
        >
          <div className="round-button-img-container">
            <img src="/assets/images/blog.jpg" alt="Blogs" className="logo" />
          </div>
        </div>
      </div>
      <SearchBar
        value={searchKey}
        clearSearch={() => {
          setSearchKey("");
          setCurrentPage(1);
        }}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {loading ? (
        <div className="loading-container">
          <BeatLoader color={"#0f52ba"} loading={loading} size={20} />
        </div>
      ) : (
        <>
          {data[mode].length === 0 && mode === "blogs" ? (
            <EmptyList />
          ) : mode === "news" ? (
            <NewsList news={newsData} />
          ) : (
            <BlogList blogs={data[mode]} />
          )}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={
                  currentPage === index + 1 ? "active-round-button" : ""
                }
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
