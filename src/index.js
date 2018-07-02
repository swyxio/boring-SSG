import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';

import IndexPage from './pages';
import About from './templates/about-page';
import Products from './templates/product-page';
import Blog from './templates/blog-post';
import Oops from './pages/404';

import 'bulma/css/bulma.css';
import './app.css';

class App extends React.Component {
  state = { toggle: false }
  render() {
    let { data } = this.props
    if (!data) {
      if (typeof window !== 'undefined') { // clientside
        data = window.BigBall; // TODO: i know this is so ugly. would love to refactor.
        console.log('fromwindow', { data });
        if (!data) { // in case bigball isnt loaded
          fetch("/BigBall.json")
            .then(res => res.json())
            .then(data => window.BigBall = data)
            .then(() => this.setState(({ toggle }) => ({ toggle: !toggle })))
        }
      }
    }
    if (!data) return <Oops /> // still no data, show an oops
    return (
      <Router>
        <IndexPage path="/" posts={data.posts} />
        <About path="/about" {...data.about[0]} />
        <Products path="/products" {...data.products[0].data} />
        <Blog path="/blog/:blogkey" posts={data.posts} />
        <Oops default />
      </Router>
    );
  }
}
export default App;
