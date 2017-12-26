import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chatMsg.redux'
import { getChatId } from '../../redux/utils';

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount () {
    if (!this.props.chatlist.msgList.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  fixCarousel() {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  onSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({ text: '' , showEmoji: false})
  }

  render () {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }))
    const userId = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chatlist.users
    if (!users[userId]) return null
    const chatId = getChatId(userId, this.props.user._id)
    const chatList = this.props.chatlist.msgList.filter(v => v.chatId === chatId)
    return (
      <div id='chat-page'>
        <NavBar mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}>
          {users[userId].name}
        </NavBar>
        {chatList.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userId ? 
                  (
                    <List key={v._id}>
                      <Item
                        thumb={avatar}>{v.content}</Item>
                    </List>
                  ) : 
                  (
                    <List key={v._id}>
                      <Item className='chat-me'
                        extra={<img src={avatar} />}>{v.content}</Item>
                    </List>
                  )     
        })}
        <List>
          <div className='stick-footer'>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={(v) => this.setState({text: v})}
              extra={
                <div>
                  <span style={{marginRight: 15}}
                  onClick={() => {
                    this.setState({
                      showEmoji: !this.state.showEmoji
                    })
                  }}>😃</span>
                  <span onClick={() => { this.onSubmit() }}>发送</span>
                </div>
              }>
            </InputItem>
          </div>
        </List>
        
        {this.state.showEmoji ? 
        <Grid
          data={emoji}
          columnNum={9}
          carouselMaxRow={4}
          isCarousel={true}
          onClick={el => {
            this.setState({
              text: this.state.text + el.text
            })
          }}>
        </Grid> :
        null
        }
      </div>  
    )
  }
}

export default Chat