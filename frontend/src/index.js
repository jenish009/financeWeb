import React from 'react';
import ReactDOM, { hydrate, render } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const AppMian = () => (
  <BrowserRouter>
    hii  </BrowserRouter>
);


ReactDOM.render(<App />, document.getElementById('root'));
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<AppMian />, rootElement);
} else {
  render(<AppMian />, rootElement);
}