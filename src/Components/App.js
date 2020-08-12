import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomeComponent from './Home';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isUserAuthenticated: true
    };
}
render(){
  return (
    <div className="App">
      <Router>
      <Switch>
  <Route path="/home">
    <HomeComponent />
  </Route>
    {/* The default route */}
  <Route
    exact
    path="/"
    render={() => {
        return (
            this.state.isUserAuthenticated ?
            <Redirect to="/home" /> :
            null
        )
    }}
/>
</Switch>
</Router>
    </div>
  );
}
}

export default App;
