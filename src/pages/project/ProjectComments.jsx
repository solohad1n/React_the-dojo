import { serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext'


const ProjectComments = () => {
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: serverTimestamp(),
      id: Math.random(),
    };
  }

  return (
    <div className='project-comments'>
      <h4>Комментарии</h4>
      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Описание:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className='btn'>Добавить</button>
      </form>
    </div>
  );
}

export default ProjectComments;
