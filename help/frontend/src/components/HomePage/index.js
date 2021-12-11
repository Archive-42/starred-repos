import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'

import './HomePage.css';
import HomeLogoAlternate from './HomeLogoAlternate'
import SearchBarAlternate from './SearchBarAlternate'
import Gallery from '../Gallery'
import * as usersAction from '../../store/users'

function HomePage() {
  // const dispatch = useDispatch()
  // const localPeople = useSelector(state => state.users.users)
  // const sessionUser = useSelector(state => state.session.user);
  // const [currentLocation, setCurrentLocation] = useState()
  // const [people, setPeople] = useState([])
  const images = [
    {
      original: '../images/SearchBarDemo.gif',
    },
    {
      original: '../images/HelperDemo.gif',
    },
    {
      original: '../images/HelpeeDemo.gif',
    },
  ];
  // const [isLoaded, setIsLoaded] = useState(false);

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         setCurrentLocation(pos)
  //       }, (err) => {
  //         showError(err)
  //       })
  //   } else {
  //     alert("Try another browser for geolocation services")
  //   }
  // }
  
  // function showError(error) {
  //   switch(error.code) {
  //     case error.PERMISSION_DENIED:
  //       alert("You must allow location services to use this app")
  //       break;
  //     case error.POSITION_UNAVAILABLE:
  //       alert("Location information is unavailable.")
  //       break;
  //     case error.TIMEOUT:
  //       alert("The request to get user location timed out.")
  //       break;
  //     case error.UNKNOWN_ERROR:
  //       alert("An unknown error occurred.")
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // useEffect(() => {
  //     getLocation()
  // }, [])
  
  // useEffect(() => {
  //   if (currentLocation) {
  //     dispatch(usersAction.searchPeople(currentLocation))
  //       .then((res) => setPeople(res))
  //       .then(() => setIsLoaded(true))
  //   }
  // },[dispatch, currentLocation])
  

  // let Helpers;
  // let Helpees;
  // if (isLoaded) {
  //   let countHelpee = 0;
  //   let countHelper = 0;
  //   Helpees = Object.values(localPeople).map((person, idx) => {
  //     if (countHelpee > 5) return;
  //     if (!person.user.helpType) {
  //       countHelpee = countHelpee + 1;
  //       return (
  //         <div key={idx} className={`users-container__body__local__helpees`}>
  //           <div className={`body-local__helpee`}>
  //             <NavLink className='navlinks' to={`/users/${person.user.id}`}>
  //             <div className='body-local-header'>
  //                 <img className='body-local-header__image' src={person.user.avatar}/>
  //                 <h1 className='body-local-username'>{person.user.firstName} {person.user.lastName.slice(0, 1).toUpperCase()}.</h1>
  //             </div>
  //               </NavLink>
  //             <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x180&maptype=roadmap
  //             &markers=color:blue%7Clabel:S%7C${person.user.lat},${person.user.lng}&key=${people.data.apiKey}`} />
  //             <div className='body-local-user__bio'>{person.user.bio}</div>
  //           </div>
  //         </div>
  //       )
  //     }
  //   })
  //   Helpers = Object.values(localPeople).map((person, idx) => {
  //     if (countHelper > 5) return;
  //     if (person.user.helpType) {
  //       countHelper = countHelper + 1;
  //       return (
  //         <div key={idx} className={`users-container__body__local__helpers`}>
  //           <div className={`body-local__helpee`}>
  //           <NavLink className='navlinks' to={`/users/${person.user.id}`}>
  //             <div className='body-local-header'>
  //               <img className='body-local-header__image' src={person.user.avatar}/>
  //               <h1 className='body-local-username'>{person.user.firstName} {person.user.lastName.slice(0, 1).toUpperCase()}.</h1>
  //               </div>
  //             </NavLink>
  //             <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x180&maptype=roadmap
  //             &markers=color:blue%7Clabel:S%7C${person.user.lat},${person.user.lng}&key=${people.data.apiKey}`} />
  //             <div className='body-local-user__bio'>{person.user.bio}</div>
  //           </div>
  //         </div>
  //       )
  //     }
  //     })
  // }

  return (
    <div className='homepage-main'>
      <div className='homepage-main-image'>
        <HomeLogoAlternate />
        <SearchBarAlternate />
      </div>
      <div className='homepage-about-what-container'>
        <div className='homepage-about-what-text'>
          <h1>What is help?</h1>
          <p>Help was developed during the 2020 pandemic to help people
          connect with their community and to provide assistance to our 
          neighbors in need.  Many elderly and/or disabled people struggle
          every day to accomplish the simple tasks such as driving to the grocery
          store or taking out the trash that we take for granted.  Help let's us
          bring legs to those who cannot walk and comfort and safety for those
          who are immunocompromised.
          </p>
          <p>
            Help is what brings it all together.  With interactive features such as 
            a task list for helpees(someone requesting help) and helpers(someone 
            willing to help), interactive maps to help you find someone in your area
            to be helped or to help out, and a way to leave testimony on someone's behalf,
            help is working to recreate community ties and relationships in even the most
            difficult times.
          </p>
        </div>
        <div id='homepage-about-what__images__container'>
          <img src="./images/help-images2.jpg" />
          <img src="./images/help-images3.jpg" />
          <img src="./images/help-images4.jpg" />
          <img src="./images/help-images5.jpg" />
          <img src="./images/help-images6.jpg" />
          <img src="./images/help-images7.jpg" />
        </div>
      </div>
      <div className='homepage-about-how-holder'>
        <div className='homepage-about-how-container'>
          <div className='homepage-gallery-container'>
            <Gallery className='homepage-gallery-gallery' images={images}></Gallery>
          </div>
          <div className='homepage-about-how-text'>
            <h1>How it works:</h1>
            <p>You can sign up as a helper (someone who wants to help out) or a 
              helpee (someone who needs help).  Fill out a basic form including
              your location to find help in your area.  You can add tasks to your
              task-list which will be selected by helpers.  Both of you will see
              when the task is completed and can leave a testimony or give helping-hands
              for a job well done.  Check out a few quick gifs in the adjacent gallery to 
              see app functionality in action!
            </p>
          </div>
        </div>
      </div>
      <div className='homepage-users-container__local'>
        {/* <div className='users-container__header__local'>Help in Your Area</div>
        <div className='users-container__body__local'> {sessionUser ? Helpees : null}
        </div>
        <div className='users-container__header__local'>Helpers in Your Area</div>
        <div className='users-container__body__local__2'> {sessionUser ? Helpers : null}
        </div> */}
      </div>
    </div>
  )
}

export default HomePage;