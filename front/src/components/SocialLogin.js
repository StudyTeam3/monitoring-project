import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { login } from "../store/modules/loginModules";
import axios from "axios";
const config = require("../config/config");

firebase.initializeApp({
  apiKey: "AIzaSyATkNK3W9-PGD5uNKxR6V7hLjrA996Sqp8",
  authDomain: "fir-auth-tutorial-4bff8.firebaseapp.com"
});

class SocialLogin extends Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(() => {
      if (firebase.auth().currentUser !== null) {
        this.props.login({token:firebase.auth().currentUser.uid});
        const user_id = firebase.auth().currentUser.email;
        const platform = firebase.auth().currentUser.providerData[0].providerId;
        // Social Login시 custom
        axios
        .post(config.development.url + "/custom", {
          user_id : user_id,
          platform: platform
        })
        .then(res => {
          window.sessionStorage.setItem('column', JSON.stringify(res.data));
        })
        .catch(err => {
        console.error(err);
      });
      }
    });
  };
  render() {
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    // props 값으로 넣어 줄 상태를 정의해줍니다.
    isLogined: state.loginModules.isLogined
  }),
  dispatch => ({
    login: (data) => {
      dispatch(login(data));
    }
  })
)(SocialLogin);
