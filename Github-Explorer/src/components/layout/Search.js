import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../containers/App/App.css';

const Search = ({ searchUsers, clearUser, showClear, setAlert }) => {
  const [text, setText] = useState('');

  // Form submit
  const getQuery = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Field is Empty', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  const updateValue = e => {
    setText(e.target.value);
  };

  return (
    <div className='search-container'>
      <form className='form' onSubmit={getQuery}>
        <input
          className='input-search'
          onChange={updateValue}
          name='text'
          type='text'
          value={text}
          placeholder='Type Github Username . . .'
        />
      </form>

      {showClear && (
        <button className='btn btn-primary' onClick={clearUser}>
          Clear Users{' '}
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.func.isRequired
};

export default Search;
