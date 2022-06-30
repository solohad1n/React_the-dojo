import React from 'react'
import { Link } from 'react-router-dom'
import Temple from '../../assets/temple.svg'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useLoginout } from '../../Hooks/useLoginout'
import './styles.css'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout, error, isPending } = useLoginout()
  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        {!user && (
          <>
            {" "}
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && <button onClick={logout} className='btn'>Logout</button>}
            {isPending && <button className='btn'>Loading...</button>}
            {error && <div className='error'>{error}</div>}
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar