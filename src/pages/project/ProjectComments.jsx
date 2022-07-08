import React, { useState } from 'react';


const ProjectComments = () => {
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => { }

  return (
    <div className='project-comments'>
      <h4>Комментарии</h4>
      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Описание:</span>
          <textarea required></textarea>
        </label>
        <button className='btn'>Добавить</button>
      </form>
    </div>
  );
}

export default ProjectComments;
