import axios from 'axios'


const initState = {
  isAuth: false,
  user: '',
  pwd: '',
  errMsg: '',
  type: ''
}

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS: 
      return {...state, isAuth: true, errMsg: '', ...action.payload}
    case ERROR_MSG: 
      return { ...state, isAuth: false, errMsg: action.errMsg}
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

export function register({user, pwd, repeatPwd, type}) {
  if (!user || !pwd || !repeatPwd ||!type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('密码与确认密码不同')
  }
  return dispatch => {
    console.log('dispatch', dispatch)
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