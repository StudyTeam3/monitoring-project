import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <Button className="btn-sm btn-dark mt-0 mb-3" onClick={() => {alert("인증 메일을 보냈습니다.")}}>이메일 인증</Button>
            <FormGroup>
            <Input type="password" placeholder="새 비밀번호"/>
            </FormGroup>
            <FormGroup>
            <Input type="password" placeholder="새 비밀번호 확인"/>
            </FormGroup>
            <div className="toLogIn3">
                <Link to="/LogIn" >돌아가기</Link>
            </div>
            <Link to="/LogIn" >
            <Button className="float-right" color="primary" onClick={() => {alert("비밀번호가 변경되었습니다.")}}>비밀번호 변경</Button>
            </Link>
        </Form>
        </Fragment>
    );
};

export default ForgotPassword;