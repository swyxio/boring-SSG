import React from 'react';
export default ({ posts }) => (
  <div>
    <h1>Persists even if you Reload.</h1>
    <br />
    All Posts:
    {/* <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
        </li>
      ))}
    </ul> */}
  </div>
);
