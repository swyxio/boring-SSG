import React from 'react';
// import { withRouteData, Link } from 'react-static'
//
import Layout from '../components/layout';
// export default withRouteData(({ post }) => (
export default ({ post }) => (
  <Layout>
    {/* <Link to="/blog/">{'<'} Back</Link> */}
    <br />
    <h3>{post.title}</h3>
    <p>{post.body}</p>
  </Layout>
);
