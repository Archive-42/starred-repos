import React from 'react'
import { graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'

import './post-index.css'

const PostIndex = ({data}) => {
  const posts = data.allPostsJson.nodes
  const pageCount = data.allPostsJson.pageInfo.pageCount

  return (
		<Layout>
      <SEO title="MITH News" />
      <div className="page-news">
        <section className="posts news">
          <h1 className="page-title">
            News &nbsp;
            <a href="/news/feed.xml" className="icon-rss">
              <FontAwesomeIcon title="News RSS Feed" icon="rss" />
            </a>
          </h1>
          {posts.map(post => {
            const slug = '/news/' + post.slug
            const markdownFile = post.slug + '.md'

            // pick out the markdown file that has the same slug
            const doc = data.allMarkdownRemark.nodes.find(
              n => n.fileAbsolutePath.match(markdownFile)
            )

            // if there is no doc then we're missing the markdown file for a blog
            // post that is in airtable 
            
            if (! doc) {
              throw new Error(`missing markdown post for slug ${post.slug}`)
            }

            return (
              <article className="post news-post" key={`news-${post.id}`}>
                <h2 className="post-title">
                  <Link to={slug}>{post.post_title}</Link>
                </h2>
                <div className="meta">
                  by <span className="author">{post.author_name}</span>
                  {' '}on <time>{post.post_date}</time>
                </div>
                <div className="excerpt">
                  {doc.excerpt} 
                  <Link to={slug} className="read-more">continue reading</Link>
                </div>
              </article>
            )
          })}
        </section>
        <Paginator count={pageCount} path="news" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostsQuery($skip: Int!, $limit: Int!) {
    allPostsJson(
      filter: {
        DD_Post: {eq: null}, Event_Post: {eq: null}
      }
      limit: $limit
      skip: $skip
      sort: {fields: post_date, order: DESC}
    ) {
      nodes {
        id
        slug
        author_name
        post_title
        post_date(formatString: "MMMM D, YYYY")
      }
      pageInfo {
        pageCount
      }
    }
    allMarkdownRemark(
      filter: {fields: {sourceName: {eq: "news"}}}
    ) {
      nodes {
        excerpt(pruneLength: 250)
        id
        fileAbsolutePath
      }
    }
  }
`
 
export default PostIndex
