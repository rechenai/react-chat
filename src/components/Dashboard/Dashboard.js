import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Route, Switch, Redirect} from 'react-router-dom'
import Boss from '../Boss/Boss'
import Genius from '../Genius/Genius'
import Msg from '../Msg/Msg'
import User from '../User/User'
import {getMsgList, recvMsg} from '../../redux/chatMsg.redux'


@connect(
  state=>state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chatlist.msgList.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg 
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    const page = navList.find(v => v.path === pathname)
    return page ? (
      <div>
        {pathname ? <NavBar mode='dark'>{page.text}</NavBar> : null}
        <div style={{marginTop: 20}}>
          <Switch>
            {navList.map(v => {
              return (
                <Route key={v.path} path={v.path} component={v.component}></Route>
              )
            })}
          </Switch>
        </div>
        <NavLinkBar data={navList} style={{position: 'fixed', bottom: 0}}></NavLinkBar>
      </div>
    ) :
    <Redirect to='/msg'></Redirect>
  }
}

export default Dashboard