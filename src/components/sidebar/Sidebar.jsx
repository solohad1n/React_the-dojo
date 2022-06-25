import React from 'react'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import AddIcon from '../../assets/add_icon.svg'
import './styles.css'

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <p>Hey user</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink exact to='/'>
                <img src={DashboardIcon} alt="DashboardIcon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/create'>
                <img src={AddIcon} alt="AddIcon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  )
}

export default Sidebar