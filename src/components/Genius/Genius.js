import React from 'react'
import UserCard from '../userCard/userCard'
import { connect } from 'react-redux'
import { getChatUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getChatUserList }
)
class Genius extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.props.getChatUserList('boss')
  }

  render() {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Genius