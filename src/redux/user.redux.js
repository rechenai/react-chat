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

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOUGOUT'

export function user(state=initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, redirectTo: utils.getRedirectPath(action.payload), errMsg: "", ...action.payload }
    case ERROR_MSG:
      return { ...state, isAuth: false, errMsg: action.errMsg }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case LOGOUT: 
      return {...initState, redirectTo: '/login'}  
    default:
      return state
  }
}

function errorMsg(msg) {
  return {type: ERROR_MSG, errMsg: msg}
}

function authSuccess(data) {
  return {type: AUTH_SUCCESS, payload: data}
}

export function loadData(data) {
  return { type: LOAD_DATA , payload: data};
}

export function logoutSubmit(params) {
  return { type: LOGOUT }
}

export function update (data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.errMsg));
      }
    })
  }
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('必须输入用户名和密码')
  }
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
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
          dispatch(authSuccess({ user, pwd, type }));
        } else {
          dispatch(errorMsg(res.data.errMsg))
        }
      })
  }
}