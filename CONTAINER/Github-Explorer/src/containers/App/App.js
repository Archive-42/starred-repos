import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../../components/layout/NavBar';
import User from '../../containers/UserInfo/UserInfo';

import Home from '../Home/Home';
import Footer from '../../components/layout/Foooter';
import About from '../../components/layout/About';

function Blog() {
  return <h2> Blog </h2>;
}

function App() {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/user/:login'
              render={props => <User {...props} user={Home.getUser} />}
            />
            <Route path='/about' component={About} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
