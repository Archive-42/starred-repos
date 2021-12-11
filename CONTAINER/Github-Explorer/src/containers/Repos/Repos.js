import React from 'react';
import RepoItem from './RepoItem';

function Repos({ repos }) {
  return (
    <div className='repo-container'>
      {repos.map(repo => (
        <RepoItem {...repo} />
      ))}
    </div>
  );
}

export default Repos;
