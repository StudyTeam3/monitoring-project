import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={Dashboard} path="/dashboard" />
    </>
  );
};
export default App;


// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       loginPage:[],
//       registerPage:[],
//       dashBoard:[]
//     }
//   }
//   /*-- componentWillMount(){
//    } */
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {this.state.loginPage}
//           {this.state.registerPage}
//           {this.state.dashBoard}
//         </header>
//       </div>
//     );
//   }
// }
