import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import News from "./pages/News";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog/:postTitle/:id" component={Blog} />
          <Route path="/news/:newsTitle/:id" component={News} />
          <Route path="/about" component={AboutUs} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="/privacyPolicy" component={PrivacyPolicy} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
