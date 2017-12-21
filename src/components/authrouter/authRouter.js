import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
  null,
  {loadData}
)
class AuthRoute extends Component {
  componentDidMount () {
    const publicList = ['/register', '/login']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1){
      return null
    }

    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.props.loadData(res.data.data)
          } else {
            console.log("this.props.history", this.props.history)
            this.props.history.push('/login')
          }
          console.log(res.data)
        }
      })
  }

  render () {
    return null
  }
}

export default AuthRoute