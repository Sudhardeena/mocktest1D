import './index.css'
import {Component} from 'react'
import Cookie from 'js-cookie'

class Login extends Component {
  state = {
    userIdInputValue: '',
    userPinInputValue: '',
    errMssg: '',
    showError: false,
  }

  onChangeUserIdValue = event => {
    const {value} = event.target
    this.setState({userIdInputValue: value})
  }

  onChangePinValue = event => {
    const {value} = event.target
    this.setState({userPinInputValue: value})
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookie.set('jwt_token', token, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({errMssg: msg, showError: true})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {userIdInputValue, userPinInputValue} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userIdInputValue, pin: userPinInputValue}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const token = data.jwt_token
      this.onSubmitSuccess(token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderFormElement = () => {
    const {userIdInputValue, userPinInputValue, errMssg, showError} = this.state
    return (
      <form className="form-element" onSubmit={this.onSubmit}>
        <label htmlFor="userIdInput">User ID</label>
        <br />
        <input
          id="userIdInput"
          type="text"
          placeholder="Enter User ID"
          value={userIdInputValue}
          onChange={this.onChangeUserIdValue}
        />
        <br />
        <label htmlFor="passwordInput">PIN</label>
        <br />
        <input
          id="passwordInput"
          type="password"
          placeholder="Enter PIN"
          value={userPinInputValue}
          onChange={this.onChangePinValue}
        />
        <br />
        <button type="submit">Login</button>
        {showError && <p className="error-msg">{errMssg}</p>}
      </form>
    )
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-content">
          <div className="login-img-div">
            <img
              className="login-img"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="form-container">
            <h1>Welcome Back!</h1>
            {this.renderFormElement()}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
