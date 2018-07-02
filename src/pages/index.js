import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

export default class IndexPage extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
          </div>
          {/* {JSON.stringify(posts)} */}
          {posts.map(({ content, data = {}, excerpt }, i) => (
            <div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={i}>
              <p>
                <Link className="has-text-primary" to={data.slug}>
                  {data.title}
                </Link>
                <span> &bull; </span>
                <small>{new Date(data.date).toLocaleString('en-US')}</small>
              </p>
              <p>
                {excerpt}
                <br />
                <br />
                <Link className="button is-small" to={data.slug}>
                  Keep Reading →
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
