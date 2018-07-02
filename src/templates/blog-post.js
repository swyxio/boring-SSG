import React from 'react'
// import { kebabCase } from 'lodash'
// import Helmet from 'react-helmet'
// import Link from 'gatsby-link'
// import Content, { HTMLContent } from '../components/Content'
import ReactMarkdown from 'react-markdown';
import { Redirect } from '@reach/router';

import Layout from '../layouts';
const BlogPostCore = ({
  content, data: {
    description,
    tags,
    title,
  }
}) => {
  // const PostContent = contentComponent || Content
  if (!title) return <div>null</div>
  return (
    <Layout>
      <section className="section">
        {/* {helmet || ''} */}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>{description}</p>
              <ReactMarkdown source={content} />
              {/* {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null} */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default function BlogPost({ blogkey, posts }) {
  const post = posts.find(p => p.data.slug === blogkey)
  if (!post) return console.log({ blogkey }) || <Redirect from="blog/:blogkey" to="404" />
  return <BlogPostCore {...post} />
}

