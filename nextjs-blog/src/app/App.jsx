"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import Blog from "./blog/page";
import Home from "./pages/Home";
import News from "./pages/News";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Feed from "@/components/Feed";

const App = () => {
  return (
    <>
      <Header />
      <Blog />
      <Footer />
    </>
  );
};

export default App;
