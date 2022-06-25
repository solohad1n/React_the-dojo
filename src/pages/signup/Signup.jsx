import React, { useState } from 'react'
import './styles.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)

  return (
    <form className='auth-form'>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input required type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>Password:</span>
        <input required type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      <label>
        <span>Display Name:</span>
        <input required type='email' onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input required type='email' onChange={(e) => setThumbnail(e.target.value)} value={thumbnail} />
      </label>
    </form>
  )
}


export default Signup