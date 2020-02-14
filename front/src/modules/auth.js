import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({form,key,value})=> ({
    form, // register, login
    key, //email, password, passwordConfirm, username
    value, // 바꾸려는 값 
    }),
  );

export const initializeForm = createAction(INITIALIZE_FORM, form=>form); // register or login
export const register = createAction(REGISTER, ({ email, username, password }) => ({
  email,
  username,
  password
}));
export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password
}));

// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}



const initialState = {
  register:{
    email:'',
    password:'',
    passwordConfirm:'',
    username:'',
  },
  login:{
    email:'',
    password:'',
  },
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState,
);

export default auth;
