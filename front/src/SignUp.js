import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
// import API from '../api/api';
import { withStore } from '../store';
import axios from 'axios';
const config = require("../config/config");


class SignUp extends React.Component {
    constructor(props){
        const defaults ={
            email:'',password:'',password2:'',username:''};
        super(props);
        this.state = {user: defaults, formErrors: {}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      
      handleSubmit(event) {
        event.preventDefault();
        const { user, formErrors } = this.state;
        const { history, store } = this.props;
        

        Object.keys(user).forEach(field => this.validateField(field));
        const hasErrors = Object.values(formErrors).filter(e => e).length;

        if (!user || hasErrors) return;
        axios
        .post(config.development.url +"/user/signup",user)
        .then(({ data }) => {
              this.setState({ error: null });
              store.set('user', data.user);
              window.sessionStorage.setItem('token', data.token);
              history.push('/');
            // console.log(res.data);
            // window.sessionStorage.setItem('column', JSON.stringify(res.data));
          })
          .catch(err => {
          console.error(err);
  
        });

        // if (!user || hasErrors) return;
        // API.post('auth/register', user)
        //   .then(({ data }) => {
        //     this.setState({ error: null });
        //     store.set('user', data.user);
        //     localStorage.setItem('token', data.token);
        //     history.push('/');
        //   })
        //   .catch((error) => {
        //     this.setState({ error });
        //   });
    }
   
    handleChange(event) {
        const { user } = this.state;
        const name = event.target.id;
        const { value } = event.target;
        user[name] = value;
        this.setState({ user }, () => { this.validateField(name, value); });
      }
    
      validateField(fieldName) {
        const { formErrors, user } = this.state;
        const value = user[fieldName];
        let valid;
    
        switch (fieldName) {
          case 'email':
            valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            formErrors.email = valid ? '' : 'Email is invalid';
            break;
          case 'username':
            valid = !!value;
            formErrors[fieldName] = valid ? '' : 'Please fill this field';
            break;
          case 'password':
            valid = value.length >= 6;
            formErrors.password = valid ? '' : 'Password is too short';
            break;
          case 'password2':
            valid = value === user.password;
            formErrors.password2 = valid ? '' : 'Password doesn\'t match';
            break;
          default:
            break;
        }
        this.setState({ formErrors });
      }
    
      // eslint-disable-next-line class-methods-use-this
      errorClass(error) {
        return (error ? 'is-invalid' : '');
      }
    
      render() {
        const { user, formErrors, error } = this.state;

        return (
            <Fragment>
                <div>
                    <img className="hmg" src="HMG.jpg" alt="hae"/>
                </div>
            <Form onSubmit={this.handleSubmit} className="register-form">
                <div>
                    <h2 style={{color:'#561689', textAlign: 'center', fontFamily:'현대하모니', fontSize:50, marginTop:'100px', marginBottom:'30px'}}>회원가입</h2>
                </div>
                    { error && (
                <div className="alert alert-danger">
                    Some error occurred
                </div>
                )}  
                <FormGroup className="mb-1">
                <Input type="email"
                    className={`form-control ${this.errorClass(formErrors.email)}`}
                    id="email" 
                    placeholder="이메일" 
                    onChange={this.handleChange}
                    value={user.email}/>
                {formErrors.email && (
                <div className="invalid-feedback">
                  {formErrors.email}
                </div>
              )}
                </FormGroup>

                <Button className="btn-sm btn-dark mt-0 mb-3">이메일 인증</Button>
                <FormGroup>
                <Input type="password" 
                className={`form-control ${this.errorClass(formErrors.password)}`}
                id="password"
                placeholder="비밀번호"
                onChange={this.handleChange}
                value={user.password}/>
                  {formErrors.password && (
                <div className="invalid-feedback">
                  {formErrors.password}
                </div>
              )}
                </FormGroup>
                <FormGroup>
                <Input type="password" 
                 className={`form-control ${this.errorClass(formErrors.password2)}`}
                 id="password2"
                placeholder="비밀번호 확인"
                onChange={this.handleChange}
                value={user.password2}
                />
                   {formErrors.password2 && (
                <div className="invalid-feedback">
                  {formErrors.password2}
                </div>
              )}
                </FormGroup>
                <FormGroup>
                <Input type="text" 
                 className={`form-control ${this.errorClass(formErrors.username)}`}
                 id="username"
                 placeholder="이름"
                 onChange={this.handleChange}
                 value={user.username}
                />
                 {formErrors.firstName && (
                <div className="invalid-feedback">
                  {formErrors.username}
                </div>
              )}
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
                        <Button type="submit" color="primary" size="sm">계정 만들기</Button>
                        </Link>
                    </div>
                </div>
            </Form>
            </Fragment>
        );
    }
}

SignUp.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    store: PropTypes.object.isRequired,
  };

export default withStore(SignUp);