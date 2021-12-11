import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import ArticleList from './components/Article/ArticleList';
import ArticlePage from './components/Article/ArticlePage';
import Navigation from './components/Navigation/Navigation';
import NotFoundPage from './components/NotFound/NotFound';


class App extends React.Component{
  render(){
    return(
      <BrowserRouter>

          <div className="App">

            <Navigation/>

              <div id="page-body">
                <Switch>
                    <Route path="/home" component={Home}  />            
                    <Route path="/about" component={About}  />
                    <Route path="/article" component={ArticleList} exact />
                    <Route path="/article/:name" component={ArticlePage} exact />
                    <Route component={NotFoundPage} />
                </Switch>
              </div>      

          </div>
      
      </BrowserRouter>
    );
  }
}

export default App;