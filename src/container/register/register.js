import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import {register} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { register })
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, pwd: null, repeatPwd: null, type: "genius" };
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleInput(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleRegister() {
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <List>
          {this.props.errMsg ? <div>this.props.errMsg</div> : null}
          <InputItem onChange={val => this.handleInput("user", val)}>
            用户名
          </InputItem>
          <InputItem onChange={val => this.handleInput("pwd", val)}>
            密码
          </InputItem>
          <InputItem onChange={val => this.handleInput("repeatPwd", val)}>
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type === "genius"} onChange={val => this.handleInput("type", "genius")}>
            牛人
          </RadioItem>
          <RadioItem checked={this.state.type === "boss"} onChange={val => this.handleInput("type", "boss")}>
            BOSS
          </RadioItem>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
  }
}

export default Register
