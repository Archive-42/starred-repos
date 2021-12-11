import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import './header.css'
import Logo from '../svg/MITH-logostack-blk.svg'

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
