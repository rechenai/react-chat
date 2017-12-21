import React from 'react'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  WingBlank
} from "antd-mobile"
import { connect } from 'react-redux'
import { update } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

@connect(state => state.user, { update })
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: ""
    };
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">牛人资料完善页面</NavBar>
        <AvatarSelector selectAvatar={name => {
            this.setState({ avatar: name });
          }} />
        <InputItem onChange={v => this.onChange("title", v)}>
          求职岗位
        </InputItem>
        <TextareaItem onChange={v => this.onChange("desc", v)} row={3} autoHeight title="个人见解" />
        <WingBlank>
          <Button type="primary" onClick={() => this.props.update(this.state)}>
            保存
          </Button>
        </WingBlank>
      </div>;
  }
}

export default GeniusInfo

