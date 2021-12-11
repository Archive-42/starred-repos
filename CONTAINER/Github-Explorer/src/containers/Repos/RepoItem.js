import React from 'react';

function RepoItem({ name, description, clone_url }) {
  return (
    <div className='repo-item'>
      <a href={clone_url} target='_'>
        <h3 className='repo-title'>{name}</h3>
      </a>
      <p className='repo-desc'>{description}</p>
    </div>
  );
}

export default RepoItem;
