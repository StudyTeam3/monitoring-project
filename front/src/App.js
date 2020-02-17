import React, { Component } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import NavigationDrawer from "./components/navigationDrawer/navigationDrawer";
import "@material/react-icon-button/dist/icon-button.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { TransactionDetail } from "./pages";
import "./css/common.css";
import "./App.css";

class App extends Component {
  state = {
    whatDrawers: "notDrawers"
  };

  onSearchSubmit = props => {
    if (!props) this.setState({ whatDrawers: "notDrawersWhenToggled" });
    else this.setState({ whatDrawers: "notDrawers" });
  };

  render() {
    return (
      <div>
        <div className={"drawerLeft"}>
          <div>
            <NavigationDrawer onSubmit={this.onSearchSubmit} />
          </div>
          <div className={this.whatDrawers}>
            <Router>
              <Route path="/detail" component={TransactionDetail} />
              {/* <Route path="/home" component={Dashboard} /> */}
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
