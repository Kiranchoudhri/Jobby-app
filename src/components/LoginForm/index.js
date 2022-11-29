import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMessage: ''}

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMessage: errorMsg})
  }

  submitDetails = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMessage, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form">
        <div className="form-card">
          <div className="websiteTitleContainer">
            <img
              className="website-logo"
              alt=" website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            />
          </div>
          <form className="userForm" onSubmit={this.submitDetails}>
            <div className="usernameSection">
              <label className="name-title" htmlFor="inputField">
                USERNAME
              </label>
              <input
                type="text"
                className="input-name"
                id="inputField"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="passwordSection">
              <label className="password-title" htmlFor="passwordField">
                PASSWORD
              </label>
              <input
                type="password"
                className="input-password"
                id="passwordField"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="loginBtn">
              Login
            </button>
            {showErrorMsg ? <p className="errorMsg">{errorMessage}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
