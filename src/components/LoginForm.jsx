import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)

  const notificate = (text, type = false) => {
    setLoginError({ text: text, isError: type })
    setTimeout(() => setLoginError(null), type ? 2000 : 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('blLoggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error) {
      if (error.response.data.error) {
        notificate(error.response.data.error, true)
      }
    }
  }

  return(
    <div id='login-form'>
      <h1>log in to application</h1>
      <Notification message={loginError} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default LoginForm