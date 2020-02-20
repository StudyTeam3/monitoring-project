import { createAction, handleActions } from 'redux-actions';

// Action Codes
// 액션 타입을 정의해줍니다.
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// 액션 생성 함수를 만듭니다.
export const login = createAction(LOGIN);
export const logout = () => ({ type: LOGOUT });

// Reducer Codes
// 모듈의 초기 상태를 정의합니다.
const initialState = {
  isLogined: false
};

// **** 리듀서 작성 위 예제는 redux-actions를 사용했을 때
// export default handleActions({
//   [LOGIN]: (state, action) => { isLogined: true },
//   [LOGOUT]: (state, action) => { isLogined: false },
// }, initialState);


export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogined: true
      };
    case LOGOUT:
      return {
        ...state,
        isLogined: false
      };
    default:
      return state;
  }
}