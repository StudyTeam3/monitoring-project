import React, { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import NavigationDrawer from "./components/navigationDrawer/navigationDrawer";
import "@material/react-icon-button/dist/icon-button.css";
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  TransactionDetail,
  TransactionSearch,
  SignUp,
  LogIn,
  ForgotPassword
} from "./pages";
import { logout } from "./store/modules/loginModules";
import "./css/common.css";
import "./App.css";
import "react-notifications/lib/notifications.css";
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { FacebookLoginButton, InstagramLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
// import SocialLogin from './components/SocialLogin';

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
            <Route path="/LogIn" component={LogIn} />
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/home" component={Dashboard} />
            <Route path="/search" component={TransactionSearch} />
            <Switch>
              <Route path="/detail/:mid" component={TransactionDetail} />
              <Route path="/detail" component={TransactionDetail} />
            </Switch>
            <Route path="/SignUp" component={SignUp} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;