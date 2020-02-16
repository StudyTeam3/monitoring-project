import React, { useState } from "react";
import NavigationDrawer from "./components/navigationDrawer/navigationDrawer";
import "./css/common.css";
import "@material/react-icon-button/dist/icon-button.css";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { TransactionDetail } from './pages';

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
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
