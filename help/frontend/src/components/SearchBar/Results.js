import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// import './SearchBar.css'


const Results = () => {
  const person = useSelector(state => state.users.person)
  const locals = useSelector(state => state.locals.locals)

  let resultsRender
  if (locals) {
    resultsRender =
      Object.values(locals).map((person, idx) => {
      return (
        <div key={idx} className='results-container__body__local'>
            <NavLink className='navlinks' to={`/users/${person.id}`}>
              <div className='results-local-header'>
                <img className='results-local-header__image' src={person.avatar} />
                <h1 className='results-local-username'>{person.firstName} {person.lastName.slice(0, 1).toUpperCase()}.</h1>
              </div>
            </NavLink>
            <div className='results-local-user__bio'>{person.bio}</div>
        </div>
      )
    })
  } else {
    resultsRender = <div className='no-results-found'> No Results Found </div>
  }
  return (
    <div className='results_page'>
      <h1 className='results-title'>Helpers/Helpees in Your Area:</h1>
      {resultsRender.length ? 
        <div className='results-container__body'>{resultsRender}</div>
        :
        <p className='results-no-results'>No helpers/helpees in your area</p>
    }
    </div>
  )
}

export default Results;
