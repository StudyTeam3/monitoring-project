import React, { Component, Fragment } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { SignUp, LogIn, ForgotPassword } from './pages';




import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { FacebookLoginButton, InstagramLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import SocialLogin from './components/SocialLogin';

const App = () => {
    
    
    return (
      <Router>
        <Route path='/LogIn' component={LogIn}/>
        <Route path='/SignUp' component={SignUp}/>
        <Route path='/ForgotPassword' component={ForgotPassword}/>
        
      </Router> 
    );
};
 
export default App;