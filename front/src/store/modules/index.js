import { combineReducers } from 'redux';
import loginModules from './loginModules';

// 모든 Modules(Reducer + Actions)들을 묶어줄 수 있다.
export default combineReducers({
    loginModules
});