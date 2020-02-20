import React, { useState, useEffect } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import IconButton from "@material/react-icon-button";
import { MdDashboard, MdSearch, MdSettings } from "react-icons/md";
import { GoSignOut, GoBell } from "react-icons/go";
import { Route, BrowserRouter, Link, Redirect } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import firebase from 'firebase';
import "../../css/NavigationDrawer.css";
import "../../css/alarm.css";
import axios from "axios";

const AlarmUrl = "http://localhost:5000/alarm"

const createNotification = () => {

  return async () => {
    let { data: alarms } = await axios.get(AlarmUrl);
    console.log(alarms);
    for(var i = 0; i < Object.keys(alarms).length; i++){
      if(!alarms[i].success)
      NotificationManager.error(String(alarms[i].message_id), String(alarms[i].time+" 에러 발생"), 5000, () => {
        alert('detail page로 이동');
      });
    }
  }

}



const NavigationDrawer = props => {
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

  useEffect(() => {
    
    createNotification();
  
    // returned function will be called on component unmount 
    return () => {
      createNotification();
    }
  }, [])

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
            props.onSubmit(isToggled);
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
              <h1 className={"drawerUserName"}>
                {isToggled && firebase.auth().currentUser.displayName}
              </h1>
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
                  <IconButton onClick={createNotification()}>
                    <GoBell color={"white"} />
                      <p className = "circle" style={{position:"absolute", bottom:"10px", right:"5px", color:"#000066", fontSize: "15px"}}>5</p>  
                  </IconButton>
                </NavIcon>
              </NavItem>
            </div>
            <div className={states.bottomIconState}>
              <NavItem eventKey="signout" className={"bottomIcons"}>
                <NavIcon>
                  <Link to="/LogIn">
                  <IconButton>
                    <GoSignOut color={"white"} onClick={() => firebase.auth().signOut()}/>
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

export default NavigationDrawer;
