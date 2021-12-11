import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const OpportunitiesPage = () => (
  <Layout>
    <SEO title="Opportunities" />
    <div className="page-opportuntities">
      <section className="leader">
        <h1>Opportunities for Students</h1>
        <p>Intro Text</p>
      </section>
      <section id="internships" className="internships">
        <h2>Internships</h2>
        <p>Text</p>
      </section>
      <section id="fellowships" className="fellowships">
        <h2>Fellowships</h2>
        <p>Text</p>
      </section>
      <section id="curricula" className="curricula">
        <h2>Courses</h2>
        <p>Text</p>
      </section>
    </div>
  </Layout>
)

export default OpportunitiesPage
