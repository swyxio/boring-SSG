import React from 'react';
// import Content, { HTMLContent } from '../components/Content';
import ReactMarkdown from 'react-markdown';

import Layout from '../layouts';

export const AboutPage = ({ content, data }) => {
  return (
    <Layout>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">{data.title}</h2>
                {/* <PageContent className="content" content={content} /> */}
                <ReactMarkdown className="content" source={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
