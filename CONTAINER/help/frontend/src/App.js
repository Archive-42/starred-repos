import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import UserPage from "./components/UserPage"
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import NavigationAlternate from './components/NavigationAlternate'
import Navigation from './components/Navigation'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import Results from './components/SearchBar/Results'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Switch>
        <Route path="/login">
          <Navigation isLoaded={isLoaded}/>
          <LoginFormPage />
          <Footer />
        </Route>
        <Route path="/signup">
          <Navigation isLoaded={isLoaded}/>
          <SignupFormPage />
          <Footer />
        </Route>
        <Route path="/results">
          <Navigation isLoaded={isLoaded}/>
          <Results />
          <Footer />
        </Route>
        <Route path="/users/:id">
          <Navigation isLoaded={isLoaded}/>
          <UserPage />
          <Footer />
        </Route>
        <Route path="/">
          <NavigationAlternate isLoaded={isLoaded}/>
          <HomePage />
          <Footer />
        </Route>
      </Switch>
      </>
  );
}

export default App;
