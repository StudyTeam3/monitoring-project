import { createAction, handleActions } from "redux-actions";

// Action Codes
// 액션 타입을 정의해줍니다.
const FILTER = "FILTER";
const DATA = "DATA";
const FROM = "FROM";
const TO = "TO";
const FUNCTION = "FUNCTION";
const STATUS = "STATUS";
const SERVICE = "SERVICE";
const SERVER = "SERVER";
const MESSAGE_ID = "MESSAGE_ID";
const CAR_ID = "CAR_ID";

// 액션 생성 함수를 만듭니다.
export const filterAction = createAction(FILTER, data => data);
export const dataAction = createAction(DATA, data => data);
export const fromAction = createAction(FROM, data => data);
export const toAction = createAction(TO, data => data);
export const funcAction = createAction(FUNCTION);
export const statusAction = createAction(STATUS);
export const serviceAction = createAction(SERVICE);
export const serverAction = createAction(SERVER);
export const message_idAction = createAction(MESSAGE_ID);
export const car_idAction = createAction(CAR_ID);

// Reducer Codes
// 모듈의 초기 상태를 정의합니다.
const initialState = {
  filterOn: false,
  data: [],
  from: null,
  to: null,
  function: "",
  status: "",
  service: "",
  server: "",
  message_id: "",
  car_id: ""
};

// **** 리듀서 작성
// 위 예제는 redux-actions를 사용했을 때
export default handleActions(
  {
    [FILTER]: (state, { type, payload }) => ({ ...state, filterOn: payload }),
    [DATA]: (state, { type, payload }) => ({ ...state, data: payload }),
    [FROM]: (state, { type, payload }) => ({ ...state, from: payload }),
    [TO]: (state, { type, payload }) => ({ ...state, to: payload }),
    [FUNCTION]: (state, action) => ({ from: state.function }),
    [STATUS]: (state, action) => ({ from: state.status }),
    [SERVICE]: (state, action) => ({ from: state.service }),
    [SERVER]: (state, action) => ({ from: state.server }),
    [MESSAGE_ID]: (state, action) => ({ from: state.message_id }),
    [CAR_ID]: (state, action) => ({ from: state.car_id })
  },
  initialState
);
