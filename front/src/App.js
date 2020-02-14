import React, { Component, Fragment } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { SignUp, LogIn } from './pages';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { FacebookLoginButton, InstagramLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const App = () => {
    return (
      <Router>
        <Route path='/LogIn' component={LogIn}/>
        <Route path='/SignUp' component={SignUp}/>
      </Router>
      /*
      <Fragment>
        <div>
          <img className="hmg" src="HMG.jpg" alt="hae"/>
        </div>
      <Form className="login-form">
        <div>
          <img className="logo" src="autoever.png" alt="hae"/>
        </div>

        <FormGroup>
          <Label>Email</Label>
          <Input type="email" placeholder="Email"/>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" placeholder="Password"/>
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block">Log in</Button>
        <div className="text-center pt-3">Or continue with your social account</div>
        <FacebookLoginButton className="mt-3 mb-3" />
        <InstagramLoginButton className="mt-3 mb-3"/>
        <GoogleLoginButton className="mt-3 mb-3"/>
        
        
        <div className="text-center">
          <a href="/SignUp">Sign up</a>
          <span className="p-2">|</span>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </Form>
      </Fragment>
      */
    );
};
 
export default App;