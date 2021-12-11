import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../containers/App/App.css';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className='box text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '120px' }}
      />

      <h3>{login}</h3>

      <div>
        <Link
          to={`/user/${login}`}
          className='button is-danger is-outlined'
          style={buttonStyle}
        >
          More
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  'margin-top': '10px',
  height: '1.5em'
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
