import React, { useState, useEffect } from "react";
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
import axios from "axios";

const AlarmUrl = "http://localhost:5000/alarm"

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

  const [AlarmCount, setAlarmCount] = useState(0);

  const createNotification = () => {
    return async () => {
      let { data: alarms } = await axios.get(AlarmUrl);
      let tempCount = 0;
      console.log(alarms);
      for(var i = 0; i < Object.keys(alarms).length; i++){
        if(!alarms[i].success && alarms[i].commu_type == "Response"){
          NotificationManager.error(String(alarms[i].message_id), String(alarms[i].time+" 에러 발생"), 5000, () => {
            alert('detail page로 이동');
          });
          tempCount += 1;
        }
      }
      setAlarmCount(tempCount);
    }
  }

  useEffect(() => {
    return async() => {
      let tempCount = 0;
      let { data: alarms } = await axios.get(AlarmUrl);

      for(var i = 0; i < Object.keys(alarms).length; i++){
        if(!alarms[i].success && alarms[i].commu_type == "Response"){

          tempCount += 1;
        }
      }
      setAlarmCount(tempCount);
      console.log("알람",tempCount);
    }
    // returned function will be called on component unmount 
    // return () => {
    //   setAlarmCount(1);
    // }
  },[AlarmCount]);

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
                  <IconButton onClick={createNotification(AlarmCount)}>
                    <GoBell color={"white"} />
                      <p className = "circle" style={{position:"absolute", bottom:"10px", right:"5px", color:"#000066", fontSize: "15px"}}>{AlarmCount}</p>  
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
          <NotificationContainer/>
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
