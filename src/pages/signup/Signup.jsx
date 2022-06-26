import React, { useState } from 'react'
import './styles.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)

  const [thumbnailError, setThumbnailError] = useState(null)

  const handleChangeFile = (event) => {
    setThumbnail(null)
    const selected = event.target.files[0]

    if (!selected) return setThumbnailError('Пожалуйста, выберите файл')
    if (!selected.type.includes('image')) return setThumbnailError('Пожалуйста, выберите картинку')
    if (selected.size >= 1000000) return setThumbnailError('Пожалуйста, файл менее 100кб')

    setThumbnail(selected)
    setThumbnailError(null)
  }



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
        <input required type='file' onChange={handleChangeFile} />
        {thumbnailError && <span className='error'>{thumbnailError}</span>}
      </label>
      <button className='btn'>Sign up</button>
    </form>
  )
}


export default Signup