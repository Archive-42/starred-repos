import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ResearchTime from '../components/research-time'
import EventTime from '../components/event-time'
import Person from '../components/person'
import TaxonomyList from '../components/taxonomy-list'
import SupporterList from '../components/supporter-list'

import './research.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Research = ({ pageContext: item }) => {

  let header = <h1 className="title">{item.title}</h1>
  let description = ''
  if (item.fields) {
    if (item.fields.image) {
      header = <GatsbyImage 
        image={item.fields.image.childImageSharp.gatsbyImageData}
        alt={item.title} 
        className="research-image" 
      />
    }
    if (item.fields.researchDescription) {
      description = <div className="description" 
        dangerouslySetInnerHTML={{ __html: item.fields.researchDescription.childMarkdownRemark.html }} 
      />
    }
  }

  const start = item.month_start ? `${item.year_start}-${item.month_start}` : item.year_start
  let end = ''
  if (item.year_end) {
    end = item.month_end ? `${item.year_end}-${item.month_end}` : item.year_end
  }
  const dates = <ResearchTime start={start} end={end} active={item.active} />

  let participant_list = null
  let participants = null
  if (item.participants.length > 0) {
    participant_list = item.participants.map((p, i) => {
      return <Person key={`p${i}`} person={p} showTitle="true" type="participant" />
    })
    participants = <div className="participants">
      <h2>Participants</h2>
      <ul>{participant_list}</ul>
    </div>
  }
  
  let director_list = null
  let directors = null
  const directors_title = item.directors.length > 1 ? "Directors" : "Director"
  if (item.directors.length > 0) {
    director_list = item.directors.map(person => {
      return <Person person={person} showTitle="true" type="director" />
    })
    directors = <div className="directors">
      <h2>{directors_title}</h2>
      <ul>{director_list}</ul>
    </div>
  }

  let twitter = null
  if (item.twitter_account || item.twitter_hashtag) {
    const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
    const twitter_acct = item.twitter_account
      ? <span className="twitter_acct">
          <a href={`https://twitter.com/${item.twitter_account}`} target="_blank" rel="noreferrer">{item.twitter_account}</a>
        </span> : null
    const twitter_hash = item.twitter_hashtag 
      ? <span className="twitter_hash">
        <a href={`https://twitter.com/hashtag/${item.twitter_hashtag}`} target="_blank" rel="noreferrer">#{item.twitter_hashtag}</a>
      </span> : null
    twitter = <div className="twitter">{iconTwitter} {twitter_acct} {twitter_hash}</div>
  }

  let links_list = null
  let links = null
  let link_url = null
  if (item.links.length > 0) {
    links_list = item.links.map(l => {
      link_url = l.url.startsWith('http') 
        ? l.url 
        : `http://${l.url}`
      return <li id={l.link_id}><a href={link_url} title={l.title} target="_blank" rel="noreferrer">{l.title}</a></li>
    })
    links = <div className="links"><h2>Links</h2><ul>{links_list}</ul></div>
  }

  const sponsors = item.sponsors.length > 0 
    ? <SupporterList supporters={item.sponsors} type="sponsor" />
    : ''
  const partners = item.partners.length > 0 
    ? <SupporterList supporters={item.partners} type="partner" />
    : ''

  let events_list = null 
  let events = null
  if (item.events.length > 0) {
    events_list = item.events.map(e => {
      return <li id={e.id} className="event">
        <h3 className="title"><Link key={`e-${e.id}`} to={`../../events/${e.id}`}>{e.talk_title || e.event_title}</Link></h3>
        <EventTime start={e.start} end={e.end} />
        <div itemProp="location" className="location">{e.location}</div>
        <div className="description"></div>
        <Link className="button" key={`e-${e.id}`} to={`../../events/${e.id}`}>View Event Details</Link>
      </li>
    })
    events = <div className="events"><h2>Events</h2><ul>{events_list}</ul></div>
  }

  let news_list = null 
  let news = null
  if (item.posts.length > 0) {
    news_list = item.posts.map(n => {
      return <li id={n.slug.toLowerCase().replace(/-/g, '_')}>
        <div className="post-title"><Link key={`n-${n.record_id}`} to={`../../news/${n.slug}`}>{n.post_title}</Link></div>
        <div className="meta">
          <time className="post-date">{n.post_date}</time>
          <div className="author hidden">{n.author_name}</div>
        </div>
      </li>
    })
    news = <div className="news"><h2>News</h2><ul>{news_list}</ul></div>
  }

  const disciplines = item.disciplines.length > 0 
  ? <TaxonomyList terms={item.disciplines} type="disciplines" />
  : ''

  const methods = item.methods.length > 0 
  ? <TaxonomyList terms={item.methods} type="methods" />
  : ''

  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-research-item">
        <section className="research-item">
          {header}
          <div className="content">
            {description}
            {events}
          </div>
          <div className="sidebar metadata">
            {dates}
            {twitter}
            {directors}
            {participants}
            {links}
            {news}
            {partners}
            {sponsors}
          </div>       
        </section>
      </div>
    </Layout>
  )
}

export default Research
