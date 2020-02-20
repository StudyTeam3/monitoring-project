import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const SignUp = () => {
    return (
        <Fragment>
            <div>
                <img className="hmg" src="HMG.jpg" alt="hae"/>
            </div>
        <Form className="register-form">
            <div>
                <h2 style={{color:'#561689', textAlign: 'center', fontFamily:'현대하모니', fontSize:50, marginTop:'100px', marginBottom:'30px'}}>회원가입</h2>
            </div>
            
            <FormGroup className="mb-1">
            <Input type="email" placeholder="이메일"/>
            </FormGroup>
            <Button className="btn-sm btn-dark mt-0 mb-3">이메일 인증</Button>
            <FormGroup>
            <Input type="password" placeholder="비밀번호"/>
            </FormGroup>
            <FormGroup>
            <Input type="password" placeholder="비밀번호 확인"/>
            </FormGroup>
            <FormGroup>
            <Input type="text" placeholder="이름"/>
            </FormGroup>
            <div>
                <div className="toLogIn">
                    이미 계정이 있으세요?
                </div>
                <div className="toLogIn1">
                    <Link to="/LogIn" >로그인</Link>
                </div>
                <div className="toLogIn2">
                    <Link to="/LogIn" >
                    <Button color="primary" size="sm">계정 만들기</Button>
                    </Link>
                </div>
            </div>
        </Form>
        </Fragment>
    );
};

export default SignUp;