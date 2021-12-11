import React from 'react'
import { useSelector } from 'react-redux'


const Overview = () => {
  const person = useSelector(state => state.users.person)

  return (
    <>
      <h1 className='bio-title'>Biography:</h1>
      <div className='bio-body'>{person.bio}</div>
    </>
  )
}

export default Overview;