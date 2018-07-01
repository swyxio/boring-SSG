import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';

// Your top level component
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Oops from './pages/404';

const App = () => (
  <div>
    <nav>
      <Link to="/">Home </Link>
      <Link to="about">About </Link>
      <Link to="blog">Refresh </Link>
    </nav>
    <div className="content">
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Blog path="/blog" />
        <Oops default />
      </Router>
    </div>
  </div>
);

export default App;
