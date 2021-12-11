import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Paginator from '../components/paginator'
import ResearchTime from '../components/research-time'

import './post-index.css'
import './research-index.css'

const ResearchIndex = ({data}) => {
  const items = data.allResearchJson.nodes
  const pageCount = data.allResearchJson.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Research" />
      <div className="page-research">
        <section className="posts research">
          <h1 className="page-title">Research</h1>
          {items.map(item => {
            const slug = '/research/' + item.slug + '/'
            const active = item.active === 'TRUE' ? <span className="pill">Active</span> : ''
            const start = item.month_start ? `${item.year_start}-${item.month_start}` : item.year_start
            let end = ''
            if (item.year_end) {
              end = item.month_end ? `${item.year_end}-${item.month_end}` : item.year_end
            }
            const dates = <ResearchTime start={start} end={end} active={item.active} />

            let excerpt = ''
            let image = ''
            let title = <h2 className="title"><Link to={slug}>{item.title}</Link></h2>
            if (item.fields) {
              if (item.fields.image) {
                image = <GatsbyImage 
                  image={item.fields.image.childImageSharp.gatsbyImageData}
                  alt={item.title} 
                  className="research-image" 
                />
              title = <Link to={slug} className="header">{image}</Link>
              }
              if (item.fields.researchDescription) {
                excerpt = item.fields.researchDescription.childMarkdownRemark.excerpt
              }
            }
            
            const itemId = item.id.replace(/-/g, '_')

            return (
              <article className="post research-item-post" key={`research-${item.id}`} id={itemId}>
                {title}
                <div className="meta">
                  {dates}
                </div>
                <div className="post-excerpt">
                  {excerpt}
                </div>
              </article>
            )
          })}
        </section>
        <Paginator count={pageCount} path="research" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ResearchQuery($skip: Int!, $limit: Int!) {
    allResearchJson(
      limit: $limit
      skip: $skip
      sort: {
        fields: [active, year_start], 
        order: [DESC, DESC]
      }
    ) {
      nodes{
        id
        title
        slug
        year_start
        month_start
        year_end
        month_end
        active
        fields {
          researchDescription {
            childMarkdownRemark {
                excerpt(pruneLength: 250)
              }
          }
          image {
            childImageSharp {
              gatsbyImageData(width: 500, quality: 100, backgroundColor: "rgba(255,255,255,0)")
            }
          }
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
 
export default ResearchIndex
