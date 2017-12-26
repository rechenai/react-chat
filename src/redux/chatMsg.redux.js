import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

const CHAT_LIST = 'CHAT_LIST'
const MSG_RECEIVED = 'MSG_RECEIVED'

const initState = {
  msgList: [],
  users: {},
  unread: 0
}

function msgList(data, users, userId) {
  return {type: CHAT_LIST, payload: {data, users, userId}}
}

function msgReceived(msg, userId) {
  return {type: MSG_RECEIVED, payload: msg, userId}
}

export function chatlist(state = initState, action) {
  switch (action.type) {
    case CHAT_LIST:
      return { ...state, users: action.payload.users, msgList: action.payload.data, unread: action.payload.data.filter(v => !v.read && v.to === action.payload.userId).length }
    case MSG_RECEIVED:
      const n = action.payload.to === action.userId ? 1 : 0
      return { ...state, msgList: [...state.msgList, action.payload], unread: state.unread + n }
    default:
      return state
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('received', function (data) {
      const userId = getState().user._id
      dispatch(msgReceived(data, userId))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispacth => {
    socket.emit('sendMsg', { from, to, msg })
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/chatMsgList')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const userId = getState().user._id
          dispatch(msgList(res.data.data, res.data.users, userId))
        }
      })
  }
}