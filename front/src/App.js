import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search'
import Filter from './components/filter'


function App() {
  return (
    <Fragment>
      <div><h1>트랜잭션 검색</h1></div>
      <hr class = 'line'/>

      <div><Filter/></div>
      <div class = 'table'><Search></Search></div>

    </Fragment>
  );
}

export default App;