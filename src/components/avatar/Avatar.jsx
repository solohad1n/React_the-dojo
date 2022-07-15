import React from 'react';
import './style.css'

const Avatar = ({ src, children, className }) => {
  return (
    <div className={className + ' avatar'}>
      <img src={src} alt="avatar" />
      {children && children}
    </div>
  );
}

export default Avatar;
