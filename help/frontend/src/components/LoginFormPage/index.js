import React, { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to='/' />
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    return dispatch(sessionActions.login({
      credential,password
    })).catch((res) => {
      if (res.data && res.data.errors) {
        setErrors(res.data.errors)
      }
    })
  }

  const demo__helper = () => {
      let credential = 'Demo_helper'
      let password = 'password'
      return dispatch(sessionActions.login({
      credential, password
      }))
  }
  
  const demo__helpee = () => {
    let credential = 'Demo_helpee'
    let password = 'password'
    return dispatch(sessionActions.login({
    credential, password
    }))
  }

  return (
    <div className='login-all'>
      <div className='login-form-container'>
        <h1 className='login-h1'>Log in to help</h1>
        <div className='new-login-form'>
          <h2 className='login-h2'>New to help? </h2>
          <NavLink to='/signup' className='navlink-login'>Sign up</NavLink>
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            <input
              placeholder= 'Username/Email'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className='login-form-button' type="submit">Log In</button>
        </form>
        <button className='demo-login-form-button' onClick={demo__helper} type='button'>Demo Helper Log In</button>
        <button className='demo-login-form-button' onClick={demo__helpee} type='button'>Demo Helpee Log In</button>
      </div>
      <div className='login-image-holder'>
        <img className='login-image' src='/images/login-pic.jpg'/>
      </div>
    </div>
  );
}

export default LoginFormPage;