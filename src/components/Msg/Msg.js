import React from 'react'
import {List, Badge} from 'antd-mobile' 
import {connect} from 'react-redux'

@connect(
  state=>state
)
class Msg extends React.Component{
  getLastItem (arr) {
    return arr[arr.length - 1]
  }

  render() {
    const Item = List.Item
    const Brief = List.Brief
    const msgGroup = {}
    const userId = this.props.user._id
    const userInfo = this.props.chatlist.users
    this.props.chatlist.msgList.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLastItem(a).create_time
      const b_last = this.getLastItem(b).create_time
      return b_last - a_last
    })
    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLastItem(v)
          const targetId = v[0].from === userId ? v[0].to : v[0].from
          const unreadNum = v.filter(v=> !v.read && v.to === userId).length
          if (!userInfo[targetId]) {
            return null
          }
          return (
            <List>
              <Item
                extra={<Badge text={unreadNum}></Badge>}
                key={lastItem._id}
                arrow='horizontal'
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
                thumb={require(`../img/${userInfo[targetId].avatar}.png`)}>{lastItem.content}
                <Brief>{userInfo[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg