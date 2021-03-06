import React from 'react';
import { useGetCollection } from '../../Hooks/useCollection';
import Avatar from '../avatar/Avatar';
import './style.css'

const OnlineUsers = () => {
  const { error, documents } = useGetCollection('users')
  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <div className='error'>{{ error }}</div>}
      {documents
        && documents.map((user) => {
          return (
            <div key={user.id} className='user-list-item'>
              <span className='username'>{user.displayName}</span>
              <Avatar src={user.photoURL} className="user-avatar">
                {user.isOnline && <span className='online-user'></span>}
              </Avatar>
            </div>
          )
        })}
    </div>
  );
}

export default OnlineUsers;
