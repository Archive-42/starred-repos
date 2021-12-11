import React, { useState, useEffect } from 'react'

import './Footer.css';

function Footer() {
  return (
    <footer>
    <div className='github-about-container'>
      <a className='navlink-to-github' href='https://github.com/DaleTsakamoto/help'>
        <i className="fas fa-hands-helping footer-logo__hands"></i>
        <div className='github-about-text'>Repo</div>
      </a>
      <a className='navlink-to-github' href='https://daletsakamoto.github.io/'>
        <img className='github-image'src='/images/github-logo.png' />
        <div className='github-about-text'>About me</div>
      </a>
    </div>
  </footer>
  )
}

export default Footer;