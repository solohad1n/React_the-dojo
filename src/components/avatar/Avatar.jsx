import React from 'react';
import './style.css'

const Avatar = ({ src }) => {
  return (
    <div className='avatar'>
      <img src={src} alt="avatar" />
    </div>
  );
}

export default Avatar;
