import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import Login from './login.js';
import SignUp from './signUp.js';
import {Menu, Segment} from 'semantic-ui-react';

class LoginSignUpContainer extends Component{
    constructor(props){
        super(props);
    this.state = {
        activeItem: 'signUp',

    }



}
handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
}
        render(){
          console.log(this.props,"this isprops");
          console.log(this.props.token,"token");

        return (
            <div id="loginSignUp">
                <div>
                <Menu tabular>
                    <Menu.Item
                        name='signUp'
                        active={this.state.activeItem === 'signUp'}
                        onClick={this.handleItemClick} />

                    <Menu.Item
                        name='login'
                        active={this.state.activeItem === 'login'}
                        onClick={this.handleItemClick} />
                </Menu>
                </div>
                <Segment>
                    {(this.state.activeItem ==="signUp") ? <SignUp {...this.props} /> : <Login {...this.props}/>}


                </Segment>

            </div>
        )
    }
}

export default LoginSignUpContainer
