import React from 'react'
import io from 'socket.io-client'
import {List, InputItem} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList } from '../../redux/chatMsg.redux'

const socket = io('ws://localhost:9093')

@connect(
  state => state,
  { getMsgList }
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
    this.props.getMsgList()
  }

  onSubmit() {
    socket.emit('sendMsg', this.state.text)
    this.setState({text: ''})
  }

  render () {
    return (
      <div>
        <List>
          <div className='stick-footer'>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={(v) => this.setState({text: v})}
              extra={<span onClick={() => {this.onSubmit()}}>发送</span>}>
            </InputItem>
          </div>
        </List>
      </div>  
    )
  }
}

export default Chat