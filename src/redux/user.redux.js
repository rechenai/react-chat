import axios from 'axios'
import * as utils from "./utils";

const initState = {
  isAuth: false,
  redirectTo: '',
  avator: '',
  user: '',
  pwd: '',
  errMsg: '',
  type: ''
}

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOAD_DATA = 'LOAD_DATA'

export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS: 
      return { ...state, isAuth: true, redirectTo: utils.getRedirectPath(action.payload), errMsg: "", ...action.payload }
    case LOGIN_SUCCESS: 
      return { ...state, isAuth: true, redirectTo: utils.getRedirectPath(action.payload), errMsg: "", ...action.payload }
    case ERROR_MSG: 
      return { ...state, isAuth: false, errMsg: action.errMsg}
    case LOAD_DATA:
      return {...state, ...action.payload}
      default:
      return state
  }
}

function errorMsg(msg) {
  return {type: ERROR_MSG, errMsg: msg}
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload: data}
}

export function loadData(data) {
  return { type: LOAD_DATA , payload: data};
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('必须输入用户名和密码')
  }
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.errMsg))
      }
    });
  };  
}

export function register({user, pwd, repeatPwd, type}) {
  if (!user || !pwd || !repeatPwd ||!type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('密码与确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, repeatPwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(registerSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.errMsg))
        }
      })
  }
}