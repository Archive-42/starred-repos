import { Link } from 'gatsby'
import React from 'react'

import './paginator.css'

const Paginator = ({count, path}) => {
  return(
    <section className="pagination-wrap">
      <ul className="pagination">
        {Array.from({ length: count }, (_, i) => (
          <li className="page-link">
            <Link
              activeClassName="active" 
              className="page-link"
              key={`pagination-number${i + 1}`}
              to={`/${path}/${i === 0 ? "" : i + 1}`}>
              {i + 1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Paginator;