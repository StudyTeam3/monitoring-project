import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <Fragment>
            <div>
                <img className="hmg" src="HMG.jpg" alt="hae"/>
            </div>
        <Form className="register-form">
            <div>
                <h2 style={{color:'#561689', textAlign: 'center', fontFamily:'현대하모니', fontSize:50, marginTop:'100px', marginBottom:'30px'}}>
                    비밀번호 찾기
                </h2>
            </div>
            
            <FormGroup className="mb-1">
            <Input type="email" placeholder="이메일"/>
            </FormGroup>
            <Button className="btn-sm btn-dark mt-0 mb-3">이메일 인증</Button>
            <FormGroup>
            <Input type="password" placeholder="새 비밀번호"/>
            </FormGroup>
            <FormGroup>
            <Input type="password" placeholder="새 비밀번호 확인"/>
            </FormGroup>
            <div className="toLogIn3">
                <Link to="/LogIn" >돌아가기</Link>
            </div>
            <Button className="float-right" color="primary">비밀번호 변경</Button>
        </Form>
        </Fragment>
    );
};

export default ForgotPassword;