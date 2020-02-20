import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import IconButton from "@material/react-icon-button";
import { MdDashboard, MdSearch, MdSettings } from "react-icons/md";
import { GoSignOut, GoBell } from "react-icons/go";
import { Route, BrowserRouter, Link, Redirect } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import firebase from "firebase";
import "../../css/NavigationDrawer.css";
import "../../css/alarm.css";

const createNotification = type => {
  return () => {
    for (var i = 0; i < 5; i++) {
      NotificationManager.error("Error message", "Click me!", 5000, () => {
        alert("callback");
      });
    }
  };
};

const NavigationDrawer = props => {
  const onSubmit = props.onSubmit;
  const isLogined = props.isLogined;
  /*
   * bottomIconState: 토글 될 때마다 css를 바꿔주기 위한 변수
   * isToggled: 토글 되었는지 확인하는 변수
   */
  const [states, setStates] = useState({
    bottomIconState: "bottomDivs",
    isToggled: false,
    selectedPage: ""
  });
  const { bottomIconState, isToggled, selectedPage } = states;

  return (
    <Route
      render={({ location, history }) => (
        <SideNav
          onToggle={toggled => {
            if (!isToggled) {
              setStates({
                ...states,
                bottomIconState: "bottomMidDivs",
                isToggled: true
              });
            } else {
              setStates({
                ...states,
                bottomIconState: "bottomDivs",
                isToggled: false
              });
            }
            onSubmit(isToggled);
          }}
          onSelect={selected => {
            const to = "/" + selected;
            if (location.pathname !== to) {
              history.push(to);
            }
          }}
          expanded={isToggled}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected={selectedPage}>
            <div>
              <p className={"drawerUserName"}>
                {isToggled && ( isLogined ? firebase.auth().currentUser.displayName : "계정 정보가 없습니다." )}
              </p>
              <hr className={"drawerHeaderLine"} />
            </div>
            <NavItem eventKey="home">
              <NavIcon>
                <MdDashboard />
              </NavIcon>
              <NavText>Dashboard</NavText>
            </NavItem>
            <NavItem eventKey="search">
              <NavIcon>
                <MdSearch />
              </NavIcon>
              <NavText>트랜잭션 검색</NavText>
            </NavItem>
            <NavItem eventKey="setting">
              <NavIcon>
                <MdSettings />
              </NavIcon>
              <NavText>설정</NavText>
            </NavItem>
          </SideNav.Nav>
          <div className={"bottomBigDivs"}>
            <div className={states.bottomIconState}>
              <NavItem eventKey="alarm" className={"bottomIcons"}>
                <NavIcon>
                  <IconButton onClick={createNotification("error")}>
                    <GoBell color={"white"} />
                    <p
                      className="circle"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "5px",
                        color: "#000066",
                        fontSize: "15px"
                      }}
                    >
                      5
                    </p>
                  </IconButton>
                </NavIcon>
              </NavItem>
            </div>
            <div className={states.bottomIconState}>
              <NavItem eventKey="signout" className={"bottomIcons"}>
                <NavIcon>
                  <Link to="/LogIn">
                    <IconButton>
                      <GoSignOut
                        color={"white"}
                        onClick={() => firebase.auth().signOut()}
                      />
                      <Redirect to="LogIn" />
                    </IconButton>
                  </Link>
                </NavIcon>
              </NavItem>
            </div>
          </div>
          {/* <NotificationContainer/> */}
        </SideNav>
      )}
    />
  );
};

export default connect(
  state => ({
    // props 값으로 넣어 줄 상태를 정의해줍니다.
    isLogined: state.loginModules.isLogined
  }),
)(NavigationDrawer);
