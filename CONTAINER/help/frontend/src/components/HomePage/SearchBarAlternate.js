import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as searchActions from '../../store/search'

// import './HomePage.css'

function SearchBarAlternate() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [keywordSearch, setKeywordSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [errors, setErrors] = useState([]);

  

  const activateSearch = async () => {
    setErrors([])
    if (!locationSearch) {
      dispatch(searchActions.localsFind({ keywordSearch })).catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
          return alert(res.data.errors)
        }
      })
      .then(() => {
        setKeywordSearch('')
        document.querySelector('.alt-search-bar__keyword').value = '';
      })
        .then(() => goRedirect())
    } else {
      dispatch(searchActions.localsFindLocation({ keywordSearch, locationSearch })).catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
          return alert(res.data.errors)
        }
      })
        .then(() => {
          setLocationSearch('')
          setKeywordSearch('')
          document.querySelector('.alt-search-bar__location').value = '';
          document.querySelector('.alt-search-bar__keyword').value = '';
        })
        .then(() => goRedirect())
    }
  }


  const goRedirect = () => {
    let path = '/results'
    return history.push(path);
  }

  return (
    <div className='alt-search-container'>
    <div className="alt-search-bar">
      <input
      onChange={(e) => setKeywordSearch(e.target.value)}
      className="alt-search-bar__keyword"
      placeholder="Dale Sakamoto, demo_helpee"
      name="keywordSearch" />
      <input
      onChange={(e) => setLocationSearch(e.target.value)}
      className="alt-search-bar__location"
      placeholder="San Francisco"
      name="locationSearch" />
      <button onClick={activateSearch} className="alt-search-button">
        <i className="fas fa-search alt-magnify" />
      </button>
      </div>
      <div>
        <ul className='alt-search-errors'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      </div>
  )
}

export default SearchBarAlternate;