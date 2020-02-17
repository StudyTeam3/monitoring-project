import React, { Component, setState } from "react";
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import NavigationDrawer from "./components/navigationDrawer/navigationDrawer";
import "./css/common.css";
import "@material/react-icon-button/dist/icon-button.css";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { TransactionDetail } from './pages';


class App extends Component {

  state = {
    whatDrawers : "notDrawers",
  }

  // const [whatDrawers,setWhatDrawers ] = useState("notDrawers");

  onSearchSubmit = props => {
    if (!props) this.setState({whatDrawers: "notDrawersWhenToggled"});
    else this.setState({whatDrawers:"notDrawers"});
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
              <Route path="/home" component={Dashboard} />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;