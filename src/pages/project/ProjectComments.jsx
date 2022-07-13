import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useCollection } from '../../Hooks/useCollection';
import { v4 as uuidv4 } from 'uuid'
import Avatar from '../../components/avatar/Avatar';
import { toNow } from '../../helpers/date';

const ProjectComments = ({ project }) => {
  const { user } = useAuthContext()
  const { updateDocument, response } = useCollection('projects')
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: uuidv4(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <div className='project-comments'>
      <h4>Комментарии</h4>


      <ul className='comment-list'>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (<li key={comment.id}>
            <div className='comment-header'>
              <div className='comment-author'>
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className='comment-date'>
                <p>{toNow(comment.createdAt.toDate())}</p>
              </div>
            </div>
            <div className='comment-content'>
              <p>{comment.content}</p>
            </div>
          </li>
          ))}
      </ul>


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
