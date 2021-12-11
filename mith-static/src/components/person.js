import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Person = ({ person, type }) => {

  let pageLocation = null
  if (person.person_group) {
    pageLocation = person.slug ? person.slug : null
  }
  let person_name = pageLocation // link current staff names to profile
    ? <Link 
      className="name" 
      id={person.new_id} 
      key={`p-${person.new_id}`} 
      to={`../../people/${pageLocation}`} 
      aria-label={`View ${person.name}'s Profile`} 
      title={`View ${person.name}'s Profile`}>{person.name}</Link>
    : <div className="name" id={person.new_id} >{person.name}</div>

    let date_span = null
    if ( type === "director" ) {
      const start = person.start 
        ? <span className="start">{person.start}</span> : null
      const end = person.end 
        ? <span className="end">{person.end}</span> : null
      if (person.start && person.end ) {
        date_span = <div className="date-span">({start} &ndash; {end})</div>
    } 
    if (person.start && !person.end) {
      const end = person.person_group 
        ?  <> &ndash; <span className="end">present</span></> : null
      date_span = <div className="date-span">({start}{end})</div>
    }
  } 

  let affiliations = ""
  if (person.affiliations) {
    affiliations = person.affiliations.map(aff => {
      let person_title = null
      let person_institution = null
      let person_dept = null
      if ( !person.person_group ) { // hide titles for current staff
        if ( type === "speaker" || type === "dialogue" || type === "participant" || type === "director" ) {
          person_title = aff.title 
            ? <span className="title">{aff.title}</span>
            : null
          person_dept = aff.department 
            ? <span className="dept">{aff.department}</span>
            : null
          person_institution = aff.institution
            ? <span className="institution">{aff.institution}</span>
            : null
        }
        if ( type === "dialogue-index") {
          person_institution = aff.institution
            ? <span className="institution">{aff.institution}</span>
            : null
        }
      }
      return (<>
        {person_title}
        {person_dept}
        {person_institution}
      </>)
    })
  }

  let twitter = null
  let headshot = null
  let website = null
  let hasImg = ""
  if (type === "speaker" || type === "dialogue" || type === "dialogue-index") {
    const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
    twitter = person.twitter
      ? <a href={`https://twitter.com/${person.twitter}`} className="twitter" target="_blank" rel="noreferrer">{iconTwitter} {person.twitter}</a> 
      : null
    if (person.headshot) {
      if (person.headshot.childImageSharp) {
        headshot = <GatsbyImage 
          image={person.headshot.childImageSharp.gatsbyImageData} 
          alt={person.name} 
          className="headshot" 
        />
      } else {
        headshot = <img
          src={person.headshot.url}
          alt={`Headshot of ${person.name}`} 
          className="headshot"
          style={{
            objectFit: "cover",
          }} 
        />
      }
      hasImg = "has-headshot"
    }
  }
  const bio_link = person.bio 
    ? <a href={`#${person.slug}`} className="bio-link">Read Bio</a> : null

  const person_bio = person.bio
    ? <div className="bio" dangerouslySetInnerHTML={{ __html: person.bio.childMarkdownRemark.html }} /> : ''

  if (person.website) {
    const website_url = person.website.startsWith('http') 
      ? person.website : `http://${person.website}`
    website = <a href={website_url} target="_blank" rel="noreferrer">Website</a>
  }

  if (type === "dialogue-index") {
    return (
      <div className={`speaker person ${hasImg}`} id={person.new_id} title={person.name} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">
            {affiliations}
          </div>
        </div>
      </div>
    )
  }
  if (type === "dialogue") {
    return (
      <span className={`speaker person ${hasImg}`} id={person.new_id} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">
            {affiliations}
            {twitter}
            {website}
            {bio_link}
          </div>
        </div>
      </span>
    )
  } 
  if (type === "speaker") {
    return (
      <span className={`speaker person ${hasImg}`} id={person.new_id} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">
            {affiliations}
            {twitter}
            {website}
          </div>
        </div>
        {person_bio}
      </span>
    )
  } 
  if (type !== "dialogue-index" && type !== "dialogue") {
    return (
      <div className={`person ${hasImg}`} id={person.new_id} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">
            {affiliations}
            {date_span}
            {twitter}
            {website}
          </div>
        </div>
      </div>
    )
  }
}

export default Person
