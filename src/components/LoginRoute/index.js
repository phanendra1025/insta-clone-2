import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({errorMessage: msg})
  }

  checkTheCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          className="login-image"
          src="https://res.cloudinary.com/dytmw4swo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1689748410/Layer_2_itnqct.jpg?_s=public-apps"
          alt="website login"
        />
        <form className="login-form" onSubmit={this.checkTheCredentials}>
          <div className="app-logo-container">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dytmw4swo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1689749750/Insta%20Clone/Group_t5f0gl.jpg?_s=public-apps"
              alt="website logo"
            />
            <h1 className="app-name">Insta Share</h1>
          </div>
          <div className="inputs-container username-input-container">
            <label className="input-labels" htmlFor="username">
              username
            </label>
            <input
              value={username}
              className="login-inputs"
              id="username"
              type="text"
              placeholder="Enter the username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="inputs-container">
            <label className="input-labels" htmlFor="password">
              Password
            </label>
            <input
              className="login-inputs"
              id="password"
              type="password"
              placeholder="Enter the password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <p className="login-error-message">{errorMessage}</p>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginRoute
