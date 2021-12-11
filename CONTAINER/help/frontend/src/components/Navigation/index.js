import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Navigation.css'
import ProfileButton from './ProfileButton'
import HomeLogo from './HomeLogo'
import SearchBar from '../SearchBar/index'

const Navigation = ({isLoaded}) => {
  const userSession = useSelector(state => state.session.user)
  
  let headerNavigation;
  if (userSession) {
    headerNavigation = ( <ProfileButton user={userSession}/>
    )
  } else {
    headerNavigation = (
      <div className='login-signup-container'>
        <NavLink className='login-button' to="/login">
          Log In
        </NavLink>
        <NavLink className='signup-button' to="/signup">
          Sign up
        </NavLink>
      </div>
    )
  }

  return (
      <div className="header">
        <HomeLogo />
        <SearchBar />
        {/* <div className="header-testimony">Write a Testimony</div> */}
        <div className="profile-drop"> {isLoaded && headerNavigation} </div>
      </div>
  );
}

export default Navigation;