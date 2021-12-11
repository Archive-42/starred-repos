import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom'

import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return (
      <Redirect to='/' />
    )
  };
  
  sessionUser.avatar ?
    <div className="dropdodwn-avatar" onClick={openMenu}>
      <img className='dropdown-image' alt ='profile' src={sessionUser.avatar}/>
    </div> :
  <div className="dropdown-avatar" onClick={openMenu}>
  <i className="far fa-user dropdown-image-temp" />
  </div>


  return (
    <>
       {user.avatar ? 
        <div className="dropdodwn-avatar" onClick={openMenu}>
          <img className='dropdown-image' alt='avatar' src={user.avatar}/>
        </div>
        :
        <div className="dropdown-avatar" onClick={openMenu}>
          <i className="far fa-user dropdown-image-temp" />
        </div>
        }
      {showMenu && (
        <div className="profile-dropdown">
          <div className='profile-dropdown__about-me'>
            <i className="fas fa-user"></i>
            <a className='profile-dropdown__link' href={`/users/${user.id}`}>About Me </a>
          </div>
          <div>
            <i className="fas fa-sign-out-alt"></i>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;