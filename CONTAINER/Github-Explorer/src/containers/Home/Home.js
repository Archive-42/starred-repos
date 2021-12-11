import React from 'react';
import axios from 'axios';
import User from '../../components/users/Users';
import Search from './../../components/layout/Search';
import Alert from '../../components/layout/Alert';

class Home extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  // async componentDidMount(){
  //     this.setState({loading : true});
  //     const res = await axios(`https://api.github.com/users?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`);
  //     this.setState({users :res.data, loading : false});
  // }

  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = e => {
    this.setState({ users: [], loading: false });
  };

  setAlertMessage = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { loading, users, alert } = this.state;

    return (
      <div>
        <Search
          searchUsers={this.searchUsers}
          clearUsers={this.clearUsers}
          showClear={users.length > 0 ? true : false}
          setAlert={this.setAlertMessage}
        />

        <Alert alert={alert} />

        <User users={users} loading={loading} />
      </div>
    );
  }
}

export default Home;
