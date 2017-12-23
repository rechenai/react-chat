import React from 'react'
import io from 'socket.io-client'
import {List, InputItem} from 'antd-mobile'

const socket = io('ws://localhost:9093')

class Chat extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount () {
    console.log('componentDidMount')
    socket.on('received', function(data) {
      console.log('received')
      console.log(data)
    })
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