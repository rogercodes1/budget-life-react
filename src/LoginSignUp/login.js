import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import {Form, Input, Button} from 'semantic-ui-react';
import adapter from './../adapter.js';
let url = "http://localhost:3001/sessions/"
class Login extends Component{
     constructor(){
        super();
        this.state={
          email: "",
          password: "",

        }
    }
    handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log("THIS.STATE",this.state);

    const body = this.state
    adapter.post(url,body)
    .then(response=>response.json())
    .then(json => {

      localStorage.setItem('token', json.token);
      localStorage.setItem('id', json.id);
      this.props.history.push("/home")
    })
  }
  handleChange = (e) => {
      console.log("before",e.target.name, "other", e.target.value)
      this.setState({[e.target.name] : e.target.value}, () => console.log(this.state))
  }

    render() {
        return (
            <div id="login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field
                      onChange={this.handleChange}
                        control={Input}
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter Email"/>
                    <Form.Field
                      onChange={this.handleChange}
                        control={Input}
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter Password"/>
                    <Form.Field id="loginButton" control={Button}>Login</Form.Field>

                </Form>
            </div>
        );
    }
}

export default Login;
