import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './people.css'

const PeoplePage = ({ data }) => { 

  function makePerson(person, useWebsite=false) {
    let pageLocation = person.id
    if (useWebsite) {
      if (person.website) {
        pageLocation = person.website.startsWith('http')
          ? person.website
          : `http://${person.website}`
      } else {
        pageLocation = null
      }
    }

    let img = ''
    if (person.fields.headshot) {
      const el = <GatsbyImage 
        image={person.fields.headshot.childImageSharp.gatsbyImageData}
        alt={`Headshot of ${person.name}`} 
        imgStyle={{
          objectFit: "cover",
        }}
      />
      img = pageLocation
        ? <Link key={`p-${person.new_id}`} id={person.new_id} to={pageLocation} className="headshot">{el}</Link>
        : el
    }

    let persName = pageLocation 
      ? <Link key={`p-${person.new_id}`} id={person.new_id} to={pageLocation}>{person.name}</Link>
      : person.name

    let identities = ''
    if (person.current_identities) {
      identities = person.current_identities.map(identity => {
        return (identity.department === 'MITH' || identity.department === 'Maryland Institute for Technology in the Humanities' || identity.department === null)
          ? <div className="identity" id={identity.id} key={`i-${identity.id}`}>
            <span className="title">{identity.title}</span>
          </div>
          : <div className="identity" id={identity.id} key={`i-${identity.id}`}>
            <span className="title">{identity.title}</span>
            <span className="department">{identity.department}</span>
          </div>
      })
    }

    return (
      <article className="person" id={person.new_id} title={person.name} key={`p-${person.new_id}`}>
        {img}
        <h3 className="name">{persName}</h3>
        {identities}
      </article>
    )    
  }

  function makeStaff(people) {    
    return people.nodes.map(person => {
      return makePerson(person)
    })
  }

  function makeAffiliates(affiliates) {    
    return affiliates.nodes.map(person => {
      return makePerson(person, true)
    })
  }

  return (
		<Layout>
      <SEO title="People" />
      <div className="page-people">
        <section className="leader hidden">
          <h1 className="page-title text-hidden">People</h1>
        </section>
        <section id="facstaff" className="people-group">
          <h2>Faculty &amp; Staff</h2>
          {data.people.group
            .filter(g => g.fieldValue === 'Staff')
            .map(makeStaff)
          }
        </section>
        <section id="affiliates" className="people-group">
          <h2>Affiliates</h2>
          {data.people.group
            .filter(g => g.fieldValue === 'Affiliates')
            .map(makeAffiliates)
          }
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PeopleQuery {
    people: allPeopleJson(
      sort: {
        fields: last
      }, 
      filter: {
        group_type: {in: ["Staff", "Affiliates"]}
      }
    ) {
      group(field: group_type) {
        fieldValue
        nodes {
          id
          new_id
          name
          first
          last
          website
          twitter
          current_identities {
            id
            title
            department
            institution
            person_bio
          }
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData(height: 500, width: 500, transformOptions: {fit: COVER}, backgroundColor: "rgba(255,255,255,0)")
              }
            }
          }
        }
      }
    }
  }
`
 
export default PeoplePage