import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './person.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Person = ({ pageContext: person }) => {
  const name = person.name
  let photo = ''
  if (person.fields) {
    if (person.fields.headshot.childImageSharp) {
      photo = <div className="headshot">
        <GatsbyImage 
          image={person.fields.headshot.childImageSharp.gatsbyImageData}
          alt={`Headshot of ${person.name}`} 
          imgStyle={{
            objectFit: "cover",
          }}
        />
      </div>
    } else {
      photo = <div className="headshot">
        <img
          src={person.fields.headshot.publicURL}
          alt={`Headshot of ${person.name}`} 
          style={{
            objectFit: "cover",
          }} />
      </div>
    }
  }
  const iconEmail = <FontAwesomeIcon icon="envelope" />
  const email = person.email
    ? <span className="meta email">
        {iconEmail} 
        <a href={`mailto:${person.email}`}>{person.email}</a>
      </span> : ''
  const iconPhone = <FontAwesomeIcon icon="mobile-alt" />
  const phone = person.phone
    ? <span className="meta phone">
        {iconPhone}
        {person.phone}
      </span> : ''
  const iconWeb = <FontAwesomeIcon icon="globe" />
  const website = person.website
    ? <span className="meta website">
        {iconWeb}
        <a href={person.website}>{person.website}</a>
      </span> : ''
  const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
  const twitter = person.twitter
    ? <span className="meta twitter">
        {iconTwitter}
        <a href={`https://twitter.com/${person.twitter}`}>{person.twitter}</a>
      </span> : ''
  const bio = person.bio
    ? <div className='bio' dangerouslySetInnerHTML={{ __html: person.bio }} /> : ''

  return (
    <Layout>
      <SEO title={name} />
      <div className="page-person">
        <section className="person">
          <h1 className="name">{name}</h1>
          {photo}
          <div className="details">
            <h2 className="title">{person.title}</h2>
            <div className="metadata">
              {email} {phone} {website} {twitter}
            </div>
          </div>
          {bio}
        </section>
      </div>
    </Layout>
  )
}

export default Person
