import React from 'react'
import {Result, WhiteSpace, List, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

@connect(
  state=> state.user,
  {logoutSubmit}
)
class User extends React.Component{
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    console.log('logout')
    const alert = Modal.alert
    alert('注销', '确定注销吗？', [
      {text: '取消', onPress: () => {}},
      {text: '确定', onPress: () => {
        browserCookie.erase('userId')
        this.props.logoutSubmit()
      }}
    ])
  }

  render () {
    const Item = List.Item
    return (
      this.props.user ? 
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} alt='' />}
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.company : null}
        ></Result>
        <List renderHeader={() => '简介'}>
          <Item multipleLine>{this.props.title}</Item>
          <Item>
          {this.props.desc.split('/n').map(v => {
            return <span key={v}>{v}</span>
          })}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div> :
      <Redirect to={this.props.redirectTo} />
    )
  }
}

export default User