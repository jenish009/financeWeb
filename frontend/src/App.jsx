import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Blog from './pages/Blog';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/blog/:id' component={Blog} />
        <Route path='/about' component={AboutUs} />
        <Redirect to='/' />
      </Switch>
      <Footer/>

    </div>
  );
};

export default App;
