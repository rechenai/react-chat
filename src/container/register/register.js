import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(state => state.user, { register })
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      pwd: null,
      repeatPwd: null,
      type: "genuis"
    };
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleInput(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleRegister() {
    console.log("register.props", this.props);
    const result = this.props.register(this.state);
    console.log('result', result)
    console.log(this.state);
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo />
        <List>
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
          <RadioItem
            checked={this.state.type === "genuis"}
            onChange={val => this.handleInput("type", "genuis")}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.state.type === "boss"}
            onChange={val => this.handleInput("type", "boss")}
          >
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
    );
  }
}

export default Register
