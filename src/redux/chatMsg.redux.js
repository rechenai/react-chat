import axios from 'axios'

const CHAT_LIST = 'CHAT_LIST'

const initState = {
  msgList: [],
  unread: 0
}

function msgList(data) {
  return {type: CHAT_LIST, payload: data}
}

export function chatlist(state = initState, action) {
  switch (action.type) {
    case CHAT_LIST:
      return {...state, msgList: action.payload, unread: action.payload.filter(v => !v.read).length}
    default:
      return state
  }
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/chatMsgList')
      .then(res => {
        if (res.state === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.data))
        }
      })
  }
}