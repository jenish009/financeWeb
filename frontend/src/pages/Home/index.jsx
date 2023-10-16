import React, { useState, useEffect } from "react";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/Home/BlogList";
import SearchBar from "../../components/Home/SearchBar";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import "./styles.css";
import NewsList from "../../components/newsList";
import { Helmet } from "react-helmet-async";

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
          ? `${process.env.REACT_APP_BACKEND_URL}/news/getAllNews`
          : `${process.env.REACT_APP_BACKEND_URL}/post/getPosts`;

      axios
        .get(
          `${apiUrl}?searchFilter=${searchKey}&page=${currentPage}&limit=${blogsPerPage}`
        )
        .then((response) => {
          if (isMounted) {
            setData((prevData) => ({
              ...prevData,
              [mode]: response.data.data,
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
      window.scrollTo(0, 0);
    }
  };

  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      setCurrentPage(1);
      setLoading(true);
      setData((prevData) => ({ ...prevData, [newMode]: [] }));
    }
  };

  return (
    <div>
      <Helmet>
        <meta
          name="title"
          content="FinancialHub: Your Daily Source for Financial News, Insights, and Advice"
        />
        <meta
          name="description"
          content="Stay informed on the latest financial news and trends with our daily blog. Get insights and advice from experts on various financial topics."
        />
        <meta
          name="keywords"
          content="finance, financial news, investing, personal finance, experts, blog, Stock market, Investing, Personal finance, Financial planning, Retirement planning, Real estate, Business, Technology, Economy, Inflation, Interest rates, Cryptocurrency, Blockchain"
        />

        <meta
          property="og:title"
          content="FinancialHub: Your Daily Source for Financial News, Insights, and Advice"
        />
        <meta
          property="og:description"
          content="Stay informed on the latest financial news and trends with our daily blog. Get insights and advice from experts on various financial topics."
        />
        <meta property="og:image" content="%PUBLIC_URL%/author.jpg" />
        <meta property="og:url" content="financialHub.info" />

        <meta name="twitter:card" content="%PUBLIC_URL%/author.jpg" />
        <meta
          name="twitter:title"
          content="FinancialHub: Your Daily Source for Financial News, Insights, and Advice"
        />
        <meta
          name="twitter:description"
          content="Stay informed on the latest financial news and trends with our daily blog. Get insights and advice from experts on various financial topics."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/author.jpg" />
        <meta name="twitter:site" content="%PUBLIC_URL%" />
        <link rel="canonical" href="" />
        <title>
          Your Daily Source for Financial News, Insights, and Advice
        </title>
      </Helmet>
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

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

      {loading ? (
        <div className="loading-container">
          <BeatLoader color={"#0f52ba"} loading={loading} size={20} />
        </div>
      ) : (
        <>
          {data[mode].length === 0 ? (
            <EmptyList />
          ) : mode === "news" ? (
            <NewsList news={data[mode]} />
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
