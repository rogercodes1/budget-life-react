import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar.js';
import LoginSignUpContainer from './LoginSignUp/loginSignUpContainer.js';
import HomeContainer from './Home/HomeContainer.js';
import Transactions from './Transaction/transactionContainer.js';
import BillContainer from './Bill/BillContainer.js';
import EventContainer from './Event/EventContainer.js';
import {Route, Redirect } from 'react-router-dom';
import AuthO from './AuthO'

class App extends Component {
    state={
        token:"",
        user_id: null,
    }

setUserId = (user_id) =>this.setState({user_id})
  render() {

    // <Route exact path="/" component={LoginSignUpContainer}></Route>
    // <Route exact path="/transactions" component={Transaction}></Route>
    console.log(this.state);
    return (
      <div className="App">


        {AuthO.loggedIn() ?
            <React.Fragment>
              <NavBar />
              <Route exact path="/home" render={(props) => <HomeContainer {...props}
                user_id={this.state.user_id}/> } />
              <Route exact path="/transactions" render={(props) => <Transactions {...props} user_id={this.state.user_id}/> } />
              <Route exact path="/events" render={(props) => <EventContainer {...props} user_id={this.state.user_id}/> } />
              <Route exact path="/bills" render={(props) => <BillContainer {...props} user_id={this.state.user_id}/> } />
              </React.Fragment>

        : <Redirect to="/"/>


      }
      <Route exact path="/" render={(props) => <LoginSignUpContainer
          setUserId={this.setUserId} {...props} /> } />
      </div>
    );
  }
}


export default App;
