import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event-index.css'

const EventIndex = ({data}) => {
  const items = data.allEventsJson.nodes
  const pageCount = data.allEventsJson.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Events" />
      <div className="page-events">
        <section className="posts events">
          <h1 className="page-title">Events</h1>
          {items.map(item => {

            const slug = '/events/' + item.id + '/'
            
            const event_title = item.event_title
            const talk_title = item.talk_title
            const title_text = talk_title ? talk_title : event_title
            const title = item.talk_subtitle
              ? <h2 className="title"><Link to={slug}>{title_text}<span className="subtitle">{item.talk_subtitle}</span></Link></h2> 
              : <h2 className="title"><Link to={slug}>{title_text}</Link></h2>

            let image = ''
            let excerpt = '' 
            if (item.fields) {
              if (item.fields.image) {
                image = <Link to={slug} className="image">
                  <GatsbyImage 
                    image={item.fields.image.childImageSharp.gatsbyImageData}
                    alt={item.title} 
                    className="event-image" 
                /></Link>
              }
              if (item.fields.eventsDescription) {
                excerpt = <div className="excerpt">
                  {item.fields.eventsDescription.childMarkdownRemark.excerpt}
                </div>
              }
            }
          
            let speakers_list = null
            let speakers = null
            const speakers_data = item.speakers ? item.speakers : []
            if (item.speakers) {
              speakers_list = speakers_data.map((p, i) => {
                return <Person key={`p${i}`} person={p} showTitle="false" type="index" />
              })
              speakers = <div className="speakers hidden">
                <ul className="inline-list">
                  {speakers_list}
                </ul>
              </div>
            }
            const status = item.status === 'canceled' ? <span className={`pill event-status ${item.status}`}>{item.status}</span> : ''
            let types = null
            let types_list = null 
            if (item.type) {
              types_list = item.type.map(t => {
                return <span className="pill event-type" key={`t${t}`}>{t}</span>
              })
              
              types = <div className="event-types">{types_list}{status}</div>
            }

            const itemId = item.id.replace(/-/g, '_')
            const iconLocation = <FontAwesomeIcon icon="map-marker-alt" />
            const location = item.location 
              ? <span className="location">{iconLocation} {item.location}</span> : ''
            const details = <Link className="button" to={slug}>Event Details</Link>

            return (
              <article className="event-item" key={`event-${item.id}`} id={itemId}>
                {image}
                <div className="content">
                  {title}
                  {types}
                  {excerpt}
                </div>
                <div className="meta">
                  <EventTime start={item.start} end={item.end} icon="yes" />
                  {location}
                </div>
                <div className="details">
                  {details}
                </div>
              </article>
            )
          })}
        </section>
        <Paginator count={pageCount} path="events" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query EventsQuery($skip: Int!, $limit: Int!) {
    allEventsJson (
      limit: $limit
      skip: $skip
      sort: {
        fields: [start_date], 
        order: [DESC]
      }
      filter: {
        event_type: {ne: "Digital Dialogue"}
      }
    ) {
      nodes {
        id
        event_title
        talk_title
        talk_subtitle
        type: event_type
        start: start_date
        end: end_date
        location
        status
        speakers {
          name
          affiliations {
            title
            department
            institution
          }
          person_group
          slug
          new_id
        }
        fields {
          eventsDescription {
            childMarkdownRemark {
                excerpt(pruneLength: 250)
              }
          }
          image {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, backgroundColor: "rgba(255,255,255,0)")
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
 
export default EventIndex
