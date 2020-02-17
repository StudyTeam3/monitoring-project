import React, { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import NavigationDrawer from "./components/navigationDrawer/navigationDrawer";
import "@material/react-icon-button/dist/icon-button.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { TransactionDetail, TransactionSearch } from "./pages";
import notification from "./components/notification";
import "./css/common.css";
import "./App.css";
import 'react-notifications/lib/notifications.css';

function App() {
  const [whatDrawers, setWhatDrawers] = useState("notDrawers");
  const onSearchSubmit = props => {
    if (!props) setWhatDrawers("notDrawersWhenToggled");
    else setWhatDrawers("notDrawers");
  };

  return (
    <div>
      <div className={"drawerLeft"}>
        <div>
          <NavigationDrawer onSubmit={onSearchSubmit} />
        </div>
        <div className={whatDrawers}>
          <Router>
            <Route path="/detail" component={TransactionDetail} />
            <Route path="/home" component={Dashboard} />
            <Route path="/search" component={TransactionSearch}/>
            <Route path="/notification" component={notification}/>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
