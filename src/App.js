import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar.js';
import LoginSignUpContainer from './LoginSignUp/loginSignUpContainer.js';
import HomeContainer from './Home/HomeContainer.js';
import Transactions from './Transaction/transactionContainer.js';
import BillContainer from './Bill/BillContainer.js';
import EventContainer from './Event/EventContainer.js';
import {Route, Redirect, Switch } from 'react-router-dom';
import AuthO from './AuthO'

class App extends Component {


setUserId = (user_id) =>this.setState({user_id})
  render() {

    // <Route exact path="/" component={LoginSignUpContainer}></Route>
    // <Route exact path="/transactions" component={Transaction}></Route>
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">Budget Life</h1>

      </header>
        <Switch>
        {AuthO.loggedIn() ?
            <React.Fragment>
              <NavBar/>
              <Route exact path="/home" render={(props) =>
                  <HomeContainer {...props} /> } />
              <Route exact path="/transactions" render={(props) =>
                  <Transactions {...props} /> } />
              <Route exact path="/events" render={(props) =>
                  <EventContainer {...props} /> } />
              <Route exact path="/bills" render={(props) =>
                  <BillContainer {...props} /> } />
              </React.Fragment>

          : <Route exact path="/" render={(props) =>
          <LoginSignUpContainer {...props} /> } />


      }
      {AuthO.loggedIn() ? null : <Redirect to="/"/>
        }
      </Switch>
      </div>
    );
  }
}


export default App;
