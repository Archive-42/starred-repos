import React from 'react';
import '../../containers/App/App.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <p>
        Made with <i className={icons.love} /> by Deepak Kumar{' '}
      </p>
      <div className='social-links'>
        <a className='url' href={urls.github} target=''>
          <i className={icons.github} />
        </a>
        <a className='url' href={urls.linkedin} target=''>
          <i className={icons.linkedin} />
        </a>
        <a className='url' href={urls.instagram} target=''>
          <i className={icons.instagram} />
        </a>
        <a className='url' href={urls.twitter} target=''>
          <i className={icons.twitter} />
        </a>
      </div>
    </div>
  );
}

const urls = {
  instagram: 'http://instagram.com/diipakkr',
  github: 'https://github.com/dipakkr',
  linkedin: 'https://www.linkedin.com/in/dipakkr/',
  twitter: 'https://twitter.com/diipakkr'
};

const icons = {
  love: 'fa fa-heart',
  instagram: 'fab fa-instagram',
  twitter: 'fab fa-twitter',
  github: 'fab fa-github',
  linkedin: 'fab fa-linkedin'
};

export default Footer;
