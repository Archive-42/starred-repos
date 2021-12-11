import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import './people.css'

const PeoplePastPage = ({ data }) => {
  
  function makePerson(person) {
    let identities = person.linked_identities || []
    return (
    <article className="person" id={person.new_id} title={person.name} key={`p-${person.new_id}`}>
      <h3 className="name">{person.name}</h3>
      <div className="details">
        {identities
        .sort((a, b) => a.start - b.start)
        .map(identity => {
          const end = identity.start === identity.end ? '' : <span className="end">{identity.end}</span>
          return (<article className="identity" id={identity.id} key={`i-${identity.id}`}>
            <span className="title">{identity.title}</span>
            <span className="date-span">
              <span className="start">{identity.start}</span>
              {end}
            </span>   
          </article>)
        })}     
      </div>
    </article>
    )    
  }

  return (
    <Layout>
      <SEO title="Past People" />
      <div className="page-past-people">
        <section className="leader hidden">
          <h1 className="page-title text-hidden">Past People</h1>
        </section>
        {
          data.people.group.filter(g => g.fieldValue.startsWith('Past'))
          .sort((a, b) => data.groups.nodes.filter(g => g.group_name === a.fieldValue)[0].sort - data.groups.nodes.filter(g => g.group_name === b.fieldValue)[0].sort)
          .map(people => {
            return (
              <section id={people.fieldValue.toLowerCase().replace(' ', '_')} className="people-group">
                <h2>{people.fieldValue}</h2>
                {people.nodes.map(person => {
                  return makePerson(person)
                })}
              </section>
            )
          })
        }
      </div>
    </Layout>
  )
}
export const query = graphql`
  query PeoplePastQuery {
    people: allPeopleJson(
      filter: {group_type: {regex: "/Past/"}}
      sort: {fields: [last]}
    ) {
      group(field: people_groups) {
        fieldValue
        nodes {
          name
          last
          linked_identities {
            title
            start
            end
          }
          id
          new_id
        }
      }
    }
    groups: allGroupsJson {
      nodes {
        sort
        group_name
      }
    }
  }
`
 
export default PeoplePastPage