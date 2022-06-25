import React from 'react'
import { Link } from 'react-router-dom'
import Temple from '../../assets/temple.svg'
import './styles.css'

const Navbar = () => {
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
          <button className='btn'>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar