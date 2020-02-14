import React, { useState } from "react";
import NavigationDrawer from "./component/navigationDrawer/navigationDrawer";
import logo from "./logo.svg";
import "./css/common.css";
import "@material/react-icon-button/dist/icon-button.css";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  return (
    <div>
      <div className={"drawerLeft"}>
        <div>
          <NavigationDrawer />
        </div>
        <div className={"notDrawers"}>
          <TransactionDetail />
        </div>
      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
