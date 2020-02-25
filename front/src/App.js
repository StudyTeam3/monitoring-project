import React, { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import NavigationDrawer from "./components/navigationDrawer/navigationDrawer";
import "@material/react-icon-button/dist/icon-button.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {
  TransactionSearch,
  SignUp,
  LogIn,
  ForgotPassword,
  Setting
} from "./pages";
import TransactionDetailContainer from "./components/container/TransactionDetailContainer";
import { connect } from "react-redux";
import { logout, login } from "./store/modules/loginModules";
import "./css/common.css";
import "./App.css";
import "react-notifications/lib/notifications.css";

function App(props) {
  const [whatDrawers, setWhatDrawers] = useState("notDrawers");
  const onSearchSubmit = props => {
    if (!props) setWhatDrawers("notDrawersWhenToggled");
    else setWhatDrawers("notDrawers");
  };

  return (
    <div>
      <Router>
        <div className={"drawerLeft"}>
          <div>
            <NavigationDrawer onSubmit={onSearchSubmit} logout={logout} />
          </div>
          <div className={whatDrawers}>
            <Route path="/LogIn" component={LogIn} login={login} />
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/home" component={Dashboard} />
            <Route path="/setting" component={Setting} />
            <Switch>
              <Route path="/search/:data" component={TransactionSearch} />
              <Route path="/search" component={TransactionSearch} />
              <Route
                path="/detail/:data/:mid"
                component={TransactionDetailContainer}
              />
              <Route path="/detail" component={TransactionDetailContainer} />
            </Switch>
            <Route path="/SignUp" component={SignUp} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default connect(null, dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  login: () => {
    dispatch(login());
  }
}))(App);
