import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const ValuesPage = () => (
  <Layout>
    <SEO title="Our Values" />
    <div className="page-values">
      <section className="leader">
        <h1>Our Values</h1>
        <p><strong>We welcome everyone</strong> interested in digital approaches to social, cultural, and artistic inquiry—from beginners to experienced students and scholar-practitioners.</p>
        <p>We work to connect different research approaches and methods in meaningful ways. We value collaboration grounded in listening, exploring new ideas together, and supporting the development of skills. These collaborations may range from co-ownership of work to finding spontaneous connections by sharing our space. We invite nascent ideas along with more fully articulated ones. As both collaborators and learners, we are dedicated to participatory practices that elevate the many voices and skills involved. Our digital humanities work is often found where research practices and methods are forged and reimagined. <strong>Grounded in our own disciplines, we aspire to interdisciplinarity.</strong></p>
        <p>We prioritize openness across all of our work. We believe that scholarship requires a commitment to the ideals of open access, open source, and transparency. However, circumstances may require important and necessary research to happen in protected enclaves and with care for sensitive subjects. <strong>We are constantly in conversation with when, where, and how to be open.</strong></p>
        <p>We strive to communicate about our work in ways that are accessible to all of the audiences who might be interested or who might benefit. We practice sharing our scholarship and research products not only in journals but also on our blog, through digital repositories, and at conferences.</p>
        <p>We acknowledge that inclusivity is more than just making others feel welcome. It also requires giving regular attention to working for justice by changing systems and structures of privilege and power in which we are embedded. This means <strong>recognizing or respecting silences in the cultural record and seeking to collaborate with underrepresented communities.</strong></p>
      </section>
    </div>
  </Layout>
)

export default ValuesPage
