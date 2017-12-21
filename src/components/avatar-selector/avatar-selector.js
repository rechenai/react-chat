import React from 'react'
import { Grid, List } from 'antd-mobile'
import propTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: propTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const AvatarList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
      .split(",")
      .map(val => ({
        icon: require(`../img/${val}.png`),
        text: val
      }));
    const headerList = this.state.icon ? (
      <div>
        <span>已选择头像</span>
        <img style={{ width: "20px" }} src={this.state.icon} alt="" />
      </div>
    ) : (
      <div>
        <span>请选择头像</span>
      </div>
    );

    return (
      <div>
        <List renderHeader={() => headerList}>
          <Grid
            data={AvatarList}
            columnNum={5}
            onClick={elm => {
              this.setState(elm);
              this.props.selectAvatar(elm.text);
            }}
          />
        </List>
      </div>
    );
  }
}

export default AvatarSelector
