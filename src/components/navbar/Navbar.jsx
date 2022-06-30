import React from 'react'
import { Link } from 'react-router-dom'
import Temple from '../../assets/temple.svg'
import { useLoginout } from '../../Hooks/useLoginout'
import './styles.css'

const Navbar = () => {
  const { logout, error, isPending } = useLoginout()
  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          {!isPending && <button onClick={logout} className='btn'>Logout</button>}
          {isPending && <button className='btn'>Loading...</button>}
          {error && <div className='error'>{error}</div>}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar