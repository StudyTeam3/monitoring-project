import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Redirect, Route, Link, BrowserRouter as Router } from 'react-router-dom';

firebase.initializeApp({
    apiKey: "AIzaSyATkNK3W9-PGD5uNKxR6V7hLjrA996Sqp8",
    authDomain:"fir-auth-tutorial-4bff8.firebaseapp.com"
})

class SocialLogin extends Component {
    state = { isSignedIn: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = ()=>{
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn:!!user})
        })
    }
    render() {
        return (
            <div>
                {this.state.isSignedIn ? (
                    <Redirect from="LogIn" to="Home" />
                    //<button onClick={() => firebase.auth().signOut()}>로그아웃</button>
                )  : (
                    <div>
                    <StyledFirebaseAuth 
                        uiConfig={this.uiConfig}    
                        firebaseAuth={firebase.auth()}
                    />
                    </div>
                )}
            </div>
        );
    }
}

export default SocialLogin;