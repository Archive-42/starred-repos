import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './NavigationAlternate.css'
import ProfileButton from '../Navigation/ProfileButton'

const NavigationAlternate = ({isLoaded}) => {
  const userSession = useSelector(state => state.session.user)
  
  let headerNavigation;
  if (userSession) {
    headerNavigation = ( <ProfileButton user={userSession}/>
    )
  } else {
    headerNavigation = (
      <div className='login-signup-container-alt'>
        <NavLink className='login-button-alt' to="/login">
          Log In
        </NavLink>
        <NavLink className='signup-button-alt' to="/signup">
          Sign up
        </NavLink>
      </div>
    )
  }

  return (
    <div className="alt-header">
      {userSession ? 
      <a href={`/users/${userSession.id}/testimony/`} className="alt-header-testimony">Read my Testimony</a>
      :
      <a></a>
    }
        <div className="alt-profile-drop"> {isLoaded && headerNavigation} </div>
      </div>
  );
}

export default NavigationAlternate;