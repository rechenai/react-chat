import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from "react-redux";
import { login } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
@connect(
  state => state.user,
  {login}
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      user: '',
      pwd: ''
    }
  }

  register() {
    this.props.history.push('/register')
  }

  handleLogin () {
    this.props.login(this.state)
  }

  handleInput(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    return <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.errMsg ? <div>{this.props.errMsg}</div> : null}
            <InputItem onChange={val => this.handleInput('user', val)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={val => this.handleInput('pwd', val)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="promary">
            注册
          </Button>
        </WingBlank>
      </div>;
  }
}

export default Login
