import React from "react";
import "./AboutUs.css"; // Import the CSS for this page
import { Helmet } from "react-helmet";

const currentURL = window.location.href;
const AboutUs = () => (
  <div className="about-us">
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
      <link rel="canonical" href={currentURL} />
      <title>Your Daily Source for Financial News, Insights, and Advice</title>
    </Helmet>
    <h2 className="page-titel-h1">About Us</h2>
    <p>
      Welcome to{" "}
      <a href={currentURL}>
        <strong>FinancialHub.info</strong>
      </a>{" "}
      - Your Trusted Source for Financial Insights and Expertise!
    </p>

    <h2>Who We Are</h2>
    <p>
      At{" "}
      <a href={currentURL}>
        {" "}
        <strong>FinancialHub.info</strong>
      </a>{" "}
      , we are dedicated to providing you with accurate, reliable, and
      up-to-date information on all things related to finance, investing, and
      personal finance. Our mission is to empower individuals like you to make
      informed financial decisions, grow your wealth, and achieve financial
      freedom.
    </p>

    <h2>What Sets Us Apart</h2>
    <p>
      <strong>Expertise You Can Trust</strong>
      <br />
      Our team of finance experts and writers are passionate about finance and
      have years of experience in the industry. We bring you in-depth analysis,
      market trends, and practical advice to help you navigate the complex world
      of finance.
    </p>
    <p>
      <strong>Unbiased Insights</strong>
      <br />
      We believe in transparency and independence. Our content is unbiased, and
      we do not endorse any specific financial products or services. Our goal is
      to provide you with the knowledge and tools to make your own financial
      choices.
    </p>
    <p>
      <strong>Timely Updates</strong>
      <br />
      The financial landscape is constantly evolving. We understand the
      importance of staying up-to-date with the latest news and trends. That's
      why we work diligently to deliver timely and relevant content to our
      readers.
    </p>

    <h2>What We Cover</h2>
    <p>Our blog covers a wide range of financial topics, including:</p>
    <ul>
      <li>
        Investing: Discover investment strategies, tips, and guides to help you
        build and manage your investment portfolio.
      </li>
      <li>
        Personal Finance: Learn how to budget, save, and plan for your financial
        future. We offer practical advice to help you achieve your financial
        goals.
      </li>
      <li>
        Market Analysis: Stay informed about the latest developments in the
        financial markets. Our analysis helps you make informed investment
        decisions.
      </li>
      <li>
        Financial Education: We believe in financial literacy. Our educational
        content is designed to help you understand financial concepts and
        terminology.
      </li>
    </ul>

    <h2>Get Involved</h2>
    <p>
      We value our readers and their feedback. Feel free to reach out to us with
      your questions, comments, or suggestions. We are here to help you on your
      financial journey.
    </p>

    <h2>Stay Connected</h2>
    <p>
      To stay updated with the latest financial news, insights, and tips, be
      sure to subscribe to our newsletter and follow us on social media. You can
      find us on{" "}
      <a href="#" className="about-us-link">
        Facebook
      </a>{" "}
      and{" "}
      <a href="#" className="about-us-link">
        Twitter
      </a>
      .
    </p>

    <p>
      Thank you for choosing{" "}
      <a href={currentURL}>
        <strong>FinancialHub.info</strong>
      </a>{" "}
      as your go-to resource for all things finance. We look forward to being a
      part of your financial success story.
    </p>
  </div>
);

export default AboutUs;
