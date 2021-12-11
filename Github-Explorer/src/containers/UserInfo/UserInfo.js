import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../components/layout/Spinner';
import { Link } from 'react-router-dom';
import '../App/App.css';
import Repos from '../Repos/Repos';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      repos: [],
      loading: true
    };
  }

  async componentDidMount(props) {
    const login = this.props.match.params.login;
    console.log(login);

    this.setState({ loading: true });

    //Getting User data
    const res = await axios(`https://api.github.com/users/${login}`);
    const repoRequest = await axios(
      `https://api.github.com/users/${login}/repos?per_page=5&affiliation=owner`
    );
    this.setState({ user: res.data, repos: repoRequest.data, loading: false });
  }

  render() {
    const { user, loading } = this.state;

    const {
      login,
      avatar_url,
      html_url,
      hireable,
      name,
      email,
      followers,
      following,
      repos_url,
      location,
      bio,
      public_repos,
      company,
      public_gists,
      blog
    } = this.state.user;

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className='user-container'>
          <Link to='/' className='btn btn-light'>
            Back to Search
          </Link>
          <header className='userinfo-header'>
            <img
              src={avatar_url}
              className='round-img'
              alt='Profile'
              style={{ width: '120px', border: '3px solid blue' }}
            />

            <div class='profile-name'>
              <h3>{name}</h3>
              <p>{bio}</p>
              <p>{location}</p>
            </div>

            <div className='user-stats'>
              <div className='user-follower'>
                <h2>{followers}</h2>
                <p> Followers </p>
              </div>
              <div className='user-following'>
                <h2>{following}</h2>
                <p> Following </p>
              </div>
              <div className='user-repos'>
                <h2>{public_repos}</h2>
                <p> Repos </p>
              </div>
            </div>
          </header>

          <h3 style={{ 'margin-top': '40px', 'margin-bottom': '20px' }}>
            Trending Repositories{' '}
          </h3>

          <Repos repos={this.state.repos} />
        </div>
      );
    }
  }
}

export default UserInfo;
