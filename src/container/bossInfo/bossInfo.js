import React from 'react'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  WingBlank
} from "antd-mobile"
import {connect} from 'react-redux'
import { update } from "../../redux/user.redux";
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: '',
      avatar: ''
    }
  }

  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector selectAvatar={name => {
            this.setState({ avatar: name });
          }} />
        <InputItem onChange={v => this.onChange("title", v)}>
          招聘岗位
        </InputItem>
        <InputItem onChange={v => this.onChange("company", v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange("money", v)}>
          薪资待遇
        </InputItem>
        <TextareaItem onChange={v => this.onChange("desc", v)} row={3} autoHeight title="岗位描述" />
        <WingBlank>
          <Button type="primary" onClick={() => this.props.update(this.state)}>
            保存
          </Button>
        </WingBlank>
      </div>;
  }
}

export default BossInfo