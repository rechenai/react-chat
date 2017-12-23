import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import {chatlist} from './redux/chatMsg.redux'

export default combineReducers({user, chatuser, chatlist})