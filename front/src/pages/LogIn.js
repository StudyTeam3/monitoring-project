import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, InstagramLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';

const LogIn = () => {
    return (
        <Fragment>
            <div>
            <img className="hmg" src="HMG.jpg" alt="hae"/>
            </div>
        <Form className="login-form">
            <div>
            <img className="logo" src="autoever.png" alt="hae"/>
            </div>
            <FormGroup style={{marginBottom: 10}}>
                <Label style={{color:'#000066', fontFamily:'현대하모니', fontSize:25, marginBottom: 2 }}>아이디</Label>
                <Input type="email" placeholder="abcde123@email.com"/>
            </FormGroup>
            <FormGroup style={{marginBottom: 10}}>
                <Label style={{color:'#000066', fontFamily:'현대하모니', fontSize:25, marginBottom: 2 }}>비밀번호</Label>
                <Input type="password" placeholder="********"/>
            </FormGroup>
            <Button className="btn-lg btn-block mt-2 mb-2" color="primary">로그인</Button>
            <div className="text-center mt-2 mb-4">
            <Link to="/SignUp">회원가입</Link>
            <span className="p-2">|</span>
            <Link to="/ForgotPassword">비밀번호 찾기</Link>
            </div>
            <SocialLogin></SocialLogin>
            
      </Form>
      </Fragment>
    );
};

export default LogIn;