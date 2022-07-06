import React from 'react'
import { useDocument } from '../../Hooks/useDocument'
import { useParams } from 'react-router-dom'
import ProjectSummary from './ProjectSummary'
import './styles.css'

function Project() {
  const params = useParams()
  const { document, error } = useDocument('projects', params.id)

  if (error) {
    return <div className='error'>{error}</div>
  }
  if (!document && !error) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
    </div>
  )
}

export default Project