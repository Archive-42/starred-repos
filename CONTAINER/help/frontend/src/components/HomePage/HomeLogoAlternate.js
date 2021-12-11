import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'

// import './HomePage.css'

function HomeLogoAlternate() {
  
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
    <div onClick={returnHome} className="alt-home-logo">
      {goHome()}
      <div className="alt-home-logo__help">help</div>
      <i className="fas fa-hands-helping alt-home-logo__hands"></i>
    </div>
  )
}

export default HomeLogoAlternate;