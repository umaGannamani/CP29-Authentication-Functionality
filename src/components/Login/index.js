// Write your JS code here
import {withRouter, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const verifyLogin = async () => {
    const url = 'https://apis.ccbp.in/login'
    const details = {
      username: 'rahul',
      password: 'rahul@2021',
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = props
      history.replace('/')
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <>
      <div className="login-container">
        <h1 className="login-heading">Please Login</h1>
        <button type="button" onClick={verifyLogin}>
          Login with Sample Creds
        </button>
      </div>
    </>
  )
}

export default withRouter(Login)
