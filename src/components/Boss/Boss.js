import React from 'react'
import axios from 'axios'
import { Card, WingBlank } from 'antd-mobile'
import {connect} from 'react-redux'
import { getChatUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getChatUserList }
)
class Boss extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.props.getChatUserList('genius')
  }

  render () {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <div>
        {this.props.userList.map(v => (
          v.avatar ? 
          <WingBlank key={v._id}>
            <Card>
              <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={v.title}>
              </Header>
              <Body>
                {v.desc.split('/n').map(item => <div key={v.desc}>{item}</div>)}
              </Body>
            </Card>
          </WingBlank> : 
          null
        ))}
      </div>
    )
  }
}

export default Boss