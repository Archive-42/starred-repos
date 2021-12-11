import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './post.css'

const Post = ({ data, pageContext: post }) => {
  const metadata = data.postInfo.nodes[0]
  if (!metadata) return null

  return (
    <Layout>
      <SEO title={metadata.post_title} />
      <div className="page-post">
        <section className="post flow">
          <h1 className="post-title">{metadata.post_title}</h1> 
          <div className="post-meta">
            by {metadata.author_name} on {metadata.post_date}
            {' '}in {metadata.categories.join(', ')}
          </div>       
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    postInfo: allPostsJson(
      filter: {
        DD_Post: {eq: null}, 
        Event_Post: {eq: null}, 
        slug: {eq: $slug}
      }
    ) {
      nodes {
        slug
        author_name
        post_title
        post_date(formatString: "MMMM D, YYYY")
        categories
      }
    }
  }
`

export default Post