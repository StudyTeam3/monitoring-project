import React, { useState } from "react";
import NavigationDrawer from "./components/navigationDrawer/navigationDrawer";
import "./css/common.css";
import "@material/react-icon-button/dist/icon-button.css";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  const [whatDrawers,setWhatDrawers] = useState("notDrawers");
  const onSearchSubmit = (props) => {
    if(!props) setWhatDrawers("notDrawersWhenToggled");
    else setWhatDrawers("notDrawers");
  }

  return (
    <div>
      <div className={"drawerLeft"}>
        <div>
          <NavigationDrawer onSubmit={onSearchSubmit} />
        </div>
        <div className={whatDrawers}>
          <TransactionDetail />
        </div>
      </div>
    </div>
  );
}

export default App;
