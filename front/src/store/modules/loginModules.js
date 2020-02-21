import { createAction, handleActions } from "redux-actions";
import { sessionService } from "redux-react-session";

// Action Codes
// 액션 타입을 정의해줍니다.
const LOGIN = "loginLogic/LOGIN";
const LOGOUT = "loginLogic/LOGOUT";

// 액션 생성 함수를 만듭니다.
export const login = createAction(LOGIN, () => {
  window.sessionStorage.setItem("isLogined",true);
  window.sessionStorage.setItem("token","abc");
});
export const logout = createAction(LOGOUT, () => {
  window.sessionStorage.removeItem("isLogined");
  window.sessionStorage.removeItem("token");
});

// Reducer Codes
// 모듈의 초기 상태를 정의합니다.
const initialState = {
  isLogined: false
};

// **** 리듀서 작성
// 위 예제는 redux-actions를 사용했을 때
export default handleActions(
  {
    [LOGIN]: (state, action) => ({ isLogined: true }),
    [LOGOUT]: (state, action) => ({ isLogined: false })
  },
  initialState
);
