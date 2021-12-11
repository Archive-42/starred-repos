const path = require('path')
const {createRemoteFileNode} = require('gatsby-source-filesystem')

// When creating nodes, set the following fields with a markdown mediaType.
const toMarkdown = {
  'People' : ['bio'],
  'Research' : ['description', 'excerpt'],
  'Events' : ['description'],
  'Identities' : ['person bio']
}

// When creating nodes, set the following fields with an Image type.
const toImage = {
  'People' : ['headshot'],
  'Research' : ['image'],
  'Events' : ['image'],
  'Partners_Sponsors' : ['logo']
}

exports.onCreateNode = async ({
    node, getNode, actions, store, cache, createContentDigest, createNodeId
  }) => {

  const { createNode, createNodeField } = actions

  // Add source name to Markdown nodes.

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent)

    createNodeField({
      node,
      name: 'sourceName',
      value: parent.sourceInstanceName,
    })
  }

  // Set mediaTypes.
  for (const table in toImage) {
    if (node.internal.type === `${table}Json`) {
      for (const key of toImage[table]) {
        if (node[key]) {
          let fileNode
          try {
            fileNode = await createRemoteFileNode({
              url: node[key][0].url,
              parentNodeId: node.id,
              store,
              cache,
              createNode,
              createNodeId,
            })
          } catch (e) {
            console.error('Error downloading image:', e);
          }
      
          if (fileNode) {
            createNodeField({
              node,
              name: `${key}___NODE`,
              value: fileNode.id,
            })
          }
        }
      }
    }
  }

  for (const table in toMarkdown) {
    if (node.internal.type === `${table}Json`) {
      for (const key of toMarkdown[table]) {
        if (node[key]) {
          const formattedKey = (key.charAt(0).toUpperCase() + key.slice(1)).replace(/\s/g, '_')
          const tableName = table.toLowerCase()
          const textNode = {
            id: `${node.id}-Markdown${tableName}${formattedKey}`,
            parent: node.id,
            dir: path.resolve("./"),
            internal: {
              type: `${node.internal.type}Markdown${tableName}${formattedKey}`,
              mediaType: "text/markdown",
              content: node[key],
              contentDigest: createContentDigest(node[key])
            }
          }
          createNode(textNode)
      
          // Create markdownBio___NODE field
          createNodeField({
            node,
            name: `${tableName}${formattedKey}___NODE`,
            value: textNode.id,
          })
        }
      }
    }
  }

}

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
  await makePosts(createPage, graphql, pathPrefix)
  await makePostIndex(createPage, graphql, pathPrefix)
  await makeResearch(createPage, graphql, pathPrefix)
  await makeResearchIndex(createPage, graphql, pathPrefix)
  await makeEvents(createPage, graphql, pathPrefix)
  await makeEventIndex(createPage, graphql, pathPrefix)
  await makeDialogues(createPage, graphql, pathPrefix)
  await makeDialogueIndex(createPage, graphql, pathPrefix)
}

async function makePeople(createPage, graphql) {
  const results = await graphql(`
    query {
      allPeopleJson(
        filter: {
          group_type: {eq: "Staff"}
        }
      ) {
        nodes {
          name
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData(width: 500, height: 500, transformOptions: {fit: COVER}, quality: 100, backgroundColor: "rgba(255,255,255,0)")
              }
              publicURL
            }
            peopleBio {
              childMarkdownRemark {
                html
              }
            }
          }
          title
          website
          twitter
          phone
          email
          bio_external
          research_interests
          people_groups
          new_id
          id
        }
      }
    }  
  `)

  for (const node of results.data.allPeopleJson.nodes) {
    const person = node
    // Simplify fields
    if (person.fields) {
      person.bio = person.fields.peopleBio ? person.fields.peopleBio.childMarkdownRemark.html : person.bio
    }
    createPage({
      path: `/people/${person.id}/`,
      component: require.resolve(`./src/templates/person.js`),
      context: {
        ...person
      }
    })
  }
}

async function makePosts(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fields: {sourceName: {eq: "news"}}
        }
      ) {
        nodes {
          fileAbsolutePath
          html
        }
      }
    }
  `)
  
  for (const post of results.data.allMarkdownRemark.nodes) {
    const slug = path.basename(post.fileAbsolutePath, '.md')
    createPage({
      path: `/news/${slug}/`,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        slug,
        ...post
      }
    })
  }
}

async function makePostIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fields: {sourceName: {eq: "news"}}
        }
      ) {
        pageInfo {
          itemCount
        }
      }
    }
  `)

  const numPosts = results.data.allMarkdownRemark.pageInfo.itemCount
  const postsPerPage = 25
  const numPages = Math.ceil(numPosts / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/news` : `/news/${i + 1}`,
      component: path.resolve("./src/templates/post-index.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearchIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allResearchJson {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allResearchJson.pageInfo.itemCount
  const itemsPerPage = 30
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/research` : `/research/${i + 1}/`,
      component: path.resolve("./src/templates/research-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearch(createPage, graphql) {
  const results = await graphql(`
    query {
      allResearchJson {
        nodes {
          id
          fields {
            researchDescription {
              childMarkdownRemark {
                html
              }
            }
            researchExcerpt {
              childMarkdownRemark {
                html
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(width: 1400, quality: 100, backgroundColor: "rgba(255,255,255,0)")
              }
            }
          }
          active
          title
          twitter_account
          twitter_hashtag
          year_start
          month_start
          year_end
          month_end
          participants {
            name
            affiliations {
              title
              department
              institution
            }
            start
            end
            person_group
            slug
            new_id
          }
          directors {
            name
            affiliations {              
              title
              department
              institution
            }
            start
            end
            person_group
            slug
            new_id
          }
          links {
            title
            url
            type
          }
          sponsors {
            name
            website
            type
            slug
          }
          partners {
            name
            website
            type
            slug
          }
          events {
            id
            event_title
            talk_title
            talk_subtitle
            type: event_type
            start: start_date
            end: end_date
            location
          }
          posts {
            post_title
            author
            author_name
            post_date(formatString: "MMMM D, YYYY")
            slug
          }
          disciplines {
            term: name
            type: method_or_discipline
          }
          methods {
            term: name
            type: method_or_discipline
          }
        }
      } 
    }
  `)

  for (const node of results.data.allResearchJson.nodes) {
    const item = node
    createPage({
      path: `/research/${item.id}/`,
      component: require.resolve(`./src/templates/research.js`),
      context: {
        ...item
      }
    })
  }
}


async function makeEventIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allEventsJson {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allEventsJson.pageInfo.itemCount
  const itemsPerPage = 30
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/events/` : `/events/${i + 1}/`,
      component: path.resolve("./src/templates/event-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}


async function makeEvents(createPage, graphql) {
  const results = await graphql(`
    query {
      allEventsJson {
        nodes {
          id
          fields {
            eventsDescription {
              childMarkdownRemark {
                html
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(width: 1400, quality: 100, backgroundColor: "rgba(255,255,255,0)")
              }
            }
          }
          event_title
          talk_title
          talk_subtitle
          type: event_type
          start: start_date
          end: end_date
          location
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
          participants {
            name
            title
            department
            institution
            start
            end
            person_group
            slug
            new_id
          }
          links {
            title
            url
            type
          }
          sponsors {
            name
            website
            type
            slug
          }
          partners {
            name
            website
            type
            slug
          }
          research {
            id
            title
            image {
              url
            }
          }
          posts {
            post_title
            author
            author_name
            post_date(formatString: "MMMM D, YYYY")
            slug
          }
          disciplines {
            term: name
            type: method_or_discipline
          }
          methods {
            term: name
            type: method_or_discipline
          }
        }
      }
      allIdentitiesJson(
        filter: {
          person_bio: {ne: null}, 
          fields: {identitiesPerson_bio: {
            childMarkdownRemark: {html: {ne: ""} } 
          } }
        }
      ) {
        nodes {
          slug
          person_slug
          fields {
            identitiesPerson_bio {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
      allPeopleJson(
        filter: {
          events_as_speaker: {ne: null}
        }
      ) {
        nodes {
          slug
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
      allResearchJson(
        filter: {
          linked_events: {ne: null}, 
          image: {elemMatch: {url: {ne: null}}}
        }
      ) {
        nodes {
          id
          fields {
            image  {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }  
  `)

  for (const node of results.data.allEventsJson.nodes) {
    // Attach headshot and speakers bio from people and identities table
    node.speakers.forEach(sp => {
      results.data.allPeopleJson.nodes.map(pers => {
        if (pers.slug === sp.slug) {
          if (pers.fields) {
            sp.headshot = pers.fields.headshot
          }
        }
      })
      results.data.allIdentitiesJson.nodes.map(ident => {
        if (ident.person_slug === sp.slug) {
          if (ident.fields) {
            sp.bio = ident.fields.identitiesPerson_bio
          }
        }
      })
    })
    node.research.forEach(rr => {
      results.data.allResearchJson.nodes.map(research => {
        if (research.id === rr.id) {
          if (research.fields) {
            rr.image = research.fields.image
          }
        }
      })
    })
    createPage({
      path: `/events/${node.id}/`,
      component: require.resolve(`./src/templates/event.js`),
      context: {
        ...node
      }
    })
  }
}


async function makeDialogueIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allEventsJson {
        pageInfo {
          itemCount
        }
      }
      allPeopleJson(
        filter: {
          events_as_speaker: {ne: null}
        }
      ) {
        nodes {
          slug
          new_id
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  const numItems = results.data.allEventsJson.pageInfo.itemCount
  const itemsPerPage = 10
  const numPages = Math.ceil(numItems / itemsPerPage)

  const headshots = results.data.allPeopleJson.nodes.reduce((people, node) => {    
    people[node.slug] = node.fields ? node.fields.headshot : undefined
    return people
  }, {})

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/digital-dialogues/` : `/digital-dialogues/${i + 1}/`,
      component: path.resolve("./src/templates/dialogue-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
        headshots
      }
    })
  })
}


async function makeDialogues(createPage, graphql) {
  const results = await graphql(`
    query {
      allEventsJson(
        filter: {
          event_type: {eq: "Digital Dialogue"}
        }
        sort: {
          fields: [start_date], order: [DESC]
        }
      ) {
        nodes {
          id
          fields {
            eventsDescription {
              childMarkdownRemark {
                html
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(width: 1400, quality: 100, backgroundColor: "rgba(255,255,255,0)")
              }
            }
          }
          event_title
          talk_title
          talk_subtitle
          type: event_type
          start: start_date
          end: end_date
          location
          speakers {
            name
            affiliations {
              title
              department
              institution
            }
            website
            twitter
            slug
            new_id
          }
          links {
            id
            title
            url
            type
          }
          video_id: vimeo_id
          video_url: vimeo_url
          livestream: livestream_link
          sponsors {
            name
            website
            type
            slug
          }
          partners {
            name
            website
            type
            slug
          }
          disciplines {
            term: name
            type: method_or_discipline
          }
          methods {
            term: name
            type: method_or_discipline
          }
        }
      }
      allIdentitiesJson(
        filter: {
          person_bio: {ne: null}, 
          fields: {identitiesPerson_bio: {childMarkdownRemark: {html: {ne: ""} } } }
        }
      ) {
        nodes {
          slug
          person_slug
          fields {
            identitiesPerson_bio {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
      allPeopleJson(
        filter: {
          events_as_speaker: {ne: null}
        }
      ) {
        nodes {
          slug
          new_id
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  for (const node of results.data.allEventsJson.nodes) {
    // Attach headshot and speakers bio from people and identities table
    node.speakers.forEach(sp => {
      results.data.allPeopleJson.nodes.map(pers => {
        if (pers.slug === sp.slug) {
          if (pers.fields) {
            sp.headshot = pers.fields.headshot
          }
        }
      })
      results.data.allIdentitiesJson.nodes.map(pers => {
        //console.log(pers)
        if (pers.person_slug === sp.slug) {
          if (pers.fields) {
            sp.bio = pers.fields.identitiesPerson_bio
          }
        }
      })
    })
    createPage({
      path: `/digital-dialogues/${node.id}/`,
      component: require.resolve(`./src/templates/dialogue.js`),
      context: {
        ...node
      }
    })
  }
}
