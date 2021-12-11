require("dotenv").config()

module.exports = {
  pathPrefix: `mith-static`,
  siteMetadata: {
    title: `MITH`,
    siteUrl: "https://mith.umd.edu",
    description: `Maryland Institute for Technology in the Humanities`,
    author: `@UMD_MITH`,
    navLinks: [
      /*
      {
        name: "What We Do",
        link: "/what-we-do/"
      },
      {
        name: "Opportunities For Students",
        link: "/students/"
      },
      */
      {
        name: "Our Values",
        link: "/values/",
      },
      {
        name: "News",
        link: "/news/",
      },
      {
        name: "People",
        link: "/people/",
      },
      {
        name: "Research",
        link: "/research/",
      },
      {
        name: "Digital Dialogues",
        link: "/digital-dialogues/",
      },
      {
        name: "More Events",
        link: "/events/",
      },
      /*
      {
        name: "Partner With Us",
        link: "/partner-with-us/"
      }
      */
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./static/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `mith.umd.edu`,
        excludePaths: ["/mith-static/*"]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-24127640-1`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: false,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        name: `svg`,
        path: `${__dirname}/src/svg/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
        pedantic: false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `${__dirname}/src/news/`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                description
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          /*
          {
            title: `MITH News`,
            output: `/news/feed.xml`,
            serialize: ({query: {site, allAirtable}}) => {
              return allAirtable.nodes.map(node => (
                {
                  url: site.siteMetadata.siteUrl + '/news/' + node.data.slug + '/',
                  title: node.data.title,
                  date: node.data.date,
                  description: node.data.description ? node.data.description.childMarkdownRemark.excerpt : ''
                }
              ))
            },
            query: `
              {
                allAirtable(
                  filter: {
                    table: {eq: "Posts"}
                    data: {DD_Post: {eq: null}, Event_Post: {eq: null}}
                  }
                  limit: 25
                  sort: {fields: data___post_date, order: DESC}
                ) {
                  nodes {
                    data {
                      slug
                      author: author_name
                      title: post_title
                      date: post_date
                      description {
                        childMarkdownRemark {
                          excerpt
                        }
                      }
                    }
                  }
                }
              }
            `
          },
          {
            title: `MITH Events`,
            output: `/events/feed.xml`,
            serialize: ({query: {site, allAirtable}}) => {
              return allAirtable.nodes.map(node => (
                {
                  url: site.siteMetadata.siteUrl + '/events/' + node.data.slug + '/',
                  title: node.data.talk_title || node.data.event_title,
                  date: node.data.start_date,
                  description: node.data.description ? node.data.description.childMarkdownRemark.excerpt : ''
                }
              ))
            },
            query: `
              {
                allAirtable(
                  filter: {
                    table: {eq: "Events"}
                  }
                  limit: 25
                  sort: {fields: data___start_date, order: DESC}
                ) {
                  nodes {
                    data {
                      slug
                      event_title
                      talk_title
                      start_date
                      description {
                        childMarkdownRemark {
                          excerpt
                        }
                      }
                    }
                  }
                }
              }
            `
          }*/
        ],
      },
    },
  ],
}
