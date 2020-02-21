import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import modules from './modules';        // Recuder와 Action들을 한 파일에 묶어서 사용하는 Ducks 패턴의 파일 구조

const configure = () => {
  const store = createStore(modules, compose(applyMiddleware(ReduxThunk), applyMiddleware(thunkMiddleware)));
  return store;
}

export default configure;