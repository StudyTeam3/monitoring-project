import { createStore } from 'redux';
import modules from './modules';        // Recuder와 Action들을 한 파일에 묶어서 사용하는 Ducks 패턴의 파일 구조

const configure = () => {
  const store = createStore(modules);
  return store;
}

export default configure;