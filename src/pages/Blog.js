import React from 'react';
// import { withRouteData, Link } from 'react-static'
//
import Layout from '../components/layout';

// export default withRouteData(({ posts }) => (
export default ({ posts }) => (
  <Layout>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    {/* <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
        </li>
      ))}
    </ul> */}
  </Layout>
);
