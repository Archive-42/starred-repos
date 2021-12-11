import React, { useState, useEffect } from "react";
import { Redirect, NavLink } from 'react-router-dom'

function HomeLogo() {
  
  const [redirectHome, setRedirectHome] = useState(false);

  const returnHome = () => {
    setRedirectHome(true)
  }

  useEffect(() => {
    setRedirectHome(false);
  }, [redirectHome])

  const goHome = () => {
    if (redirectHome) {
      return <Redirect to='/login' />
    }
  }

  return (
    <NavLink className='navlink-navigation' to='/'>
      <div onClick={returnHome} className="home-logo">
        {goHome()}
        <div className="home-logo__help">help</div>
        <i className="fas fa-hands-helping home-logo__hands"></i>
      </div>
    </NavLink>
  )
}

export default HomeLogo;