import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../Hooks/useLogin.js'
import './styles.css'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await login(email, password)
    if (user) navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input required type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>Password:</span>
        <input required type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button className='btn'>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login