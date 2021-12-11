import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const InternshipsPage = () => (
  <Layout>
    <SEO title="Internships" />
    <div className="page-internships">
      <section className="leader">
        <h1>Internships</h1>
        <p>MITH supports the work of emerging undergraduate digital humanities scholars through internships. With the guidance of MITH staff, interns have the time and mentorship to learn new skills as they contribute to ongoing MITH projects. Interns will explore advanced applied computational humanities, and contribute to the intellectual programming of MITH.</p>
        <h2>Eligibility</h2>
        <p>Applicants must be a third or fourth year undergraduate enrolled at the University of Maryland.</p>
        <p>To apply please email <a href="mailto:purdom@umd.edu">Purdom Lindblad</a> the following:</p>
        <ol>
          <li>Letter of Interest, including a skills assessment identifying your current skills and past relevant experience;</li>
          <li>CV;</li>
          <li>Major GPA, Overall GPA;</li>
          <li>Contact info for one reference.</li>
        </ol>            
        <p>MITH Undergraduate Interns can expect to work 6-9 hours per week in the MITH offices, including a weekly cohort meeting. MITH Interns will write 1 or 2 blog posts per term, with editorial assistance from MITH Staff.</p>
      </section>
    </div>
  </Layout>
)

export default InternshipsPage
