import './App.css';
import {  BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import Login from './components/Login'
import Registration from './components/Registration'
import Invite from './components/Invite'

function App() {


  return (
    <>
    <div className="App">
    <h1>Welcome to Potluck-planner</h1>
    </div>
    <Router>
    <Switch>
      <PrivateRoute exact path="/protected" component={Invite}/>
      <Route path="/login" component={Login} />
      <Route path="/Registration" component={Registration} />
    </Switch>
    </Router>
    </>
  );
}

export default App;
