import React from 'react';
import { getGetCollection } from '../../Hooks/useCollection';
import Avatar from '../avatar/Avatar';
import './style.css'

const OnlineUsers = () => {
  const { error, documents } = getGetCollection('users')
  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <div className='error'>{{ error }}</div>}
      {documents && documents.map((user) => {
        return (
          <div key={user.id} className='user-list-item'>
            {user.isOnline && <span className='online-user'></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        )
      })}
    </div>
  );
}

export default OnlineUsers;
