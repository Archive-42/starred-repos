import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = props => {
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {props.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: 'flex',
  'flex-direction': 'row',
  'flex-wrap': 'wrap',
  'justify-content': 'space-around',
  'flex-gap': '2em',
   margin: '20px',
};

export default Users;
