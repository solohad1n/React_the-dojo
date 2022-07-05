import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useSignup } from '../../Hooks/useSignup'
import './styles.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const { signup, error, isPending } = useSignup()
  const navigate = useNavigate()
  const { user } = useAuthContext()
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    await signup(email, password, displayName, thumbnail)
    navigate('/')
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])


  return (
    <form onSubmit={handleSubmit} className='auth-form'>
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
        <input required type='name' onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input required type='file' onChange={handleChangeFile} />
        {thumbnailError && <span className='error'>{thumbnailError}</span>}
      </label>
      {!isPending && <button className='btn'>Sign up</button>}
      {isPending && <button className='btn'>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}


export default Signup