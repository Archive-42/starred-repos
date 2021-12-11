import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const WhatWeDoPage = () => (
  <Layout>
    <SEO title="What We Do" />
    <div className="page-who-we-are">
        <section className="leader">
          <h1>What We Do</h1>
          <p>Intro text</p>
        </section>
        <section>
          <p>[other text here]</p>
        </section>
    </div>
  </Layout>
)

export default WhatWeDoPage
