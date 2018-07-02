import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';

import Layout from './layouts';
import IndexPage from './pages';
import About from './templates/about-page';
// import Blog from './pages/Blog';
import Oops from './pages/404';

// import './app.css'

const about = {
  fields: { slug: 'post1' },
  frontmatter: { title: 'post 1 title', date: 'post1 date here' },
  excerpt: 'post1 excerpt',
  html: '<h1>hello about</h1>'
};

const App = ({ data }) => {
  if (!data && typeof window !== 'undefined') {
    data = window.BigBall;
    console.log('fromwindow', { data });
  }
  return (
    <Layout>
      <Router>
        <IndexPage path="/" posts={data.posts} />
        <About path="/about" post={about} />
        {/* <Blog path="/blog" /> */}
        <Oops default />
      </Router>
    </Layout>
  );
};

export default App;
