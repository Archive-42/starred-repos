import React, {useState, useEffect} from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [helpType, setHelpType] = useState(true)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState()
  const [errors, setErrors] = useState([])

  if (sessionUser) {
    return <Redirect to="/" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return (
        dispatch(sessionActions.signup({ email, username, password, firstName, lastName, helpType, address, city, state, zipCode }))
      )
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup-all'>
      <div className='signup-form-container'>
        <h1 className='signup-h1'>Sign Up for help</h1>
        <div className='new-signup-form'>
          <h2 className='signup-h2'>Already have an account? </h2>
          <NavLink to='/login' className='navlink-signup'>Log In</NavLink>
        </div>
        <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
      <div className='signup-special-container'>
        <label>
          <input
          className='signup-special-input__1'
          placeholder='First Name'
          value={firstName}
          type='text'
          onChange={ e => setFirstName(e.target.value) }
          required
          />
        </label>
        <label>
          <input
          className='signup-special-input__2'
          placeholder='Last Name'
          value={lastName}
          type='text'
          onChange={ e => setLastName(e.target.value) }
          required
        />
        </label>
      </div>
      <label>
        <input
          placeholder='Email'
          value={email}
          type='email'
          onChange={ e => setEmail(e.target.value) }
          required
        />
      </label>
      <label>
        <input
          placeholder='Username'
          value={username}
          type='text'
          onChange={ e => setUsername(e.target.value) }
          required
        />
      </label>
      <label>
        <input
          placeholder='Password'
          value={password}
          type='password'
          onChange={ e => setPassword(e.target.value) }
          required
          />
      </label>
      <label>
        <input
          placeholder='Confirm Password'
          value={confirmPassword}
          type='password'
          onChange={ e => setConfirmPassword(e.target.value) }
          required
          />
      </label>
      <label>
        <input
          placeholder='Address'
          value={address}
          type='text'
          onChange={ e => setAddress(e.target.value) }
          required
          />
      </label>
      <label>
        <input
          placeholder='City'
          value={city}
          type='text'
          onChange={ e => setCity(e.target.value) }
          required
          />
      </label>
      <label>
        <input
          placeholder='State'
          value={state}
          type='text'
          onChange={ e => setState(e.target.value) }
          required
          />
      </label>
      <label>
        <input
          placeholder='Zip Code'
          value={zipCode}
          type='text'
          onChange={ e => setZipCode(e.target.value) }
          required
          />
          </label>
      <div className='special-container-2'>
        <label className='signup-help-type-label'htmlFor="helpType">Help Type:
          <select className='signup-help-type-select' id ='helpType' onChange={e => setHelpType(e.target.value)} name="helpType">
            <option value={true} required>Helper</option>
            <option value={false} required>Helpee</option>
          </select>
        </label>
        <button className='signup-button-submit' type="submit">Sign-up</button>    
      </div>
    </form>
      </div>
      <img className='signup-image' src='/images/login-pic.jpg'/>
    </div>
    
  )
}

export default SignupFormPage;