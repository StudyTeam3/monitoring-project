import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard></Dashboard>
      </div>
    );
  }
}

export default App;