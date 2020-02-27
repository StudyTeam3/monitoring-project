import { combineReducers } from 'redux';
import loginModules from './loginModules';
import columnModules from './columnModules';
import filterModules from './filterModules';
// import { sessionReducer } from 'redux-react-session';

// 모든 Modules(Reducer + Actions)들을 묶어줄 수 있다.
export default combineReducers({
    loginModules,
    columnModules,
    filterModules
});