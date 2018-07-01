import React from 'react';
// import { Router, Link } from 'react-static'
// import { hot } from 'react-hot-loader'
//
// import Routes from 'react-static-routes'
import { Router, Link } from '@reach/router';

// import './app.css'

const Layout = ({ children }) => (
  <Router>
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="blog">Blog</Link>
      </nav>
      <div className="content">{children}</div>
    </div>
  </Router>
);

export default Layout;
