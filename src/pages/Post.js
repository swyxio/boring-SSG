import React from 'react';
export default ({ post }) => (
  <div>
    {/* <Link to="/blog/">{'<'} Back</Link> */}
    <br />
    <h3>{post.title}</h3>
    <p>{post.body}</p>
  </div>
);
