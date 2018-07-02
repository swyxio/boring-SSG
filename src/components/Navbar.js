import React from 'react';

import { Link } from '@reach/router';

// import github from '../img/github-icon.svg';
// import logo from '../img/logo.svg';
// import SVGInline from 'react-svg-inline';

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          {/* <figure className="image">
            <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
          </figure> */}Kaldi
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/products">
          Products
        </Link>
      </div>
      <div className="navbar-end">
        <a
          className="navbar-item"
          href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            {/* <img src={github} alt="Github" /> */}
            {/* <SVGInline svg={github} alt="Github" /> */}
            github
          </span>
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
