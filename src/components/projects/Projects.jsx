import React from 'react';
import './style.css'
import { Link } from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import { dueDate } from '../../helpers/date';

const Projects = ({ projects }) => {
  return (
    <div className='project-list'>
      {!projects.length && <p>Проектов Нет!</p>}
      {projects.map((project) => {
        return (
          <Link to={`/project/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Срок: {dueDate(project.dueDate.toDate())}</p>
            <div className='assigned-to'>
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        )
      })}
    </div>
  );
}

export default Projects;
