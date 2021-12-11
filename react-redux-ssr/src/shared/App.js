import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import routes from '@/shared/routes';
import '@/shared/App.css';
import '@/shared/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
      <div>
        { routes.map((route, i) => <Route key={i} {...route} />) }
      </div>
    );
  }
}

export default App;
