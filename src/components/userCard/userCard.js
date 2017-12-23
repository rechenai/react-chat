import React from 'react'
import {Card, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  handleClick(user) {
    this.props.history.push(`/chat/${user}`)
  }

  render () {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <div>
        {this.props.userList.map(v => (
          v.avatar ?
            <WingBlank key={v._id}>
              <Card onClick={() => this.handleClick(v.user)}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={v.title}>
                </Header>
                <Body>
                  {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                  {v.desc.split('/n').map(item => <div key={v.desc}>{item}</div>)}
                  {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                </Body>
              </Card>
            </WingBlank> :
            null
        ))}
      </div>
    )
  }
}

export default UserCard
