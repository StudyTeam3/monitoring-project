import { createAction, handleActions } from "redux-actions";
import { sessionService } from "redux-react-session";

// Action Codes
// 액션 타입을 정의해줍니다.
const LOGIN = "loginLogic/LOGIN";
const LOGOUT = "loginLogic/LOGOUT";

// 액션 생성 함수를 만듭니다.
export const login = createAction(LOGIN, (data) => {
  window.sessionStorage.setItem("isLogined",true);
  window.sessionStorage.setItem("token",data.token);
  window.sessionStorage.setItem("name",data.name);
  window.sessionStorage.setItem("email",data.email);
});
export const logout = createAction(LOGOUT, () => {
  window.sessionStorage.removeItem("isLogined");
  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("column");
  window.sessionStorage.removeItem("name");
  window.sessionStorage.removeItem("email");
  window.localStorage.removeItem("firebaseui::rememberedAccounts");
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
