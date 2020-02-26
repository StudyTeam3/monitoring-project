import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";
import { login } from "../store/modules/loginModules";
import { connect } from "react-redux";
import axios from "axios";

const config = require("../config/config");

const LogIn = props => {
  let isLogined = props.isLogined;
  const login = props.login;

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const { email, password } = form;

  useEffect(() => {
    isLogined = window.sessionStorage.getItem("isLogined");
  }, [isLogined]);

  const loginLogic = e => {
    axios
      .post(config.development.url + "/user/signin", {
        email: email,
        password: password
      })
      .then(res => {
        // 로그인 성공
        if (res.data.result === "success") {
          // module 토큰저장로직
          login({
            token: res.data.token,
            name: res.data.name,
            email: res.data.email
          });
          axios
            .post(config.development.url + "/custom", {
              user_id: res.data.email,
              platform: "base"
            })
            .then(res => {
              window.sessionStorage.setItem("column", JSON.stringify(res.data));
            })
            .catch(err => {
              console.error(err);
            });
        }
        else {
          alert("아이디 혹은 비밀번호가 잘못되었습니다.");
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onChangeInput = e => {
    if (e.target.className === "email form-control")
      setForm({ ...form, email: e.target.value });
    else if (e.target.className === "password form-control")
      setForm({ ...form, password: e.target.value });
  };

  if (isLogined) props.history.push("/home");
  return (
    <Fragment>
      <div>
        <img className="hmg" src="HMG.jpg" alt="hae" />
      </div>
      <Form className="login-form">
        <div>
          <img className="logo" src="autoever.png" alt="hae" />
        </div>
        <FormGroup style={{ marginBottom: 10 }}>
          <Label
            style={{
              color: "#000066",
              fontFamily: "현대하모니",
              fontSize: 25,
              marginBottom: 2
            }}
          >
            아이디
          </Label>
          <Input
            value={email}
            className={"email"}
            onChange={onChangeInput}
            type="email"
            placeholder="이메일을 입력하세요."
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: 10 }}>
          <Label
            style={{
              color: "#000066",
              fontFamily: "현대하모니",
              fontSize: 25,
              marginBottom: 2
            }}
          >
            비밀번호
          </Label>
          <Input
            value={password}
            className={"password"}
            onChange={onChangeInput}
            type="password"
            placeholder="비밀번호를 입력하세요."
            onKeyPress={e => {
              if (e.key === "Enter") loginLogic();
            }}
          />
        </FormGroup>
        <Button
          onClick={loginLogic}
          className="btn-lg btn-block mt-2 mb-2"
          color="primary"
        >
          로그인
        </Button>
        <div className="text-center mt-2 mb-4">
          <Link to="/SignUp">회원가입</Link>
          <span className="p-2">|</span>
          <Link to="/ForgotPassword">비밀번호 찾기</Link>
        </div>
        <SocialLogin login={login}></SocialLogin>
      </Form>
    </Fragment>
  );
};

export default connect(
  state => {
    return { isLogined: state.loginModules.isLogined };
  },
  dispatch => ({
    login: data => {
      dispatch(login(data));
    }
  })
)(LogIn);
