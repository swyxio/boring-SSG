import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';

import IndexPage from './pages';
import About from './templates/about-page';
import Products from './templates/product-page';
// import Blog from './pages/Blog';
import Oops from './pages/404';

import 'bulma/css/bulma.css';
import './app.css';

const App = ({ data }) => {
  if (!data && typeof window !== 'undefined') {
    data = window.BigBall; // TODO: i know this is so ugly. would love to refactor.
    console.log('fromwindow', { data });
  }

  return (
    <Router>
      <IndexPage path="/" posts={data.posts} />
      <About path="/about" {...data.about[0]} />
      <Products path="/products" {...data.products[0].data} />
      {/* <Blog path="/blog" /> */}
      <Oops default />
    </Router>
  );
};

export default App;
